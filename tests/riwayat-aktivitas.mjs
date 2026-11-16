import {
  bodyHas,
  check,
  db,
  json,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("70");
const PAGE = "/dashboard/riwayat-aktivitas";
const ONLY_LABORAN = "Hanya laboran yang dapat melihat riwayat aktivitas.";
const DATE_ORDER = "Tanggal awal tidak boleh setelah tanggal akhir.";
const NO_MATCH = "Tidak ada catatan yang cocok dengan filter ini.";
const SEARCH = 'input[placeholder^="Cari nama"]';
const FROM = 'input[aria-label="Dari tanggal"]';
const TO = 'input[aria-label="Sampai tanggal"]';
const GROUPS = [
  "Semua aksi",
  "Login",
  "Pembayaran",
  "Pertemuan",
  "Presensi",
  "Kelas",
  "Jam Sesi",
  "Mata Kuliah",
  "Pengumuman",
  "Asisten",
  "Akun",
  "Periode Akademik",
];

const ROWS = `(() => {
  const table = document.querySelector("main [aria-busy]");
  if (!table) return null;
  return [...table.lastElementChild.children].map((row) => {
    const [time, actor, action, description, change] = [...row.children];
    const badge = action.querySelector("span");
    return {
      date: time.children[0].innerText.trim(),
      time: time.children[1].innerText.trim(),
      actor: actor.children[0].innerText.trim(),
      detail: actor.children[1]?.innerText.trim() ?? null,
      action: badge.innerText.trim(),
      red: getComputedStyle(badge).color === "rgb(241, 65, 108)",
      description: description.innerText.trim(),
      change: change.innerText.trim(),
    };
  });
})()`;

const HEADER = `[...(document.querySelector("main [aria-busy]")?.firstElementChild?.children ?? [])].map((cell) => cell.innerText.trim())`;

const SUMMARY = `(() => {
  const texts = [...document.querySelectorAll("main p")].map((p) => p.innerText.trim());
  return {
    shown: texts.find((text) => text.startsWith("Menampilkan")) ?? null,
    page: texts.find((text) => /^Halaman \\d/.test(text)) ?? null,
  };
})()`;

const MENU = `[...document.querySelector("nav").children].map((item) => item.innerText.trim()).filter(Boolean)`;

const wib = (date, time) => new Date(`${date}T${time}:00+07:00`);

await runWebTest("Riwayat Aktivitas", data, async (browser) => {
  const { evaluate, waitFor, realClick, send } = browser;
  const { laboran, lecturer, period } = data;
  const subject = await data.subject("Uji Riwayat Aktivitas");
  const cls = await data.classOf(subject, "A", "MONDAY", 1);
  const assistant = await data.student("Asisten Uji Riwayat");
  const student = await data.student("Mahasiswa Uji Riwayat");
  await db.trn_class_collaborator.create({
    data: { userId: assistant.id, classId: cls.id },
  });
  const person = (user) => `${user.fullname} (${user.nim})`;
  const actor = (user, role) => ({
    actorId: user.id,
    actorName: user.fullname,
    actorNim: user.nim,
    actorRole: role,
  });
  await db.trn_activity_logs.createMany({
    data: [
      ...Array.from({ length: 60 }, (_, i) => ({
        action: "ATTENDANCE_SET",
        ...actor(assistant, "ASISTEN"),
        targetNim: student.nim,
        periodId: i < 40 ? period.id : null,
        description: `${person(student)} · Uji Riwayat Aktivitas kelas A · Pertemuan ${i + 1}`,
        change: "Belum Presensi → Hadir",
        createdAt: new Date(wib("2026-11-03", "08:00").getTime() + i * 60000),
      })),
      {
        action: "LOGIN_FAILED",
        ...actor(lecturer, "DOSEN"),
        periodId: period.id,
        description: "Password salah",
        attempts: 3,
        createdAt: wib("2026-11-10", "13:02"),
        updatedAt: wib("2026-11-10", "13:09"),
      },
      {
        action: "PASSWORD_RESET",
        actorId: null,
        actorName: "Lewat terminal",
        actorNim: null,
        actorRole: "TERMINAL",
        targetNim: lecturer.nim,
        periodId: null,
        description: `${person(lecturer)} · Dosen`,
        createdAt: wib("2026-11-10", "21:14"),
      },
      {
        action: "CLASS_UPDATED",
        ...actor(laboran, "LABORAN"),
        periodId: period.id,
        description: "Uji Riwayat Aktivitas kelas A",
        change: "kuota 30 → 32",
        createdAt: wib("2026-11-11", "10:15"),
      },
    ],
  });

  const requests = [];
  let failure = null;
  await browser.intercept((request) => {
    if (request.method === "OPTIONS") return;
    const url = new URL(request.url);
    if (url.pathname !== "/activity") return;
    requests.push(Object.fromEntries(url.searchParams));
    return failure ?? undefined;
  });
  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const settled = (text) =>
    waitFor(
      `!!document.querySelector('main [aria-busy="false"]') && ${bodyHas(text)}`,
      15000,
    );
  const rows = () => evaluate(ROWS);
  const summary = () => evaluate(SUMMARY);
  const lastRequest = () => requests[requests.length - 1] ?? null;
  const nextLoad = async (count, text) => {
    const end = Date.now() + 15000;
    while (requests.length <= count && Date.now() < end) await sleep(100);
    return settled(text);
  };
  const setValue = (selector, value) =>
    evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, ${JSON.stringify(value)});
      el.dispatchEvent(new Event("input", { bubbles: true }));
      return true;
    })()`);
  const typeSlowly = async (selector, text) => {
    await evaluate(
      `(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.focus(); el.select(); })()`,
    );
    for (const char of text) {
      await send("Input.insertText", { text: char });
      await sleep(60);
    }
  };
  const choose = async (label, matches) => {
    const button = `document.querySelector('[aria-label="${label}"]')`;
    for (let attempt = 0; attempt < 3; attempt++) {
      await realClick(button);
      if (
        await waitFor(
          `document.querySelectorAll('[role="option"]').length > 0`,
          2500,
        )
      )
        break;
    }
    const options = await evaluate(
      `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.trim())`,
    );
    await realClick(
      `[...document.querySelectorAll('[role="option"]')].find((o) => ${matches})`,
    );
    await waitFor(
      `document.querySelectorAll('[role="option"]').length === 0`,
      5000,
    );
    return options;
  };
  const buttonState = (text) =>
    evaluate(
      `(() => { const b = [...document.querySelectorAll("main button")].find((b) => b.innerText.trim() === ${JSON.stringify(text)}); return b ? (b.disabled ? "mati" : "aktif") : "tidak ada"; })()`,
    );

  check("login laboran", await browser.login(laboran, data.password));
  browser.resetErrors();

  section("Menu samping");
  await waitFor(`${MENU}.includes("Riwayat Aktivitas")`, 15000);
  const menu = await evaluate(MENU);
  check(
    "laboran melihat Riwayat Aktivitas tepat di bawah Pengumuman, paling bawah",
    menu.indexOf("Riwayat Aktivitas") === menu.indexOf("Pengumuman") + 1 &&
      menu[menu.length - 1] === "Riwayat Aktivitas",
    JSON.stringify(menu),
  );
  await realClick(
    `[...document.querySelectorAll("nav a")].find((a) => a.innerText.trim() === "Riwayat Aktivitas")`,
  );
  check(
    "menu membuka halaman Riwayat Aktivitas",
    await waitFor(
      `location.pathname === ${JSON.stringify(PAGE)} && !!document.querySelector("main [aria-busy]")`,
      20000,
    ),
  );
  check(
    "menu Riwayat Aktivitas tersorot",
    await evaluate(
      `[...document.querySelectorAll("nav a")].find((a) => a.innerText.trim() === "Riwayat Aktivitas").className.includes("bg-[#3285CA]/30")`,
    ),
  );

  section("Isi tabel");
  await settled("Menampilkan");
  check(
    "judul kolom Waktu, Pelaku, Aksi, Data, Perubahan",
    JSON.stringify(await evaluate(HEADER)) ===
      JSON.stringify(["Waktu", "Pelaku", "Aksi", "Data", "Perubahan"]),
    JSON.stringify(await evaluate(HEADER)),
  );
  check(
    "permintaan pertama tanpa filter, halaman 1",
    requests.length > 0 &&
      requests.every((r) => JSON.stringify(r) === '{"page":"1"}'),
    JSON.stringify(requests),
  );
  const [newest] = await rows();
  check(
    "login laboran uji barusan ada paling atas",
    newest?.action === "Login berhasil" &&
      newest.actor === laboran.fullname &&
      newest.detail === `${laboran.nim} · Laboran` &&
      newest.description === `${person(laboran)} · Laboran` &&
      newest.change === "–",
    JSON.stringify(newest),
  );
  check(
    "tombol Hapus Filter tidak ada tanpa filter",
    (await buttonState("Hapus Filter")) === "tidak ada",
  );

  const before = requests.length;
  await typeSlowly(SEARCH, data.nimPrefix);
  await nextLoad(before, "dari 64 catatan");
  await sleep(800);
  check(
    "mengetik kata kunci hanya mengirim satu permintaan setelah berhenti mengetik",
    requests.length === before + 1 &&
      JSON.stringify(lastRequest()) ===
        JSON.stringify({ q: data.nimPrefix, page: "1" }),
    JSON.stringify(requests.slice(before)),
  );
  const firstPage = await rows();
  const [, classRow, terminalRow, failedRow] = firstPage;
  check(
    "50 baris di halaman 1, terbaru di atas",
    firstPage.length === 50 &&
      firstPage[49].description.endsWith("Pertemuan 15"),
    JSON.stringify(firstPage.map((r) => r.description).slice(-2)),
  );
  check(
    "waktu WIB: 11 Nov 2026 10.15, perubahan apa adanya",
    classRow?.date === "11 Nov 2026" &&
      classRow.time === "10.15" &&
      classRow.action === "Ubah kelas" &&
      classRow.change === "kuota 30 → 32" &&
      !classRow.red,
    JSON.stringify(classRow),
  );
  check(
    "pelaku Lewat terminal tanpa NIM dan peran",
    terminalRow?.actor === "Lewat terminal" &&
      terminalRow.detail === null &&
      terminalRow.action === "Ganti password akun" &&
      terminalRow.description === `${person(lecturer)} · Dosen` &&
      terminalRow.change === "–",
    JSON.stringify(terminalRow),
  );
  check(
    "login gagal merah: 13.02–13.09, Gagal masuk 3 kali",
    failedRow?.action === "Login gagal" &&
      failedRow.red &&
      failedRow.time === "13.02–13.09" &&
      failedRow.date === "10 Nov 2026" &&
      failedRow.detail === `${lecturer.nim} · Dosen` &&
      failedRow.description === "Password salah" &&
      failedRow.change === "Gagal masuk 3 kali",
    JSON.stringify(failedRow),
  );
  check(
    "aksi lain abu-abu",
    firstPage.slice(4).every((r) => r.action === "Ubah presensi" && !r.red),
  );

  section("Pindah halaman");
  let pages = await summary();
  check(
    "Menampilkan 1–50 dari 64 catatan, Halaman 1 dari 2",
    pages.shown === "Menampilkan 1–50 dari 64 catatan" &&
      pages.page === "Halaman 1 dari 2",
    JSON.stringify(pages),
  );
  check(
    "Sebelumnya mati di halaman 1",
    (await buttonState("Sebelumnya")) === "mati" &&
      (await buttonState("Berikutnya")) === "aktif",
  );
  let count = requests.length;
  await browser.clickText("Berikutnya");
  await nextLoad(count, "Menampilkan 51–64 dari 64 catatan");
  const secondPage = await rows();
  pages = await summary();
  check(
    "halaman 2: 14 baris, Menampilkan 51–64, Berikutnya mati",
    secondPage.length === 14 &&
      secondPage[0].description.endsWith("Pertemuan 14") &&
      pages.page === "Halaman 2 dari 2" &&
      (await buttonState("Berikutnya")) === "mati" &&
      JSON.stringify(lastRequest()) ===
        JSON.stringify({ q: data.nimPrefix, page: "2" }),
    JSON.stringify({ pages, request: lastRequest(), count: secondPage.length }),
  );
  check(
    "pindah halaman menggulir daftar kembali ke atas",
    await evaluate(
      `[...document.querySelectorAll("main div")].find((el) => getComputedStyle(el).overflowY === "auto")?.scrollTop === 0`,
    ),
  );
  count = requests.length;
  await browser.clickText("Sebelumnya");
  await nextLoad(count, "Menampilkan 1–50 dari 64 catatan");
  check(
    "Sebelumnya kembali ke halaman 1",
    (await rows()).length === 50 && lastRequest()?.page === "1",
  );

  section("Filter");
  count = requests.length;
  const groups = await choose(
    "Pilih jenis aksi",
    `o.innerText.trim() === "Login"`,
  );
  check(
    "pilihan Jenis Aksi: Semua aksi lalu 11 jenis",
    JSON.stringify(groups) === JSON.stringify(GROUPS),
    JSON.stringify(groups),
  );
  await nextLoad(count, "dari 2 catatan");
  check(
    "Jenis Aksi Login: hanya login laboran dan login gagal dosen",
    JSON.stringify((await rows()).map((r) => r.action)) ===
      JSON.stringify(["Login berhasil", "Login gagal"]) &&
      JSON.stringify(lastRequest()) ===
        JSON.stringify({ group: "LOGIN", q: data.nimPrefix, page: "1" }),
    JSON.stringify(lastRequest()),
  );
  count = requests.length;
  await choose("Pilih jenis aksi", `o.innerText.trim() === "Semua aksi"`);
  await nextLoad(count, "dari 64 catatan");

  count = requests.length;
  const periods = await choose(
    "Pilih periode",
    `o.innerText.trim().endsWith("(aktif)")`,
  );
  check(
    "pilihan Periode: Semua periode lalu periode dengan tanda (aktif)",
    periods[0] === "Semua periode" &&
      periods.filter((p) => p.endsWith("(aktif)")).length === 1,
    JSON.stringify(periods),
  );
  await nextLoad(count, "dari 43 catatan");
  check(
    "periode aktif: catatan tanpa periode tidak ikut",
    JSON.stringify(lastRequest()) ===
      JSON.stringify({ periodId: period.id, q: data.nimPrefix, page: "1" }) &&
      !(await rows()).some((r) => r.actor === "Lewat terminal"),
    JSON.stringify(lastRequest()),
  );
  count = requests.length;
  await choose("Pilih periode", `o.innerText.trim() === "Semua periode"`);
  await nextLoad(count, "dari 64 catatan");

  count = requests.length;
  await setValue(FROM, "2026-11-10");
  await nextLoad(count, "dari 4 catatan");
  check(
    "tanggal mulai 10 November: catatan sejak hari itu",
    JSON.stringify((await rows()).map((r) => r.date).slice(1)) ===
      JSON.stringify(["11 Nov 2026", "10 Nov 2026", "10 Nov 2026"]),
    JSON.stringify(lastRequest()),
  );
  count = requests.length;
  await setValue(TO, "2026-11-10");
  await nextLoad(count, "dari 2 catatan");
  const day = await rows();
  check(
    "tanggal 10 sampai 10 November: hanya dua catatan hari itu",
    day.length === 2 &&
      day.every((r) => r.date === "10 Nov 2026") &&
      lastRequest()?.from === "2026-11-10" &&
      lastRequest()?.to === "2026-11-10",
    JSON.stringify({ day, request: lastRequest() }),
  );
  count = requests.length;
  await setValue(FROM, "2026-11-11");
  check(
    "tanggal awal setelah tanggal akhir: pesan, tabel hilang",
    (await waitFor(bodyHas(DATE_ORDER), 5000)) &&
      !(await evaluate(`!!document.querySelector("main [aria-busy]")`)),
  );
  await sleep(800);
  check(
    "  tanpa mengirim permintaan",
    requests.length === count,
    JSON.stringify(requests.slice(count)),
  );
  check(
    "  Muat Ulang mati selama tanggal terbalik",
    (await buttonState("Muat Ulang")) === "mati",
  );
  await setValue(FROM, "0202-11-09");
  await sleep(800);
  check(
    "tahun yang belum selesai diketik (0202) tidak dikirim",
    requests.length === count && (await evaluate(bodyHas(DATE_ORDER))),
    JSON.stringify(requests.slice(count)),
  );
  await setValue(FROM, "2026-11-09");
  await nextLoad(count, "dari 2 catatan");
  check(
    "tanggal diperbaiki: pesan hilang, tabel kembali",
    !(await evaluate(bodyHas(DATE_ORDER))) &&
      lastRequest()?.from === "2026-11-09",
    JSON.stringify(lastRequest()),
  );
  count = requests.length;
  await setValue(FROM, "");
  await nextLoad(count, "dari 62 catatan");
  count = requests.length;
  await setValue(TO, "");
  await nextLoad(count, "dari 64 catatan");

  count = requests.length;
  await typeSlowly(SEARCH, "kata-yang-tidak-ada");
  check("tidak ada yang cocok: keterangan", await nextLoad(count, NO_MATCH));
  check(
    "  tanpa baris dan tanpa Menampilkan",
    (await rows()).length === 0 && (await summary()).shown === null,
  );
  await evaluate(
    `(() => { const el = document.querySelector(${JSON.stringify(SEARCH)}); el.focus(); el.select(); })()`,
  );
  count = requests.length;
  await send("Input.insertText", { text: "a".repeat(120) });
  check(
    "kata kunci berhenti di 100 huruf",
    (await evaluate(
      `document.querySelector(${JSON.stringify(SEARCH)}).value.length`,
    )) === 100,
  );
  await nextLoad(count, NO_MATCH);
  check(
    "  100 huruf diterima server",
    lastRequest()?.q === "a".repeat(100) &&
      !(await evaluate(bodyHas("gagal dimuat"))),
    JSON.stringify(lastRequest()),
  );

  section("Hapus Filter dan Muat Ulang");
  await choose("Pilih jenis aksi", `o.innerText.trim() === "Pertemuan"`);
  await setValue(FROM, "2026-11-01");
  await sleep(800);
  check(
    "Hapus Filter tampil saat ada filter",
    (await buttonState("Hapus Filter")) === "aktif",
  );
  count = requests.length;
  await browser.clickText("Hapus Filter");
  await nextLoad(count, "Menampilkan");
  await sleep(800);
  const cleared = await evaluate(`({
    search: document.querySelector(${JSON.stringify(SEARCH)}).value,
    from: document.querySelector(${JSON.stringify(FROM)}).value,
    to: document.querySelector(${JSON.stringify(TO)}).value,
    period: document.querySelector('[aria-label="Pilih periode"]').innerText.trim(),
    group: document.querySelector('[aria-label="Pilih jenis aksi"]').innerText.trim(),
  })`);
  check(
    "semua filter kembali kosong dan satu permintaan tanpa filter",
    JSON.stringify(cleared) ===
      JSON.stringify({
        search: "",
        from: "",
        to: "",
        period: "Semua periode",
        group: "Semua aksi",
      }) &&
      requests.length === count + 1 &&
      JSON.stringify(lastRequest()) === '{"page":"1"}',
    JSON.stringify({ cleared, sent: requests.slice(count) }),
  );
  check(
    "  tombol Hapus Filter hilang lagi",
    (await buttonState("Hapus Filter")) === "tidak ada",
  );

  await db.trn_activity_logs.create({
    data: {
      action: "MEETING_OPENED",
      ...actor(assistant, "ASISTEN"),
      periodId: period.id,
      description: "Uji Riwayat Aktivitas kelas A · Pertemuan 61",
    },
  });
  await browser.clickText("Muat Ulang");
  await waitFor(
    `(${ROWS})?.[0]?.description === "Uji Riwayat Aktivitas kelas A · Pertemuan 61"`,
    15000,
  );
  const [opened] = await rows();
  check(
    "Muat Ulang menampilkan catatan baru paling atas",
    opened?.action === "Buka sesi presensi" &&
      opened.actor === assistant.fullname &&
      opened.detail === `${assistant.nim} · Asisten`,
    JSON.stringify(opened),
  );

  section("Gagal memuat");
  failure = json(500, { status: false, message: "Kesalahan uji" });
  await browser.clickText("Muat Ulang");
  check(
    "pesan merah Riwayat aktivitas gagal dimuat",
    await waitFor(
      bodyHas("Riwayat aktivitas gagal dimuat. Kesalahan uji"),
      10000,
    ),
  );
  check(
    "  tanpa baris lama dan tanpa Loading...",
    (await rows()).length === 0 &&
      !(await evaluate(bodyHas("Loading..."))) &&
      (await summary()).shown === null,
  );
  failure = null;
  await browser.clickText("Muat Ulang");
  await settled("Menampilkan");
  check(
    "Muat Ulang memuat lagi dan pesan hilang",
    (await rows()).length > 0 &&
      !(await evaluate(bodyHas("Riwayat aktivitas gagal dimuat"))),
  );

  await realClick(
    `[...document.querySelectorAll("nav a")].find((a) => a.innerText.trim() === "Dashboard")`,
  );
  await waitFor(`location.pathname === "/dashboard"`, 15000);
  await latency(1500);
  await realClick(
    `[...document.querySelectorAll("nav a")].find((a) => a.innerText.trim() === "Riwayat Aktivitas")`,
  );
  check(
    "kembali lewat menu: Loading... tanpa sisa baris lama, lalu isi",
    (await waitFor(
      `location.pathname === ${JSON.stringify(PAGE)} && ${bodyHas("Loading...")} && (${ROWS})?.length === 0`,
      20000,
    )) && (await settled("Menampilkan")),
  );
  await latency(0);

  section("Menu samping kecil");
  await browser.setCookie("sidebar-collapsed", "1");
  await browser.navigate(PAGE);
  check(
    "ikon Riwayat Aktivitas di menu kecil, tersorot",
    await waitFor(
      `document.querySelector('nav a[aria-label="Riwayat Aktivitas"]')?.className.includes("bg-[#3285CA]/30") === true`,
      15000,
    ),
  );
  await browser.setCookie("sidebar-collapsed", "0");

  check(
    "tanpa error JavaScript di halaman laboran",
    browser.exceptions.length + browser.consoleErrors.length === 0,
    JSON.stringify([...browser.exceptions, ...browser.consoleErrors]),
  );

  section("Selain laboran");
  for (const [label, user] of [
    ["dosen", lecturer],
    ["asisten", assistant],
  ]) {
    await send("Network.clearBrowserCookies");
    check(`login ${label}`, await browser.login(user, data.password));
    await waitFor(`${MENU}.includes("Praktikum")`, 15000);
    await sleep(1000);
    check(
      `  ${label} tidak melihat menu Riwayat Aktivitas`,
      !(await evaluate(MENU)).includes("Riwayat Aktivitas"),
      JSON.stringify(await evaluate(MENU)),
    );
    await browser.navigate(PAGE);
    check(
      `  ${label} yang membuka alamatnya hanya melihat pesan`,
      (await waitFor(bodyHas(ONLY_LABORAN), 15000)) &&
        !(await evaluate(`!!document.querySelector("main [aria-busy]")`)),
    );
  }
});
