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
} from "./bantuan/browser.mjs";

const data = new TestData("67");
const PAGE = "/dashboard/praktikum/tambah-praktikum";
const ALFA = "Uji Tambah Alfa";
const ALFA_NEW = "Uji Tambah Alfa Baru";
const ZULU = "Uji Tambah Zulu";
const EMPTY = "Uji Tambah Kosong";
const GAMMA = "Uji Tambah Gamma";
const LONG =
  "Uji Tambah Analisis dan Perancangan Sistem Informasi Berorientasi Objek Lanjutan";
const EMPTY_TEXT = "Belum ada kelas untuk mata kuliah ini.";
const NO_SUBJECT_TEXT =
  "Belum ada mata kuliah. Tambah dulu di Master Data → Tambah Mata Kuliah.";
const KEYS = { Enter: 13, Escape: 27, ArrowDown: 40 };

const FORM = "form:has(#class-name)";
const labelNext = (scope, text) =>
  `[...document.querySelectorAll(${JSON.stringify(`${scope} p`)})].find((p) => p.innerText.trim() === ${JSON.stringify(text)})?.nextElementSibling`;
const SUBJECT_BTN = labelNext("main", "Mata Kuliah");
const FIELDS = {
  name: `document.querySelector("${FORM} #class-name")`,
  quota: `document.querySelector("${FORM} #class-quota")`,
  day: labelNext(FORM, "Hari"),
  room: labelNext(FORM, "Ruangan"),
  session: `document.querySelector('${FORM} button[aria-label="Sesi Kelas"]')`,
};
const SUBMIT = `document.querySelector('${FORM} button[type="submit"]')`;
const CARDS = `[...document.querySelectorAll("main div.grid > a")]`;
const option = (text) =>
  `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.trim().startsWith(${JSON.stringify(text)}))`;
const subjectText = `(${SUBJECT_BTN})?.innerText.trim()`;
const pageReady = `["Pilih mata kuliah", "Praktikum"].includes(${subjectText})`;

await runWebTest("Halaman Tambah Praktikum", data, async (browser) => {
  const { evaluate, waitFor, send, realClick, visibleButton, typeInto } =
    browser;

  await data.subject(ZULU, { semester: "2" });
  const empty = await data.subject(EMPTY, { semester: "3" });
  const long = await data.subject(LONG, { semester: "8" });
  const alfa = await data.subject(ALFA, { semester: "8" });
  await data.classOf(alfa, "C", "MONDAY", 1);
  const alfaA = await data.classOf(alfa, "A", "TUESDAY", 1, { room: "SBTI" });
  const alfaB = await data.classOf(alfa, "B", "WEDNESDAY", 1, { quota: 2 });
  await data.classOf(long, "A", "THURSDAY", 2);
  for (const student of await data.students(2))
    await data.enroll(student, alfaB);
  const sbtiMonday = await data.sessions({ room: "SBTI", day: "MONDAY" });
  const psiThursday = await data.sessions({ day: "THURSDAY" });
  const sbtiOnly = await db.mst_session.create({
    data: {
      periodId: data.period.id,
      room: "SBTI",
      day: "MONDAY",
      number: data.sessionFrom + 7,
      startAt: "06.00",
      endAt: "06.40",
      created_by: data.laboran.id,
    },
  });

  let failClass = false;
  let noSubjects = false;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (failClass && request.method === "GET" && path === "/class")
      return { fail: "ConnectionRefused" };
    if (noSubjects && request.method === "GET" && path === "/subject")
      return json(200, { status: true, message: "Berhasil", data: [] });
  });

  const resize = (width, height = 900) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const slow = (latency) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const press = async (key) => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key,
        code: key,
        windowsVirtualKeyCode: KEYS[key],
        ...(key === "Enter" && type === "keyDown" ? { text: "\r" } : {}),
      });
    await sleep(250);
  };
  const typeLetter = async (letter) => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key: letter,
        code: `Key${letter.toUpperCase()}`,
        windowsVirtualKeyCode: letter.toUpperCase().charCodeAt(0),
        ...(type === "keyDown" ? { text: letter } : {}),
      });
    await sleep(200);
    return evaluate(`(${FIELDS.name}).value`);
  };
  const pick = async (button, text) => {
    await realClick(button);
    await waitFor(`!!(${option(text)})`, 5000);
    await sleep(200);
    await realClick(option(text));
    await sleep(400);
  };
  const openPage = async () => {
    await browser.navigate(PAGE);
    await waitFor(pageReady, 20000);
    await sleep(800);
  };
  const measure = () =>
    evaluate(`(() => {
      const box = document.querySelector("${FORM}").getBoundingClientRect();
      const controls = [${FIELDS.name}, ${FIELDS.quota}, ${FIELDS.day}, ${FIELDS.room}, ${FIELDS.session}];
      return {
        outside: controls.filter((el) => {
          const r = el.getBoundingClientRect();
          return r.left < box.left - 1 || r.right > box.right + 1;
        }).length,
        clipped: controls.slice(0, 4).filter((el) => {
          const text = el.tagName === "INPUT" ? el : (el.querySelector("p") ?? el);
          return text.scrollWidth > text.clientWidth + 1;
        }).length,
        widths: controls.map((el) => Math.round(el.getBoundingClientRect().width)),
      };
    })()`);

  await resize(1440);
  check("login laboran", await browser.login(data.laboran, data.password));

  section("Memuat");
  await slow(2500);
  await browser.navigate(PAGE, { waitForLoad: false });
  const sawLoading = await waitFor(
    `location.pathname === "${PAGE}" && ${subjectText} === "Loading..." && (${SUBJECT_BTN}).disabled`,
    20000,
  );
  await slow(0);
  const loaded = await waitFor(`${subjectText} === "Pilih mata kuliah"`, 20000);
  await waitFor(pageReady, 20000);
  await sleep(1000);
  check(
    "selama mata kuliah dimuat, pilihannya menulis Loading... dan belum bisa dibuka",
    sawLoading,
  );
  check("  setelah termuat menulis Pilih mata kuliah", loaded);

  const header = await evaluate(`({
    title: [...document.querySelectorAll("main p")].some((p) => p.innerText.trim() === "Tambah Praktikum"),
    back: [...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali")?.getAttribute("href") ?? null,
  })`);
  check(
    "judul Tambah Praktikum dan tombol Kembali ke halaman Praktikum",
    header.title && header.back === "/dashboard/praktikum",
    JSON.stringify(header),
  );

  section("Pilihan mata kuliah");
  await realClick(SUBJECT_BTN);
  await waitFor(
    `document.querySelectorAll('[role="option"]').length > 0`,
    5000,
  );
  await sleep(300);
  const listed = await evaluate(
    `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.split("\\n").map((line) => line.trim()).filter(Boolean))`,
  );
  const edges = await evaluate(`(() => {
    const panel = document.querySelector('[role="listbox"]');
    const options = [...panel.querySelectorAll('[role="option"]')];
    const last = options[options.length - 1];
    return {
      top: options[0].offsetTop,
      bottom: panel.scrollHeight - (last.offsetTop + last.offsetHeight),
      fullWidth: options.every((o) => o.offsetWidth === panel.clientWidth),
    };
  })()`);
  await browser.pressEscape();
  const names = listed.map(([name]) => name);
  const ours = names.filter((name) => name.startsWith("Uji Tambah"));
  check(
    "mata kuliah urut abjad",
    names.every(
      (name, i) => i === 0 || names[i - 1].localeCompare(name) <= 0,
    ) && JSON.stringify(ours) === JSON.stringify([ALFA, LONG, EMPTY, ZULU]),
    JSON.stringify(names),
  );
  const semesters = Object.fromEntries(
    listed.map(([name, semester]) => [name, semester]),
  );
  check(
    "  setiap mata kuliah menulis semesternya",
    semesters[ALFA] === "Semester 8" &&
      semesters[ZULU] === "Semester 2" &&
      semesters[EMPTY] === "Semester 3",
    JSON.stringify(semesters),
  );
  check(
    "  sorotan biru opsi menempel sampai tepi daftar, seperti Jenis Pengumuman",
    edges.top === 0 && edges.bottom === 0 && edges.fullWidth,
    JSON.stringify(edges),
  );

  section("Keyboard");
  await evaluate(`(${SUBJECT_BTN}).focus()`);
  await press("ArrowDown");
  await waitFor(
    `document.querySelectorAll('[role="option"]').length > 0`,
    5000,
  );
  const alfaIndex = await evaluate(
    `[...document.querySelectorAll('[role="option"]')].findIndex((o) => o.innerText.trim().split("\\n")[0].trim() === ${JSON.stringify(ALFA)})`,
  );
  for (let i = 0; i < alfaIndex; i++) await press("ArrowDown");
  await press("Enter");
  await sleep(500);
  const chosen = await evaluate(subjectText);
  check(
    "mata kuliah bisa dipilih dengan panah dan Enter",
    chosen === ALFA && (await evaluate(`!!${FIELDS.name}`)),
    chosen,
  );
  if (chosen !== ALFA) await pick(SUBJECT_BTN, ALFA);

  await evaluate(`(${FIELDS.day}).focus()`);
  await press("ArrowDown");
  await waitFor(`!!(${option("Senin")})`, 5000);
  await press("ArrowDown");
  await press("Enter");
  await evaluate(`(${FIELDS.room}).focus()`);
  await press("ArrowDown");
  await waitFor(`!!(${option("PSI")})`, 5000);
  await press("ArrowDown");
  await press("Enter");
  await sleep(300);
  const keyboard = await evaluate(`({
    day: (${FIELDS.day}).innerText.trim(),
    room: (${FIELDS.room}).innerText.trim(),
  })`);
  check(
    "  hari dan ruangan juga bisa dipilih dengan keyboard",
    keyboard.day === "Selasa" && keyboard.room === "SBTI",
    JSON.stringify(keyboard),
  );

  section("Kolom Kelas");
  await evaluate(`(() => {
    const input = ${FIELDS.name};
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
    return true;
  })()`);
  const typedA = await typeLetter("a");
  const typedC = await typeLetter("c");
  await evaluate(`(${FIELDS.name}).setSelectionRange(0, 0)`);
  const typedB = await typeLetter("b");
  check("huruf kecil menjadi huruf besar", typedA === "A", typedA);
  check(
    "  huruf baru langsung mengganti huruf lama (kursor di akhir atau di awal)",
    typedC === "C" && typedB === "B",
    JSON.stringify({ typedC, typedB }),
  );

  section("Kelas yang sudah ada");
  const preview = await evaluate(`({
    heading: [...document.querySelectorAll("main p")].some((p) => p.innerText.trim() === "Kelas yang sudah ada (3)"),
    cards: ${CARDS}.map((a) => a.innerText.replace(/\\s+/g, " ").trim()),
  })`);
  check("judul kecil Kelas yang sudah ada (3) di atas kartu", preview.heading);
  check(
    "  kartu urut A, B, C",
    JSON.stringify(preview.cards.map((text) => text.split(" ")[0])) ===
      JSON.stringify(["A", "B", "C"]),
    JSON.stringify(preview.cards),
  );
  check(
    "  kelas penuh bertanda Penuh dan ruangan tampil",
    preview.cards[1]?.includes("2/2") &&
      preview.cards[1]?.includes("Penuh") &&
      preview.cards[0]?.includes("· SBTI") &&
      preview.cards[2]?.includes("· PSI"),
    JSON.stringify(preview.cards),
  );

  section("Nama mata kuliah panjang");
  await pick(SUBJECT_BTN, LONG);
  await sleep(600);
  const longButton = await evaluate(`(() => {
    const button = ${SUBJECT_BTN};
    const text = button.querySelector("p");
    return {
      height: Math.round(button.getBoundingClientRect().height),
      spills: button.scrollHeight > button.clientHeight + 1,
      cut: !!text && text.scrollWidth > text.clientWidth,
      title: text?.getAttribute("title") ?? null,
    };
  })()`);
  check(
    "nama panjang tidak keluar dari tombol pilihan, dipotong ...",
    longButton.height === 54 && !longButton.spills && longButton.cut,
    JSON.stringify(longButton),
  );
  check(
    "  nama lengkap muncul saat disorot",
    longButton.title === LONG,
    JSON.stringify(longButton),
  );
  const longCard = await evaluate(`(() => {
    const card = ${CARDS}[0];
    if (!card) return null;
    const box = card.getBoundingClientRect();
    const name = [...card.querySelectorAll("p")].find((p) => p.getAttribute("title"));
    return {
      outside: [...card.querySelectorAll("p")].filter((p) => {
        const r = p.getBoundingClientRect();
        return r.bottom > box.bottom + 1 || r.right > box.right + 1;
      }).length,
      lines: name ? Math.round(name.getBoundingClientRect().height / parseFloat(getComputedStyle(name).lineHeight)) : 0,
      title: name?.getAttribute("title") ?? null,
    };
  })()`);
  check(
    "  kartu kelasnya tidak meluber, paling banyak 2 baris",
    !!longCard &&
      longCard.outside === 0 &&
      longCard.lines <= 2 &&
      longCard.title === LONG,
    JSON.stringify(longCard),
  );

  section("Lebar layar");
  await pick(SUBJECT_BTN, ALFA);
  await typeInto(`${FORM} #class-name`, "d");
  await typeInto(`${FORM} #class-quota`, "30");
  await pick(FIELDS.day, "Senin");
  await pick(FIELDS.room, "SBTI");
  await pick(FIELDS.session, `Sesi ${sbtiMonday[0].number},`);
  for (const width of [1440, 1280, 1024]) {
    await resize(width);
    await sleep(600);
    const layout = await measure();
    check(
      `${width} px: semua isian di dalam kotak dan tidak terpotong`,
      layout.outside === 0 && layout.clipped === 0,
      JSON.stringify(layout),
    );
  }

  await resize(1024, 768);
  await browser.navigate(`/dashboard/praktikum/${alfaA.id}`);
  await waitFor(`!!(${visibleButton("Ubah Kelas")})`, 20000);
  await sleep(800);
  await realClick(visibleButton("Ubah Kelas"));
  await waitFor(`!!${FIELDS.quota}`, 5000);
  await sleep(800);
  const dialog = await measure();
  check(
    "pop-up Ubah Kelas 1024 px: kuota 30 tidak terpotong, semua isian di dalam",
    dialog.outside === 0 && dialog.clipped === 0,
    JSON.stringify(dialog),
  );
  await browser.pressEscape();
  await resize(1440);

  section("Sesi mengikuti hari dan ruangan");
  await openPage();
  await pick(SUBJECT_BTN, ALFA);
  await pick(FIELDS.day, "Senin");
  const beforeRoom = await evaluate(
    `({ text: (${FIELDS.session}).innerText.trim(), disabled: (${FIELDS.session}).disabled })`,
  );
  const sessionOptions = async () => {
    await realClick(FIELDS.session);
    await waitFor(`!!(${option("Sesi ")})`, 5000);
    await sleep(200);
    return evaluate(
      `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.trim())`,
    );
  };
  await pick(FIELDS.room, "SBTI");
  const sbtiOptions = await sessionOptions();
  await realClick(option(`Sesi ${sbtiOnly.number},`));
  await sleep(400);
  const picked = await evaluate(`(${FIELDS.session}).innerText.trim()`);
  await pick(FIELDS.room, "PSI");
  const afterRoom = await evaluate(`(${FIELDS.session}).innerText.trim()`);
  const psiOptions = await sessionOptions();
  await browser.pressEscape();
  check(
    "hari sudah dipilih tapi ruangan belum: Sesi Kelas menulis Pilih ruangan dulu dan terkunci",
    beforeRoom.text === "Pilih ruangan dulu" && beforeRoom.disabled,
    JSON.stringify(beforeRoom),
  );
  check(
    "  Senin SBTI menampilkan sesi khusus SBTI; ganti ke PSI mengosongkan sesi dan sesi SBTI tidak muncul",
    sbtiOptions.includes(`Sesi ${sbtiOnly.number}, 06.00 - 06.40`) &&
      picked === `Sesi ${sbtiOnly.number} · 06.00–06.40` &&
      afterRoom === "Sesi Kelas" &&
      psiOptions.length > 0 &&
      !psiOptions.some((text) => text.startsWith(`Sesi ${sbtiOnly.number},`)),
    JSON.stringify({ sbtiOptions, picked, afterRoom, psiOptions }),
  );

  section("Menyimpan");
  await openPage();
  await pick(SUBJECT_BTN, ALFA);
  await typeInto(`${FORM} #class-name`, "D");
  await typeInto(`${FORM} #class-quota`, "30");
  await pick(FIELDS.day, "Kamis");
  await pick(FIELDS.room, "PSI");
  await pick(FIELDS.session, `Sesi ${psiThursday[2].number},`);
  await slow(1500);
  await realClick(SUBMIT);
  await sleep(600);
  const during = await evaluate(`({
    saving: !!document.querySelector("${FORM} .loading"),
    fields: [${FIELDS.name}, ${FIELDS.quota}, ${FIELDS.day}, ${FIELDS.room}, ${FIELDS.session}].map((el) => el.matches(":disabled")),
    clear: (${visibleButton("Kosongkan")})?.disabled ?? null,
    subject: (${SUBJECT_BTN}).disabled,
  })`);
  const finished = await waitFor(`!!(${visibleButton("Simpan")})`, 30000);
  await slow(0);
  await sleep(800);
  check(
    "selama menyimpan, isian, Kosongkan, dan pilihan mata kuliah terkunci",
    during.saving &&
      during.fields.every(Boolean) &&
      during.clear === true &&
      during.subject === true,
    JSON.stringify(during),
  );
  const saved = await evaluate(`({
    message: [...document.querySelectorAll('[role="status"]')].map((p) => p.innerText.trim()),
    name: (${FIELDS.name}).value,
    quota: (${FIELDS.quota}).value,
    cards: ${CARDS}.map((a) => a.querySelector("p").innerText.trim()),
    heading: [...document.querySelectorAll("main p")].some((p) => p.innerText.trim() === "Kelas yang sudah ada (4)"),
  })`);
  check(
    "  setelah selesai: pesan berhasil, isian kosong, kelas D ikut urut",
    finished &&
      saved.message.includes(`Kelas ${ALFA} D berhasil ditambahkan`) &&
      saved.name === "" &&
      saved.quota === "" &&
      JSON.stringify(saved.cards) === JSON.stringify(["A", "B", "C", "D"]) &&
      saved.heading,
    JSON.stringify(saved),
  );

  section("Mata kuliah diubah laboran lain");
  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const changes = [
    await call("POST", "/subject", {
      token,
      body: {
        subject_code: data.nextCode(),
        subject_name: GAMMA,
        semester: "4",
        lecturer_id: data.lecturer.id,
      },
    }),
    await call("PUT", `/subject/${alfa.id}`, {
      token,
      body: { subject_name: ALFA_NEW },
    }),
    await call("DELETE", `/subject/${empty.id}`, { token }),
  ];
  const renamed = await waitFor(
    `${subjectText} === ${JSON.stringify(ALFA_NEW)}`,
    10000,
  );
  check(
    "nama mata kuliah yang sedang dipilih ikut berubah tanpa refresh",
    renamed,
    JSON.stringify([
      ...changes.map((r) => `${r.code} ${r.message}`),
      await evaluate(subjectText),
    ]),
  );
  await realClick(SUBJECT_BTN);
  await sleep(500);
  const latest = await evaluate(
    `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.trim().split("\\n")[0].trim())`,
  );
  await browser.pressEscape();
  check(
    "  mata kuliah baru muncul dan yang dihapus hilang dari pilihan",
    latest.includes(GAMMA) && !latest.includes(EMPTY) && latest.includes(ZULU),
    JSON.stringify(latest.filter((name) => name.startsWith("Uji Tambah"))),
  );

  await realClick(`${CARDS}[0]`);
  check(
    "kartu kelas membuka halaman detail kelasnya",
    await waitFor(
      `location.pathname === "/dashboard/praktikum/${alfaA.id}"`,
      15000,
    ),
  );

  section("Daftar kelas gagal dimuat");
  failClass = true;
  await openPage();
  await waitFor(bodyHas("Tidak dapat terhubung ke server"), 15000);
  await pick(SUBJECT_BTN, ALFA_NEW);
  await sleep(1000);
  check(
    "pesan error tampil",
    await evaluate(bodyHas("Tidak dapat terhubung ke server")),
  );
  check(
    `  tidak menulis ${EMPTY_TEXT}`,
    !(await evaluate(bodyHas(EMPTY_TEXT))),
  );
  failClass = false;

  section("Belum ada mata kuliah");
  noSubjects = true;
  await browser.navigate(PAGE);
  const hint = await waitFor(bodyHas(NO_SUBJECT_TEXT), 20000);
  const link = await evaluate(
    `[...document.querySelectorAll("main a")].find((a) => a.innerText.includes("Tambah Mata Kuliah"))?.getAttribute("href") ?? null`,
  );
  check(
    "ada arahan ke Master Data → Tambah Mata Kuliah",
    hint && link === "/dashboard/master-data/add-subject",
    link,
  );
  check(
    "  pilihan mata kuliah tidak bisa dibuka",
    await evaluate(`(${SUBJECT_BTN}).disabled`),
  );
  noSubjects = false;
});
