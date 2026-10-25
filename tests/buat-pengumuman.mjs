import {
  bodyHas,
  call,
  check,
  db,
  json,
  runWebTest,
  section,
  sleep,
  TestData,
  WEB,
} from "./bantuan/browser.mjs";

const data = new TestData("75");
const PAGE = "/dashboard/pengumuman/add-pengumuman";
const LIST_PAGE = "/dashboard/pengumuman/list-pengumuman";
const TITLE = 'input[placeholder="Judul pengumuman"]';
const BODY = 'textarea[placeholder="Deskripsi pengumuman"]';
const SAVED = "Pengumuman berhasil diterbitkan";
const BUSY = "Server sedang sibuk, silakan coba lagi sebentar lagi.";
const TOO_LONG = "Deskripsi pengumuman maksimal 1000 karakter!";
const OFFLINE = "Tidak dapat terhubung ke server, coba lagi!";
const ALL = "Semua mahasiswa";
const SOME = "Mata kuliah tertentu";
const TYPE_BUTTON = `document.querySelector("main button[aria-haspopup]")`;
const GROUP = `document.querySelector('[aria-label="Mata kuliah tujuan"]')`;
const DIALOG = `document.querySelector('[role="dialog"]')`;
const radio = (label) =>
  `[...document.querySelectorAll('input[type="radio"]')].find((input) => input.closest("label")?.innerText.trim() === ${JSON.stringify(label)})`;
const checkbox = (name) =>
  `[...document.querySelectorAll('[aria-label="Mata kuliah tujuan"] input[type="checkbox"]')].find((input) => input.closest("label")?.innerText.startsWith(${JSON.stringify(name)}))`;
const labelOf = (text) =>
  `[...document.querySelectorAll("main label")].find((label) => label.innerText.startsWith(${JSON.stringify(text)}))`;
const pageButton = (text) =>
  `[...document.querySelectorAll("main button")].find((button) => button.innerText.trim() === ${JSON.stringify(text)})`;
const dialogButton = (text) =>
  `[...document.querySelectorAll('[role="dialog"] button')].find((button) => button.innerText.trim() === ${JSON.stringify(text)})`;
const sidebarLink = (path) =>
  `[...document.querySelectorAll('a[href="${path}"]')].find((link) => !link.closest("main"))`;
const alertHas = (text) =>
  `!!document.querySelector('main [role="alert"]')?.innerText.includes(${JSON.stringify(text)})`;

await runWebTest("Buat Pengumuman", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto, send } = browser;
  const alfa = await data.subject("Uji Buat Alfa", { semester: "8" });
  const beta = await data.subject("Uji Buat Beta", { semester: "8" });
  const charlie = await data.subject("Uji Buat Charlie", { semester: "8" });
  const login = await call("POST", "/auth/login", {
    body: { nim: data.laboran.nim, password: data.password },
  });
  const api = (method, path, body) =>
    call(method, path, { token: login.json.data?.accessToken, body });

  let subjectMode = "asli";
  let postMode = "asli";
  const posts = [];
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname;
    if (
      request.method === "GET" &&
      path === "/subject" &&
      subjectMode === "gagal"
    )
      return json(503, { status: false, message: BUSY });
    if (request.method !== "POST" || path !== "/announcement") return;
    posts.push(JSON.parse(request.postData ?? "{}"));
    if (postMode === "tolak")
      return json(400, { status: false, message: TOO_LONG });
    if (postMode === "mati") return { fail: "ConnectionRefused" };
  });

  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const openPage = async () => {
    await browser.navigate(PAGE);
    return waitFor(`!!document.querySelector('${TITLE}')`, 20000);
  };
  const valueOf = (selector) =>
    evaluate(`document.querySelector('${selector}')?.value ?? null`);
  const clearValue = (selector) =>
    evaluate(`(() => {
      const el = document.querySelector('${selector}');
      const proto = el instanceof HTMLTextAreaElement ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(proto, "value").set.call(el, "");
      el.dispatchEvent(new Event("input", { bubbles: true }));
      return el.value;
    })()`);
  const typeShown = () => evaluate(`${TYPE_BUTTON}?.innerText.trim()`);
  const pickType = async (title) => {
    await realClick(TYPE_BUTTON);
    const item = `[...document.querySelectorAll('[role="menuitem"]')].find((i) => i.innerText.trim() === ${JSON.stringify(title)})`;
    await waitFor(`!!(${item})`, 3000);
    await realClick(item);
    await sleep(300);
  };
  const pickAudience = async (label) => {
    await realClick(`(${radio(label)})?.closest("label")`);
    await sleep(300);
  };
  const toggleSubject = async (name) => {
    await waitFor(`!!(${checkbox(name)})`, 10000);
    await realClick(`(${checkbox(name)})?.closest("label")`);
    await sleep(300);
  };
  const isChecked = (selector) => evaluate(`!!(${selector})?.checked`);
  const confirmClear = async () => {
    await clickText("Kosongkan");
    if (await waitFor(`!!(${dialogButton("Kosongkan")})`, 2000))
      await realClick(dialogButton("Kosongkan"));
    await waitFor(`!${DIALOG}`, 3000);
  };
  const titleCounter = () =>
    evaluate(
      `[...document.querySelectorAll("main p")].find((p) => /^\\d+\\/150$/.test(p.innerText.trim()))?.innerText.trim() ?? null`,
    );

  check("login laboran", await browser.login(data.laboran, data.password));
  check("halaman terbuka", await openPage());

  section("Judul halaman, tulisan isian, dan penghitung judul");
  const heading = await evaluate(`(() => {
    const main = document.querySelector("main");
    const title = [...main.querySelectorAll("p")].find((p) => p.innerText.trim() === "Buat Pengumuman");
    const style = title && getComputedStyle(title);
    return {
      count: main.innerText.split("Buat Pengumuman").length - 1,
      size: style?.fontSize,
      weight: style?.fontWeight,
      oldSentence: main.innerText.includes("disebarkan ke mahasiswa"),
    };
  })()`);
  check(
    "judul halaman cukup satu: Buat Pengumuman 32px tebal, tanpa kalimat lama",
    heading.count === 1 &&
      heading.size === "32px" &&
      heading.weight === "700" &&
      !heading.oldSentence,
    JSON.stringify(heading),
  );
  await realClick(labelOf("Judul Pengumuman"));
  check(
    "klik tulisan Judul Pengumuman: kursor masuk ke kotak judul",
    await evaluate(
      `document.activeElement === document.querySelector('${TITLE}')`,
    ),
  );
  await realClick(labelOf("Deskripsi Pengumuman"));
  check(
    "klik tulisan Deskripsi Pengumuman: kursor masuk ke kotak deskripsi",
    await evaluate(
      `document.activeElement === document.querySelector('${BODY}')`,
    ),
  );
  const counts = [await titleCounter()];
  await typeInto(TITLE, "Halo");
  counts.push(await titleCounter());
  await typeInto(TITLE, "x".repeat(200));
  counts.push(await titleCounter(), (await valueOf(TITLE))?.length);
  check(
    "penghitung judul 0/150, ikut bertambah, dan berhenti di 150/150",
    JSON.stringify(counts) ===
      JSON.stringify(["0/150", "4/150", "150/150", 150]),
    JSON.stringify(counts),
  );
  await clearValue(TITLE);

  section("Daftar mata kuliah tujuan");
  await latency(2500);
  await evaluate(`location.reload(); true`);
  let loadingText = null;
  const loadingEnd = Date.now() + 60000;
  while (Date.now() < loadingEnd && loadingText === null) {
    try {
      loadingText = await evaluate(`(() => {
        const group = ${GROUP};
        if (group) return group.innerText.trim();
        const all = ${radio(ALL)};
        const some = ${radio(SOME)};
        if (all && some) {
          all.click();
          some.click();
        }
        return null;
      })()`);
    } catch {}
    if (loadingText === null) await sleep(100);
  }
  await latency(0);
  check(
    "saat memuat tampil Loading..., bukan 'Belum ada mata kuliah.'",
    loadingText === "Loading...",
    loadingText,
  );
  await waitFor(`!!(${checkbox("Uji Buat Alfa")})`, 30000);

  subjectMode = "gagal";
  await openPage();
  await pickAudience(SOME);
  check(
    "gagal memuat: pesan gagal tampil, bukan 'Belum ada mata kuliah.'",
    (await waitFor(
      bodyHas(`Daftar mata kuliah gagal dimuat. ${BUSY}`),
      10000,
    )) && !(await evaluate(bodyHas("Belum ada mata kuliah."))),
  );
  subjectMode = "asli";
  const newCode = data.nextCode();
  const created = await api("POST", "/subject", {
    subjectCode: newCode,
    subjectName: "Uji Buat Baru",
    semester: "8",
    lecturerId: data.lecturer.id,
  });
  check(
    "  setelah server pulih dan ada mata kuliah baru, daftar termuat sendiri",
    await waitFor(
      `!${bodyHas("Daftar mata kuliah gagal dimuat.")} && !!(${checkbox("Uji Buat Baru")}) && !!(${checkbox("Uji Buat Alfa")})`,
      15000,
    ),
    created.message,
  );
  await api("PUT", `/subject/${created.json.data?.id}`, {
    subjectName: "Uji Buat Baru Diubah",
  });
  check(
    "nama mata kuliah yang diubah di tab lain ikut berubah",
    await waitFor(`!!(${checkbox("Uji Buat Baru Diubah")})`, 15000),
  );

  await toggleSubject("Uji Buat Alfa");
  await toggleSubject("Uji Buat Beta");
  const removed = await api("DELETE", `/subject/${beta.id}`);
  check(
    "mata kuliah tercentang dihapus di tab lain: hilang dari daftar",
    await waitFor(
      `!(${checkbox("Uji Buat Beta")}) && !!(${checkbox("Uji Buat Alfa")})?.checked`,
      15000,
    ),
    removed.message,
  );
  await typeInto(TITLE, "Uji Buat Tujuan");
  await typeInto(BODY, "Untuk Alfa saja.");
  const sentBefore = posts.length;
  await clickText("Simpan");
  const targetSaved = await waitFor(bodyHas(SAVED), 10000);
  const sent = posts.slice(sentBefore);
  const saved = await db.mst_announcement.findFirst({
    where: { title: "Uji Buat Tujuan" },
    include: { subjects: true },
  });
  check(
    "  Simpan berhasil dan hanya terkirim untuk mata kuliah yang masih ada",
    targetSaved &&
      sent.length === 1 &&
      JSON.stringify(sent[0].subjectIds) === JSON.stringify([alfa.id]) &&
      saved?.subjects.map((s) => s.subjectId).join() === alfa.id,
    JSON.stringify({
      sent,
      shown: await evaluate(
        `document.querySelector("main").innerText.slice(-200)`,
      ),
    }),
  );

  await pickAudience(SOME);
  await toggleSubject("Uji Buat Charlie");
  const charlieChecked = await isChecked(checkbox("Uji Buat Charlie"));
  await api("DELETE", `/subject/${charlie.id}`);
  await waitFor(`!(${checkbox("Uji Buat Charlie")})`, 15000);
  await typeInto(TITLE, "Uji Buat Tanpa Tujuan");
  await typeInto(BODY, "Isi.");
  const sentBeforeEmpty = posts.length;
  await clickText("Simpan");
  check(
    "  satu-satunya yang tercentang dihapus: Simpan meminta memilih mata kuliah",
    charlieChecked &&
      (await waitFor(bodyHas("Pilih minimal satu mata kuliah tujuan."), 5000)) &&
      posts.length === sentBeforeEmpty,
  );
  await confirmClear();

  section("Mengunci isian saat menyimpan");
  await typeInto(TITLE, "Uji Buat Kunci");
  await typeInto(BODY, "Isi kunci.");
  await latency(2500);
  await clickText("Simpan");
  await sleep(300);
  const locked = await evaluate(`(() => {
    const clear = ${pageButton("Kosongkan")};
    return {
      title: document.querySelector('${TITLE}').matches(":disabled"),
      body: document.querySelector('${BODY}').matches(":disabled"),
      type: !!${TYPE_BUTTON}?.matches(":disabled"),
      clear: !!clear?.disabled,
    };
  })()`);
  await evaluate(`document.querySelector('${TITLE}').focus()`);
  await send("Input.insertText", { text: " TAMBAHAN" });
  const typedWhileSaving = await valueOf(TITLE);
  check(
    "selama menyimpan, isian dan tombol Kosongkan terkunci",
    locked.title && locked.body && locked.type && locked.clear,
    JSON.stringify(locked),
  );
  check(
    "  ketikan saat menyimpan tidak masuk, jadi tidak ada yang hilang diam-diam",
    typedWhileSaving === "Uji Buat Kunci",
    typedWhileSaving,
  );
  const lockedSaved = await waitFor(bodyHas(SAVED), 30000);
  await latency(0);
  const placement = await evaluate(`(() => {
    const box = [...document.querySelectorAll('main [role="status"]')].find((el) => el.innerText.includes(${JSON.stringify(SAVED)}));
    const save = ${pageButton("Simpan")};
    return {
      box: !!box,
      above: !!box && !!save && box.getBoundingClientRect().bottom <= save.getBoundingClientRect().top,
      background: box ? getComputedStyle(box).backgroundColor : null,
      dialogs: document.querySelectorAll('[role="dialog"]').length,
    };
  })()`);
  check(
    "pesan berhasil tampil di kotak hijau di atas tombol, tanpa pop-up",
    lockedSaved &&
      placement.box &&
      placement.above &&
      placement.background === "rgb(232, 255, 243)" &&
      placement.dialogs === 0,
    JSON.stringify(placement),
  );
  check(
    "  form kosong lagi dan jenis kembali ke Pengumuman",
    (await valueOf(TITLE)) === "" &&
      (await valueOf(BODY)) === "" &&
      (await typeShown()) === "Pengumuman",
  );

  section("Pesan gagal di kotak, isian tetap");
  await typeInto(TITLE, "Uji Buat Ditolak");
  await typeInto(BODY, "Isi ditolak.");
  postMode = "tolak";
  await clickText("Simpan");
  check(
    "penolakan server tampil di kotak merah, tanpa pop-up",
    (await waitFor(alertHas(TOO_LONG), 8000)) &&
      (await evaluate(
        `document.querySelectorAll('[role="dialog"]').length`,
      )) === 0,
  );
  check(
    "  isian tetap utuh",
    (await valueOf(TITLE)) === "Uji Buat Ditolak" &&
      (await valueOf(BODY)) === "Isi ditolak.",
  );
  postMode = "mati";
  await clickText("Simpan");
  check(
    "server tidak bisa dihubungi: pesan tampil di kotak, isian tetap",
    (await waitFor(alertHas(OFFLINE), 15000)) &&
      (await valueOf(TITLE)) === "Uji Buat Ditolak",
  );
  postMode = "asli";

  section("Tombol Kosongkan");
  check(
    "tombolnya bernama Kosongkan, tidak ada tombol Hapus",
    (await evaluate(`!!(${pageButton("Kosongkan")})`)) &&
      !(await evaluate(`!!(${pageButton("Hapus")})`)),
  );
  await clickText("Kosongkan");
  check(
    "ada ketikan: Kosongkan bertanya dulu",
    await waitFor(
      `!!${DIALOG} && ${bodyHas("Kosongkan isian?")} && ${bodyHas("Judul dan deskripsi yang sudah diketik akan hilang.")}`,
      3000,
    ),
  );
  await realClick(dialogButton("Batal"));
  await waitFor(`!${DIALOG}`, 3000);
  check(
    "  Batal: isian tetap utuh",
    (await valueOf(TITLE)) === "Uji Buat Ditolak" &&
      (await valueOf(BODY)) === "Isi ditolak.",
  );
  await pickAudience(SOME);
  await toggleSubject("Uji Buat Alfa");
  await clickText("Kosongkan");
  await waitFor(`!!(${dialogButton("Kosongkan")})`, 3000);
  await realClick(dialogButton("Kosongkan"));
  await waitFor(`!${DIALOG}`, 3000);
  check(
    "  dikonfirmasi: judul, deskripsi, dan tujuan kosong lagi",
    (await valueOf(TITLE)) === "" &&
      (await valueOf(BODY)) === "" &&
      (await isChecked(radio(ALL))) &&
      !(await evaluate(`!!${GROUP}`)),
  );
  await pickType("Pendaftaran Inhal");
  await clickText("Kosongkan");
  await sleep(500);
  check(
    "belum ada ketikan: Kosongkan langsung tanpa bertanya",
    !(await evaluate(`!!${DIALOG}`)) && (await typeShown()) === "Pengumuman",
    await typeShown(),
  );

  section("Isian disimpan sementara (draf)");
  await typeInto(TITLE, "Uji Buat Draf");
  await typeInto(BODY, "Isi draf panjang.");
  await pickAudience(SOME);
  await toggleSubject("Uji Buat Alfa");
  await realClick(sidebarLink(LIST_PAGE));
  await waitFor(`location.pathname === "${LIST_PAGE}"`, 10000);
  await sleep(800);
  await realClick(sidebarLink(PAGE));
  await waitFor(
    `location.pathname === "${PAGE}" && !!document.querySelector('${TITLE}')`,
    10000,
  );
  await waitFor(`!!(${checkbox("Uji Buat Alfa")})`, 5000);
  check(
    "pindah ke List Pengumuman lalu kembali: judul, deskripsi, dan tujuan masih ada",
    (await valueOf(TITLE)) === "Uji Buat Draf" &&
      (await valueOf(BODY)) === "Isi draf panjang." &&
      (await isChecked(radio(SOME))) &&
      (await isChecked(checkbox("Uji Buat Alfa"))),
  );
  await pickType("Pendaftaran Inhal");
  await openPage();
  await waitFor(
    `document.querySelector('${TITLE}')?.value === "Uji Buat Draf"`,
    5000,
  );
  check(
    "muat ulang halaman: draf tetap ada, jenis ikut tersimpan",
    (await valueOf(TITLE)) === "Uji Buat Draf" &&
      (await typeShown()) === "Pendaftaran Inhal",
    await typeShown(),
  );

  const otherLaboran = await data.user("LABORAN", "Laboran Uji Dua");
  await send("Network.clearBrowserCookies");
  check(
    "laboran lain masuk di tab yang sama",
    await browser.login(otherLaboran, data.password),
  );
  await openPage();
  await sleep(1000);
  check(
    "  laboran lain tidak melihat draf itu",
    (await valueOf(TITLE)) === "" && (await valueOf(BODY)) === "",
  );
  await send("Network.clearBrowserCookies");
  await browser.login(data.laboran, data.password);
  await openPage();
  check(
    "  laboran pertama masuk lagi: drafnya kembali",
    await waitFor(
      `document.querySelector('${TITLE}')?.value === "Uji Buat Draf"`,
      5000,
    ),
  );

  await pickType("Pengumuman");
  await waitFor(`!!(${checkbox("Uji Buat Alfa")})?.checked`, 10000);
  await clickText("Simpan");
  await waitFor(bodyHas(SAVED), 10000);
  await openPage();
  await sleep(800);
  check(
    "setelah Simpan berhasil, draf dibuang",
    (await valueOf(TITLE)) === "" && (await typeShown()) === "Pengumuman",
  );
  await typeInto(TITLE, "Uji Buat Draf Dua");
  await confirmClear();
  await openPage();
  await sleep(800);
  check("setelah Kosongkan, draf dibuang", (await valueOf(TITLE)) === "");

  section("Dosen");
  await send("Network.clearBrowserCookies");
  check("login dosen", await browser.login(data.lecturer, data.password));
  await send("Page.navigate", { url: `${WEB}${PAGE}` });
  let formSeen = false;
  const lecturerEnd = Date.now() + 8000;
  while (Date.now() < lecturerEnd) {
    try {
      if (await evaluate(`!!document.querySelector('${TITLE}')`))
        formSeen = true;
    } catch {}
    await sleep(40);
  }
  check(
    "dosen membuka alamatnya: hanya pesan untuk laboran, form tidak tampil sekilas pun",
    !formSeen &&
      (await evaluate(bodyHas("Hanya laboran yang dapat membuat pengumuman."))),
  );

  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
