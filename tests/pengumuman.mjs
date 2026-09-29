import {
  bodyHas,
  check,
  db,
  json,
  openBrowser,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("59");
const PAGE = "/dashboard/pengumuman/add-pengumuman";
const SAVED = "Pengumuman berhasil diterbitkan";
const TYPE_BUTTON = `document.querySelector("button[aria-haspopup]")`;
const TITLE = 'input[placeholder="Judul pengumuman"]';
const BODY = 'textarea[placeholder="Deskripsi pengumuman"]';
const TYPES = {
  Pengumuman: "BASIC",
  "Pendaftaran Praktikum": "PRACTICUM",
  "Pendaftaran Inhal": "INHALL",
  "Pendaftaran Asisten Praktikum": "ASSISTANT",
};
const menuItem = (title) =>
  `[...document.querySelectorAll('[role="menuitem"]')].find((item) => item.innerText.trim() === ${JSON.stringify(title)})`;

await runWebTest("Pengumuman di web", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto } = browser;
  const sent = [];
  const edits = [];
  let reply = json(201, { status: true, message: SAVED });
  await browser.intercept((request) => {
    if (request.method === "PUT" && request.url.includes("/announcement/")) {
      edits.push(JSON.parse(request.postData ?? "{}"));
      return json(200, {
        status: true,
        message: "Pengumuman berhasil diperbarui",
      });
    }
    if (request.method !== "POST" || !request.url.endsWith("/announcement"))
      return null;
    sent.push(JSON.parse(request.postData ?? "{}"));
    return reply;
  });
  const slow = (latency) =>
    browser.send("Network.emulateNetworkConditions", {
      offline: false,
      latency,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });

  const typeShown = () => evaluate(`${TYPE_BUTTON}?.innerText.trim()`);
  const pickType = async (title) => {
    await realClick(TYPE_BUTTON);
    await waitFor(`!!(${menuItem(title)})`, 3000);
    await realClick(menuItem(title));
    await sleep(300);
  };
  const fill = async (title, body) => {
    await typeInto(TITLE, title);
    await typeInto(BODY, body);
  };
  const fieldsEmpty = () =>
    evaluate(
      `document.querySelector('${TITLE}').value === "" && document.querySelector('${BODY}').value === ""`,
    );
  const saveAndClose = async () => {
    await clickText("Simpan");
    const shown = await waitFor(bodyHas(SAVED), 5000);
    await clickText("Tutup");
    await waitFor(`!${bodyHas(SAVED)}`, 3000);
    return shown;
  };

  check("login laboran", await browser.login(data.laboran, data.password));
  await browser.navigate(PAGE);
  check(
    "halaman tampil dengan label Jenis Pengumuman",
    await waitFor(`${bodyHas("Jenis Pengumuman")} && !!${TYPE_BUTTON}`, 20000),
  );
  check(
    "  jenis awal: Pengumuman",
    (await typeShown()) === "Pengumuman",
    await typeShown(),
  );

  section("Pilihan jenis menampilkan nama, bukan kode");
  for (const title of Object.keys(TYPES).reverse()) {
    await pickType(title);
    check(
      `pilih ${title}: tombol menampilkan "${title}"`,
      (await typeShown()) === title,
      await typeShown(),
    );
  }

  section("Jenis yang tampil sama dengan yang terkirim");
  await pickType("Pendaftaran Praktikum");
  await fill(
    "  Pendaftaran praktikum dibuka  ",
    "Daftar lewat aplikasi SILAB.",
  );
  check("Simpan: pesan berhasil tampil", await saveAndClose());
  check(
    "  terkirim sebagai Pendaftaran Praktikum, judul dirapikan",
    sent.length === 1 &&
      sent[0].type === "PRACTICUM" &&
      sent[0].title === "Pendaftaran praktikum dibuka" &&
      sent[0].body === "Daftar lewat aplikasi SILAB.",
    JSON.stringify(sent),
  );
  check(
    "  form kosong lagi dan jenis kembali ke Pengumuman",
    (await fieldsEmpty()) && (await typeShown()) === "Pengumuman",
    await typeShown(),
  );
  await fill("Lab tutup", "Lab tutup hari Jumat.");
  await saveAndClose();
  check(
    "pengumuman berikutnya tanpa memilih jenis terkirim sebagai Pengumuman",
    sent.length === 2 && sent[1].type === "BASIC",
    JSON.stringify(sent[1]),
  );

  section("Tombol Hapus");
  await pickType("Pendaftaran Inhal");
  await fill("Inhal", "Pendaftaran inhal dibuka.");
  await clickText("Hapus");
  await sleep(300);
  check(
    "Hapus mengosongkan form dan jenis kembali ke Pengumuman",
    (await fieldsEmpty()) && (await typeShown()) === "Pengumuman",
    await typeShown(),
  );
  await fill("Jadwal", "Jadwal praktikum sudah terbit.");
  await saveAndClose();
  check(
    "  pengumuman sesudahnya terkirim sebagai Pengumuman",
    sent.length === 3 && sent[2].type === "BASIC",
    JSON.stringify(sent[2]),
  );

  section("Isian salah");
  await fill("", "Isi tanpa judul");
  await clickText("Simpan");
  check(
    "judul kosong ditolak tanpa mengirim",
    (await waitFor(bodyHas("Judul pengumuman wajib diisi!"), 3000)) &&
      sent.length === 3,
  );
  await fill("Judul", "     ");
  await clickText("Simpan");
  check(
    "deskripsi berisi spasi saja ditolak tanpa mengirim",
    (await waitFor(bodyHas("Deskripsi pengumuman wajib diisi!"), 3000)) &&
      sent.length === 3,
  );
  await typeInto(BODY, "x".repeat(1050));
  check(
    "deskripsi berhenti di 1000 karakter",
    (await evaluate(`document.querySelector('${BODY}').value.length`)) ===
      1000 && (await evaluate(bodyHas("1000/1000"))),
  );
  reply = json(400, {
    status: false,
    message: "Deskripsi pengumuman maksimal 1000 karakter!",
  });
  await clickText("Simpan");
  check(
    "penolakan server tampil",
    await waitFor(
      bodyHas("Deskripsi pengumuman maksimal 1000 karakter!"),
      5000,
    ),
  );
  await clickText("Tutup");
  await sleep(300);
  check(
    "  isian tidak hilang setelah ditolak",
    (await evaluate(`document.querySelector('${TITLE}').value`)) === "Judul",
  );

  section("Tampilan");
  const fit = await evaluate(`(() => {
    const panel = document.querySelector('${BODY}').closest(".bg-white");
    const save = [...panel.querySelectorAll("button")].find((b) => b.innerText.trim() === "Simpan");
    return {
      gap: Math.round(panel.getBoundingClientRect().bottom - save.getBoundingClientRect().bottom),
      scroll: panel.scrollHeight - panel.clientHeight,
    };
  })()`);
  check(
    "kotak putih berakhir tepat di bawah tombol Simpan",
    fit.gap <= 24 && fit.scroll <= 1,
    JSON.stringify(fit),
  );

  section("Pengumuman panjang di daftar dan detail");
  const long = await db.mst_announcement.create({
    data: {
      type: "BASIC",
      title: "Uji Pengumuman Panjang",
      body: [
        `Paragraf pertama ${"a".repeat(300)}`,
        `Paragraf kedua ${"kata ".repeat(80)}`,
        "Paragraf ketiga.",
      ].join("\n\n"),
      author: data.laboran.id,
    },
  });
  const bodyText = `[...document.querySelectorAll("p")].find((p) => p.textContent.startsWith("Paragraf pertama"))`;
  await browser.navigate("/dashboard/pengumuman/list-pengumuman");
  await waitFor(`!!(${bodyText})`, 20000);
  const card = await evaluate(`(() => {
    const text = ${bodyText};
    const box = text.closest(".bg-white").getBoundingClientRect();
    const r = text.getBoundingClientRect();
    return {
      height: Math.round(r.height),
      hidden: text.scrollHeight - text.clientHeight,
      inside: r.bottom <= box.bottom && r.right <= box.right,
      wide: text.scrollWidth - text.clientWidth,
    };
  })()`);
  check(
    "daftar: isi panjang dipotong 3 baris dan tetap di dalam kartu",
    card.height < 120 && card.hidden > 0 && card.inside && card.wide <= 1,
    JSON.stringify(card),
  );
  await browser.navigate(`/dashboard/pengumuman/${long.id}`);
  await waitFor(`!!(${bodyText})`, 20000);
  const detail = await evaluate(`(() => {
    const text = ${bodyText};
    return {
      paragraphs: text.innerText.split("\\n\\n").length,
      wide: text.scrollWidth - text.clientWidth,
      full: text.innerText.includes("Paragraf ketiga."),
    };
  })()`);
  check(
    "detail: isi lengkap tampil dengan paragraf terpisah",
    detail.paragraphs === 3 && detail.full && detail.wide <= 1,
    JSON.stringify(detail),
  );

  section("List Pengumuman");
  const practicum = await db.mst_announcement.create({
    data: {
      type: "PRACTICUM",
      title: "Uji Jenis Pengumuman",
      body: "Pendaftaran dibuka.",
      author: data.laboran.id,
    },
  });
  const day = practicum.createdAt.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const time = [
    practicum.createdAt.getHours(),
    practicum.createdAt.getMinutes(),
  ]
    .map((n) => String(n).padStart(2, "0"))
    .join(".");
  const cardOf = `[...document.querySelectorAll("p")].find((p) => p.innerText === "Uji Jenis Pengumuman")?.closest(".space-x-3")`;
  const openMenu = async (page) => {
    await page.waitFor(`!!(${cardOf})`, 20000);
    await page.realClick(`(${cardOf}).querySelector("button")`);
    await page.waitFor(`!!document.querySelector('[role="menuitem"]')`, 3000);
  };

  await slow(1500);
  await browser.navigate("/dashboard/pengumuman/list-pengumuman");
  const listLoading = await waitFor(
    `${bodyHas("Loading...")} && !${bodyHas("Belum ada pengumuman.")}`,
    3000,
  );
  await slow(0);
  check(
    "saat memuat tampil Loading..., bukan 'Belum ada pengumuman.'",
    listLoading,
  );
  await waitFor(`!!(${cardOf})`, 20000);
  const cardText = await evaluate(`(${cardOf}).innerText`);
  check(
    "kartu menampilkan jenis Pendaftaran Praktikum",
    cardText.includes("Pendaftaran Praktikum"),
    cardText,
  );
  check(
    "  tanggal lengkap dalam jam lokal beserta penulis",
    cardText.includes(day) &&
      cardText.includes(time) &&
      cardText.includes("oleh Laboran Uji"),
    `${cardText} | ${day} ${time}`,
  );

  await openMenu(browser);
  await clickText("Edit");
  await waitFor(bodyHas("Edit Pengumuman"), 3000);
  await clickText("Simpan Perubahan");
  check(
    "Edit: simpan tanpa perubahan memberi pesan dan tidak mengirim apa pun",
    (await waitFor(
      bodyHas("Tidak ada perubahan yang perlu disimpan."),
      3000,
    )) && edits.length === 0,
    JSON.stringify(edits),
  );
  await typeInto('input[maxlength="150"]', "Uji Jenis Pengumuman Diubah");
  await clickText("Simpan Perubahan");
  check(
    "  setelah judul diubah, perubahan dikirim dan dialog tertutup",
    (await waitFor(`!${bodyHas("Edit Pengumuman")}`, 5000)) &&
      edits.length === 1 &&
      edits[0].title === "Uji Jenis Pengumuman Diubah" &&
      edits[0].type === "PRACTICUM",
    JSON.stringify(edits),
  );

  section("Detail Pengumuman");
  await slow(1500);
  await browser.navigate(`/dashboard/pengumuman/${practicum.id}`);
  const detailLoading = await waitFor(
    `${bodyHas("Loading...")} && !${bodyHas("Tanggal / Waktu Posting")}`,
    3000,
  );
  await slow(0);
  check("saat memuat tampil Loading...", detailLoading);
  await waitFor(bodyHas("Uji Jenis Pengumuman"), 20000);
  const detailText = await evaluate(`document.querySelector("main").innerText`);
  check(
    "detail menampilkan jenis, penulis, dan tanggal dalam jam lokal",
    [
      "Jenis Pengumuman",
      "Pendaftaran Praktikum",
      "Dibuat oleh",
      "Laboran Uji",
    ].every((text) => detailText.includes(text)) &&
      detailText.includes(day) &&
      detailText.includes(time) &&
      !/\d{4}-\d{2}-\d{2}T/.test(detailText),
    detailText,
  );

  const lecturer = await openBrowser();
  try {
    section("Dosen");
    check("login dosen", await lecturer.login(data.lecturer, data.password));
    await lecturer.navigate(PAGE);
    check(
      "membuka alamatnya langsung: pesan hanya laboran, tanpa form",
      (await lecturer.waitFor(
        bodyHas("Hanya laboran yang dapat membuat pengumuman."),
        20000,
      )) && !(await lecturer.evaluate(`!!document.querySelector('${BODY}')`)),
    );
    await lecturer.navigate("/dashboard/pengumuman/list-pengumuman");
    await openMenu(lecturer);
    const lecturerMenu = await lecturer.evaluate(
      `[...document.querySelectorAll('[role="menuitem"]')].map((item) => item.innerText.trim())`,
    );
    check(
      "List: menu dosen hanya Lihat Detail, tanpa Edit dan Hapus",
      JSON.stringify(lecturerMenu) === JSON.stringify(["Lihat Detail"]),
      JSON.stringify(lecturerMenu),
    );
    check(
      "halaman tanpa error JavaScript",
      browser.exceptions.length === 0 && lecturer.exceptions.length === 0,
      JSON.stringify([...browser.exceptions, ...lecturer.exceptions]),
    );
  } finally {
    await lecturer.close();
  }
});
