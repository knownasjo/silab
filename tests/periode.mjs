import {
  bodyHas,
  check,
  db,
  openBrowser,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("57");
const TERMS = { GANJIL: "Ganjil", GENAP: "Genap" };
const label = (period) => `${period.year} ${TERMS[period.term]}`;
const nextOf = (period) => {
  if (period.term === "GANJIL") return { year: period.year, term: "GENAP" };
  const start = Number(period.year.split("/")[1]);
  return { year: `${start}/${start + 1}`, term: "GANJIL" };
};

await runWebTest("Periode akademik di web", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto } = browser;
  const realOpenMeetings = await db.trn_meetings.count({
    where: {
      status: true,
      deleted_at: null,
      class: { subject: { subject_code: { not: { startsWith: "999" } } } },
    },
  });
  if (
    !check(
      "tidak ada sesi presensi asli yang sedang terbuka",
      realOpenMeetings === 0,
      `${realOpenMeetings} sesi terbuka; tutup dulu lalu ulangi`,
    )
  )
    return;

  const oldName = label(data.period);
  const nextName = label(nextOf(data.period));
  const NOTICE = `Periode ${oldName} sudah selesai, data hanya bisa dilihat.`;
  const subject = await data.subject("Uji Periode Web", { semester: "8" });
  const cls = await data.classOf(subject, "A", "MONDAY", 1);
  const student = await data.student("Uji Periode Mahasiswa");
  await data.activate(student, subject, true);
  await data.enroll(student, cls);
  const unpaidSubject = await data.subject("Uji Periode Belum Bayar", {
    semester: "8",
  });
  await data.activate(student, unpaidSubject, false);
  const meeting = await data.meeting(cls, "Pertemuan 1");
  await data.attend(meeting, student, true);
  const activeName = async () =>
    label(
      await db.mst_academic_period.findFirst({
        orderBy: [{ year: "desc" }, { term: "desc" }],
      }),
    );
  const startButton = `Mulai Semester ${nextName}`;
  const submit = `[...document.querySelectorAll('button[type="submit"]')].find((b) => b.innerText.trim() === "Mulai Semester")`;
  const confirmInput = 'input[aria-label="Ketik MULAI"]';

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Halaman Periode Akademik");
  await browser.navigate("/dashboard/master-data/periode");
  check(
    "halaman tampil dengan periode aktif",
    await waitFor(
      `${bodyHas("Periode Akademik")} && ${bodyHas(oldName)} && ${bodyHas(startButton)}`,
      20000,
    ),
  );
  check(
    "menu Periode Akademik ada di Master Data",
    await evaluate(
      `!!document.querySelector('a[href="/dashboard/master-data/periode"]')`,
    ),
  );
  await clickText(startButton);
  check(
    "dialog konfirmasi menjelaskan akibatnya",
    await waitFor(
      `${bodyHas(`Mulai semester ${nextName}?`)} && ${bodyHas("menjadi arsip yang hanya bisa dilihat")} && ${bodyHas(`Jam sesi ${oldName} disalin ke semester baru`)} && ${bodyHas("Tidak bisa dibatalkan dari aplikasi.")}`,
      5000,
    ),
  );
  check(
    "  tombol mulai terkunci sebelum mengetik MULAI",
    await evaluate(`(${submit}).disabled`),
  );
  await typeInto(confirmInput, "mulai");
  check(
    "  huruf kecil belum membuka tombol",
    await evaluate(`(${submit}).disabled`),
  );
  await typeInto(confirmInput, "MULAI");
  check(
    "  setelah MULAI tombol terbuka",
    await waitFor(`!(${submit}).disabled`, 2000),
  );
  await clickText("Batal");
  await sleep(800);
  check(
    "  Batal tidak mengganti semester",
    (await activeName()) === oldName,
    await activeName(),
  );

  await clickText(startButton);
  await waitFor(`!!document.querySelector('${confirmInput}')`, 5000);
  await typeInto(confirmInput, "MULAI");
  const [testSession] = await data.sessions();
  const sessionRow = `[...document.querySelectorAll("div.grid")].find((row) => row.firstElementChild?.innerText === "Sesi ${testSession.number}")`;
  const jamSesi = await openBrowser();
  try {
    check(
      "login laboran di browser kedua",
      await jamSesi.login(data.laboran, data.password),
    );
    await jamSesi.navigate("/dashboard/master-data/jam-sesi");
    check(
      "  Jam Sesi sebelum semester baru: sesi uji dipakai 1 kelas",
      await jamSesi.waitFor(
        `(${sessionRow})?.innerText.includes("1 kelas")`,
        20000,
      ),
    );
    await realClick(submit);
    check(
      `semester ${nextName} dimulai dari web`,
      await waitFor(bodyHas(`Semester ${nextName} dimulai`), 15000),
    );
    check(
      "  Jam Sesi yang terbuka langsung berganti ke salinan: 0 kelas dan bisa dihapus",
      await jamSesi.waitFor(
        `(${sessionRow})?.innerText.includes("0 kelas") && (${sessionRow}).innerText.includes("Hapus")`,
        15000,
      ),
      await jamSesi.evaluate(`(${sessionRow})?.innerText`),
    );
  } finally {
    await jamSesi.close();
  }
  check(
    "  tersimpan di database",
    (await activeName()) === nextName,
    await activeName(),
  );
  check(
    "  daftar periode: yang baru aktif, yang lama selesai",
    await waitFor(
      `(() => { const rows = [...document.querySelectorAll("div.grid")].map((r) => r.innerText); return rows.some((t) => t.includes(${JSON.stringify(nextName)}) && t.includes("Aktif")) && rows.some((t) => t.includes(${JSON.stringify(oldName)}) && t.includes("Selesai")); })()`,
      10000,
    ),
  );

  section("Melihat arsip periode lama");
  await realClick(
    `document.querySelector('[aria-label="Lihat kelas ${oldName}"]')`,
  );
  check(
    "tombol Lihat membuka Praktikum dengan periode lama",
    await waitFor(
      `location.pathname === "/dashboard/praktikum" && ${bodyHas(NOTICE)}`,
      20000,
    ),
  );
  check(
    "  pilihan periode menunjukkan periode lama",
    await evaluate(
      `document.querySelector('[aria-label="Pilih periode"]')?.innerText.includes(${JSON.stringify(oldName)})`,
    ),
  );
  check(
    "  tombol Tambah Praktikum disembunyikan",
    !(await evaluate(bodyHas("Tambah Praktikum"))),
  );
  const semester = `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes("Semester 8"))`;
  await waitFor(`!!(${semester})`, 10000);
  if (
    (await evaluate(`(${semester})?.getAttribute("aria-expanded")`)) === "false"
  )
    await realClick(semester);
  check(
    "  mata kuliah uji tampil tanpa tombol ubah",
    (await waitFor(bodyHas("Uji Periode Web"), 5000)) &&
      !(await evaluate(
        `!!document.querySelector('[aria-label="Ubah mata kuliah Uji Periode Web"]')`,
      )),
  );

  await browser.navigate(`/dashboard/praktikum/${cls.id}`);
  check(
    "detail kelas lama bertanda arsip",
    await waitFor(`${bodyHas(NOTICE)} && ${bodyHas("Uji Periode Web")}`, 20000),
  );
  for (const text of ["Ubah Kelas", "Hapus Kelas", "Tambah Pertemuan"])
    check(`  tombol ${text} disembunyikan`, !(await evaluate(bodyHas(text))));
  check(
    "  tombol kelola asisten disembunyikan",
    !(await evaluate(
      `!!document.querySelector('[aria-label="Kelola asisten"]')`,
    )),
  );
  check("  rekap presensi tetap ada", await evaluate(bodyHas("Rekap All")));

  section("Pembayaran");
  const pick = async (name) => {
    await realClick(`document.querySelector('[aria-label="Pilih periode"]')`);
    await waitFor(
      `document.querySelectorAll('[role="option"]').length > 0`,
      3000,
    );
    await realClick(
      `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.includes(${JSON.stringify(name)}))`,
    );
  };
  const studentRow = `document.querySelector('[aria-label="Lihat pembayaran Uji Periode Mahasiswa"]')`;
  await browser.navigate("/dashboard/master-data/pembayaran");
  check(
    "halaman dimuat ulang kembali ke periode aktif, pendaftaran lama tidak tampil",
    await waitFor(
      `${bodyHas("Jumlah aktivasi mahasiswa")} && document.querySelector('[aria-label="Pilih periode"]')?.innerText.includes("(aktif)") && !${studentRow} && !${bodyHas(NOTICE)}`,
      20000,
    ),
  );
  await pick(oldName);
  check(
    "pilih periode lama: tanda arsip dan pendaftaran lama tampil",
    await waitFor(`${bodyHas(NOTICE)} && !!${studentRow}`, 15000),
  );
  await realClick(studentRow);
  check(
    "  dialog terbuka tanpa tombol Ubah dan Hapus",
    (await waitFor(
      `${bodyHas("Status Pembayaran Mahasiswa")} && ${bodyHas("Uji Periode Belum Bayar")}`,
      5000,
    )) &&
      !(await evaluate(
        `!!document.querySelector('[aria-label="Ubah Uji Periode Web"], [aria-label="Hapus Uji Periode Belum Bayar"]')`,
      )),
  );
  await clickText("Tutup");
  await sleep(500);
  await pick(nextName);
  check(
    "kembali ke periode aktif: tanda arsip hilang",
    await waitFor(
      `!${bodyHas(NOTICE)} && !${studentRow} && document.querySelector('[aria-label="Pilih periode"]')?.innerText.includes("(aktif)")`,
      15000,
    ),
  );
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
