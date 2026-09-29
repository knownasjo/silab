import {
  bodyHas,
  check,
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

await runWebTest("Buat pengumuman", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto } = browser;
  const sent = [];
  let reply = json(201, { status: true, message: SAVED });
  await browser.intercept((request) => {
    if (request.method !== "POST" || !request.url.endsWith("/announcement"))
      return null;
    sent.push(JSON.parse(request.postData ?? "{}"));
    return reply;
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
  await typeInto(BODY, "x".repeat(250));
  check(
    "deskripsi berhenti di 200 karakter",
    (await evaluate(`document.querySelector('${BODY}').value.length`)) === 200,
  );
  reply = json(400, {
    status: false,
    message: "Deskripsi pengumuman maksimal 200 karakter!",
  });
  await clickText("Simpan");
  check(
    "penolakan server tampil",
    await waitFor(bodyHas("Deskripsi pengumuman maksimal 200 karakter!"), 5000),
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
    check(
      "halaman tanpa error JavaScript",
      browser.exceptions.length === 0 && lecturer.exceptions.length === 0,
      JSON.stringify([...browser.exceptions, ...lecturer.exceptions]),
    );
  } finally {
    await lecturer.close();
  }
});
