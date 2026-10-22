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

const data = new TestData("72");
const PAGE = "/dashboard/master-data/pembayaran";
const LONG_NAME =
  "Uji Daftar Muhammad Fadhil Ramadhan Saputra Wijayakusuma Al-Hakim Prawirodirdjo";
const NAMES = [
  "Uji Daftar Andi",
  "Uji Daftar Budi Santoso",
  "Uji Daftar Citra",
  LONG_NAME,
];

const lihat = `[...document.querySelectorAll("main button[aria-label^='Lihat pembayaran ']")]`;
const rowOf = (name) =>
  `document.querySelector(${JSON.stringify(`main button[aria-label="Lihat pembayaran ${name}"]`)})?.closest("div.grid")`;
const chip = (label) =>
  `[...document.querySelectorAll("main button[aria-pressed]")].find((b) => b.innerText.trim() === ${JSON.stringify(label)})`;
const container = `document.querySelector("main > div")`;
const header = `document.querySelector("main div.sticky")`;

await runWebTest("Daftar Pembayaran", data, async (browser) => {
  const { evaluate, waitFor, send, realClick, typeInto } = browser;

  const web = await data.subject("Uji Daftar Pemrograman Web", {
    semester: "3",
  });
  const basis = await data.subject("Uji Daftar Basis Data", { semester: "3" });
  const analisis = await data.subject("Uji Daftar Analisis Sistem", {
    semester: "5",
  });
  await data.classOf(web, "A", "MONDAY", 1);
  const [andi, budi, citra, dewi] = await data.students(4, (i) => NAMES[i]);
  await data.activate(dewi, web, false);
  await data.activate(andi, basis, true);
  await data.activate(andi, analisis, false);
  await data.activate(andi, web, true);
  await data.activate(citra, web, true);
  await data.activate(budi, web, false);
  for (const [i, student] of (
    await data.students(20, (i) => `Uji Daftar Tambahan ${i + 1}`)
  ).entries())
    await data.activate(student, web, i % 2 === 0);
  const ours = [andi, budi, citra, dewi].map((student) => student.id);

  let activationGets = 0;
  let fake = null;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (request.method !== "GET" || path !== "/activation") return;
    activationGets += 1;
    if (fake)
      return json(200, { status: true, message: "Berhasil", data: fake });
  });

  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const size = (width, height) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const network = (latency) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const open = async () => {
    await browser.navigate(PAGE);
    const ok = await waitFor(
      `!!document.querySelector('main button[aria-label="Lihat pembayaran ${NAMES[0]}"]')`,
      20000,
    );
    await sleep(600);
    return ok;
  };
  const names = () =>
    evaluate(
      `${lihat}.map((b) => b.getAttribute("aria-label").slice("Lihat pembayaran ".length))`,
    );
  const cards = () =>
    evaluate(
      `[...document.querySelectorAll("main h1")].map((h) => h.innerText.trim())`,
    );
  const message = () =>
    evaluate(
      `[...document.querySelectorAll("main p")].map((p) => p.innerText.trim()).find((t) => /^(Tidak ada|Belum ada|Semua mahasiswa)/.test(t)) ?? null`,
    );
  const search = async (text) => {
    const value = await typeInto("main input", text);
    await sleep(700);
    return value;
  };
  const periodCount = (status) =>
    db.trn_activations.count({
      where: { periodId: data.period.id, deleted_at: null, status },
    });

  check("login laboran", await browser.login(data.laboran, data.password));
  await size(1366, 768);

  section("Urutan");
  check("halaman Pembayaran terbuka", await open());
  const order = (await names()).filter((name) => NAMES.includes(name));
  check(
    "mahasiswa diurutkan menurut NIM, bukan menurut waktu mendaftar",
    JSON.stringify(order) === JSON.stringify(NAMES),
    JSON.stringify(order),
  );
  await realClick(
    `document.querySelector('main button[aria-label="Lihat pembayaran ${NAMES[0]}"]')`,
  );
  await waitFor(bodyHas("Status Pembayaran Mahasiswa"), 5000);
  const subjects = await evaluate(
    `[...document.querySelectorAll('[role="dialog"] button[aria-label^="Ubah "]')].map((b) => b.getAttribute("aria-label").slice(5))`,
  );
  check(
    "  pop-up: mata kuliah urut semester, lalu abjad",
    JSON.stringify(subjects) ===
      JSON.stringify([
        basis.subject_name,
        web.subject_name,
        analisis.subject_name,
      ]),
    JSON.stringify(subjects),
  );
  await browser.pressEscape();
  await sleep(500);

  section("Pencarian");
  const allRows = (await names()).length;
  const totals = [
    String(await periodCount(false)),
    String(await periodCount(true)),
  ];
  const cardsBefore = await cards();
  activationGets = 0;
  await search(citra.nim);
  const byNim = await names();
  check(
    "cari NIM menemukan mahasiswanya",
    JSON.stringify(byNim) === JSON.stringify([citra.fullname]),
    JSON.stringify(byNim),
  );
  await search("  uji daftar   BUDI ");
  const byName = await names();
  check(
    "  cari sebagian nama tanpa peduli huruf besar dan spasi berlebih",
    JSON.stringify(byName) === JSON.stringify([budi.fullname]),
    JSON.stringify(byName),
  );
  const cardsDuring = await cards();
  check(
    "  angka di kartu tetap total periode saat mencari",
    JSON.stringify(cardsBefore) === JSON.stringify(totals) &&
      JSON.stringify(cardsDuring) === JSON.stringify(totals),
    JSON.stringify({ totals, cardsBefore, cardsDuring }),
  );
  check(
    "  mengetik tidak mengirim permintaan ke server, jadi jawaban lama tidak bisa menimpa hasil baru",
    activationGets === 0,
    `${activationGets} permintaan GET /activation`,
  );
  await search("zzz tidak ada");
  const noMatch = await message();
  check(
    "  tidak ketemu: pesan menyebut kata yang dicari",
    noMatch === 'Tidak ada mahasiswa yang cocok dengan "zzz tidak ada".',
    JSON.stringify(noMatch),
  );
  await search("Uji Daftar Budi");
  await realClick(chip("Belum Bayar"));
  await sleep(300);
  await realClick(`document.querySelector('a[href="/dashboard"]')`);
  await waitFor(`location.pathname === "/dashboard"`, 10000);
  await sleep(1500);
  await realClick(`document.querySelector('a[href="${PAGE}"]')`);
  await waitFor(`location.pathname === "${PAGE}"`, 10000);
  await waitFor(`${lihat}.length > 0`, 10000);
  await sleep(1500);
  const back = {
    input: await evaluate(`document.querySelector("main input").value`),
    showAll: await evaluate(
      `(${chip("Show All")})?.getAttribute("aria-pressed")`,
    ),
    rows: (await names()).length,
  };
  check(
    "pindah halaman lewat sidebar lalu kembali: kotak cari kosong, Show All, semua mahasiswa tampil",
    back.input === "" && back.showAll === "true" && back.rows === allRows,
    JSON.stringify({ ...back, allRows }),
  );

  section("Pilihan dan keadaan kosong");
  await realClick(chip("Belum Bayar"));
  await search(citra.fullname);
  const filtered = await message();
  check(
    "Belum Bayar + nama yang sudah lunas: pesan menyebut pilihannya",
    filtered ===
      `Tidak ada mahasiswa yang cocok dengan "${citra.fullname}" di pilihan Belum Bayar.`,
    JSON.stringify(filtered),
  );
  const real = (await call("GET", "/activation", { token })).json.data.filter(
    (activation) => ours.includes(activation.user_id),
  );
  fake = real.map((activation) => ({ ...activation, status: true }));
  await open();
  await realClick(chip("Belum Bayar"));
  await sleep(300);
  const allPaid = await message();
  fake = real.map((activation) => ({ ...activation, status: false }));
  await open();
  await realClick(chip("Sudah Bayar"));
  await sleep(300);
  const nonePaid = await message();
  check(
    "  semua lunas: Belum Bayar menulis Semua mahasiswa sudah bayar.; belum ada yang lunas: Sudah Bayar menulis Belum ada mahasiswa yang lunas.",
    allPaid === "Semua mahasiswa sudah bayar." &&
      nonePaid === "Belum ada mahasiswa yang lunas.",
    JSON.stringify({ allPaid, nonePaid }),
  );
  fake = [];
  await browser.navigate(PAGE);
  await waitFor(
    bodyHas("Belum ada mahasiswa yang mendaftar praktikum di periode ini."),
    20000,
  );
  const empty = await message();
  fake = null;
  check(
    "  periode tanpa pendaftar: Belum ada mahasiswa yang mendaftar praktikum di periode ini.",
    empty === "Belum ada mahasiswa yang mendaftar praktikum di periode ini.",
    JSON.stringify(empty),
  );
  await network(1500);
  await browser.navigate(PAGE, { waitForLoad: false });
  const loading = await waitFor(
    `location.pathname === "${PAGE}" && [...document.querySelectorAll("main p")].some((p) => p.innerText.trim() === "Loading...")`,
    20000,
  );
  const oldText = await evaluate(bodyHas("Memuat data..."));
  await network(0);
  check(
    "  saat memuat tertulis Loading..., seperti halaman lain",
    loading && !oldText,
    JSON.stringify({ loading, oldText }),
  );

  section("Tampilan");
  await open();
  const top = await evaluate(`(() => {
    const box = ${container}.getBoundingClientRect();
    const card = document.querySelector("main h1")?.parentElement.getBoundingClientRect();
    const input = document.querySelector("main input").getBoundingClientRect();
    const chips = [...document.querySelectorAll("main button[aria-pressed]")].map((b) => b.getBoundingClientRect());
    const rows = ${JSON.stringify(NAMES.slice(0, 3))}.map((name) => document.querySelector('main button[aria-label="Lihat pembayaran ' + name + '"]')?.closest("div.grid")?.getBoundingClientRect());
    const first = ${lihat}[0]?.closest("div.grid")?.getBoundingClientRect();
    return {
      card: Math.round(card?.height ?? 0),
      chipsBeside: chips.length === 3 && chips.every((c) => Math.abs(c.top + c.height / 2 - (input.top + input.height / 2)) <= 2),
      gaps: rows.slice(1).map((r, i) => (r && rows[i] ? Math.round(r.top - rows[i].top) : null)),
      firstTop: first ? Math.round(first.top - box.top) : null,
    };
  })()`);
  check(
    "1366 × 768: kartu lebih pendek, tombol pilihan sebaris dengan kotak cari, baris pertama mulai paling jauh 360 px dari atas",
    top.card > 0 &&
      top.card <= 160 &&
      top.chipsBeside &&
      top.firstTop !== null &&
      top.firstTop <= 360,
    JSON.stringify(top),
  );
  check(
    "  baris rapat: jarak antarbaris paling banyak 56 px",
    top.gaps.length === 2 && top.gaps.every((gap) => gap !== null && gap <= 56),
    JSON.stringify(top.gaps),
  );
  await evaluate(`${container}.scrollTop = ${container}.scrollHeight`);
  await sleep(400);
  const stuck = await evaluate(`(() => {
    const h = ${header}?.getBoundingClientRect();
    const box = ${container}.getBoundingClientRect();
    return h ? { header: Math.round(h.top), box: Math.round(box.top), scrolled: ${container}.scrollTop } : null;
  })()`);
  check(
    "  judul kolom tetap di atas saat digulir sampai bawah",
    !!stuck && stuck.scrolled > 400 && Math.abs(stuck.header - stuck.box) <= 1,
    JSON.stringify(stuck),
  );
  await size(1024, 768);
  await sleep(600);
  await evaluate(`${container}.scrollTop = 0`);
  await sleep(300);
  const narrow = await evaluate(`(() => {
    const head = ${header};
    if (!head) return null;
    const visible = (el) => el.getBoundingClientRect().width > 0;
    const headCells = [...head.children].filter(visible).filter((c) => c.innerText.trim());
    const row = ${rowOf(LONG_NAME)};
    const rowCells = [...row.children].filter(visible);
    const nameCell = rowCells[0];
    return {
      headHeights: headCells.map((c) => Math.round(c.getBoundingClientRect().height)),
      headLefts: headCells.map((c) => Math.round(c.getBoundingClientRect().left)),
      rowLefts: rowCells.slice(0, headCells.length).map((c) => Math.round(c.getBoundingClientRect().left)),
      nameWidth: Math.round(nameCell.getBoundingClientRect().width),
      nimUnderName: nameCell.innerText.trim().endsWith(${JSON.stringify(dewi.nim)}),
    };
  })()`);
  check(
    "1024 px: judul kolom satu baris dan sejajar isinya, NIM di bawah nama, kolom nama minimal 180 px",
    !!narrow &&
      narrow.headHeights.every((h) => h <= 24) &&
      JSON.stringify(narrow.headLefts) === JSON.stringify(narrow.rowLefts) &&
      narrow.nimUnderName &&
      narrow.nameWidth >= 180,
    JSON.stringify(narrow),
  );
  await size(1366, 768);

  section("Pop-up Ubah");
  await open();
  await realClick(
    `document.querySelector('main button[aria-label="Lihat pembayaran ${NAMES[0]}"]')`,
  );
  await waitFor(bodyHas("Status Pembayaran Mahasiswa"), 5000);
  await realClick(
    `document.querySelector('[aria-label="Ubah ${analisis.subject_name}"]')`,
  );
  await waitFor(bodyHas("Ubah Data Aktivasi Mahasiswa"), 5000);
  check(
    "tombol geser punya nama Status pembayaran",
    (await evaluate(
      `document.querySelector('[role="dialog"] [role="switch"]')?.getAttribute("aria-label")`,
    )) === "Status pembayaran",
  );
  await evaluate(
    `document.querySelector('[role="dialog"] [role="switch"]').click()`,
  );
  await sleep(300);
  await network(1500);
  await realClick(
    `[...document.querySelectorAll('[role="dialog"] button')].find((b) => b.innerText.trim() === "Simpan Perubahan")`,
  );
  await sleep(400);
  const locked = await evaluate(`(() => {
    const buttons = [...document.querySelectorAll('[role="dialog"] button')];
    return {
      saving: buttons.some((b) => b.innerText.trim() === "Menyimpan..."),
      toggle: !!document.querySelector('[role="dialog"] [role="switch"]')?.matches(":disabled"),
      kelas: !!document.querySelector('[role="dialog"] button[aria-haspopup="listbox"]')?.matches(":disabled"),
      kembali: !!buttons.find((b) => b.innerText.trim() === "Kembali")?.matches(":disabled"),
    };
  })()`);
  await waitFor(bodyHas("Pembayaran dikonfirmasi"), 20000);
  await network(0);
  check(
    "  selama menyimpan, tombol geser, pilihan kelas, dan Kembali terkunci",
    Object.values(locked).every(Boolean),
    JSON.stringify(locked),
  );
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
