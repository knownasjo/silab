import { existsSync, readdirSync, readFileSync } from "node:fs";
import {
  bodyHas,
  call,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("78");
const PRAKTIKUM = "/dashboard/praktikum";
const PAYMENT = "/dashboard/master-data/pembayaran";
const PAYMENT_ONLY = "Hanya laboran yang dapat melihat data pembayaran.";
const NOT_YOURS = "Kelas ini bukan mata kuliah yang Anda ampu.";
const LECTURER_BANNER =
  "Berikut adalah daftar mata kuliah praktikum yang Anda ampu";
const ASSISTANT_BANNER = "Berikut adalah daftar kelas praktikum Anda";

const cardsScript = `[...document.querySelectorAll("main div.rounded-3xl")]
  .filter((card) => card.querySelector("p")?.nextElementSibling)
  .map((card) => ({
    number: card.firstElementChild.innerText.trim(),
    title: card.lastElementChild.firstElementChild.innerText.trim(),
  }))`;

const layoutScript = `(() => {
  const cards = [...document.querySelectorAll("main div.rounded-3xl")].filter(
    (card) => card.querySelector("p")?.nextElementSibling,
  );
  const inside = (outer, inner) =>
    inner.left >= outer.left - 1 && inner.right <= outer.right + 1 &&
    inner.top >= outer.top - 1 && inner.bottom <= outer.bottom + 1;
  const problems = [];
  const rects = cards.map((card) => card.getBoundingClientRect());
  if (new Set(rects.map((rect) => Math.round(rect.top))).size !== 1)
    problems.push("kartu tidak satu baris");
  cards.forEach((card, i) => {
    for (const p of card.querySelectorAll("p")) {
      const range = document.createRange();
      range.selectNodeContents(p);
      if (!inside(rects[i], range.getBoundingClientRect()))
        problems.push("tulisan '" + p.innerText.trim().slice(0, 20) + "' keluar kartu " + (i + 1));
    }
  });
  const main = document.querySelector("main");
  if (main.scrollWidth > main.clientWidth) problems.push("halaman bisa digeser ke samping");
  return { count: cards.length, problems };
})()`;

const hadirCells = `[...document.querySelectorAll("main tbody tr")].map((row) => row.lastElementChild.innerText.trim())`;

await runWebTest("Halaman dosen", data, async (browser) => {
  const { evaluate, waitFor, realClick, send } = browser;
  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const size = (width, height = 768) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const download = async () => {
    const before = new Set(
      existsSync(browser.downloads) ? readdirSync(browser.downloads) : [],
    );
    await browser.clickText("Unduh PDF");
    const end = Date.now() + 15000;
    while (Date.now() < end) {
      const file = (
        existsSync(browser.downloads) ? readdirSync(browser.downloads) : []
      ).find((name) => name.endsWith(".pdf") && !before.has(name));
      if (file) {
        await sleep(500);
        return readFileSync(`${browser.downloads}/${file}`, "latin1");
      }
      await sleep(200);
    }
    return "";
  };

  const alfa = await data.subject("Uji Dosen Alfa", { semester: "3" });
  const beta = await data.subject("Uji Dosen Beta", { semester: "5" });
  const alfaA = await data.classOf(alfa, "A", "MONDAY", 1);
  const alfaB = await data.classOf(alfa, "B", "TUESDAY", 1);
  await data.classOf(beta, "A", "WEDNESDAY", 1);
  const [s1, s2, s3] = await data.students(3);
  for (const student of [s1, s2, s3]) await data.enroll(student, alfaA);
  for (const student of [s1, s2]) await data.enroll(student, alfaB);
  const meetings = [];
  for (let i = 1; i <= 4; i++)
    meetings.push(await data.meeting(alfaA, `Pertemuan ${i}`));
  await data.attend(meetings[0], s1, true);
  await data.attend(meetings[0], s2, true);
  await data.attend(meetings[0], s3, false);
  await data.meeting(alfaB, "Pertemuan 1");
  await data.meeting(alfaB, "Pertemuan 2");

  const otherLecturer = await data.user("DOSEN", "Dosen Lain Uji");
  const otherSubject = await db.mst_subject.create({
    data: {
      subjectCode: data.nextCode(),
      subjectName: "Uji Dosen Lain",
      semester: "3",
      lecturerId: otherLecturer.id,
      createdBy: data.laboran.id,
    },
  });
  const otherClass = await data.classOf(otherSubject, "A", "THURSDAY", 1);
  const assistant = await data.student("Asisten Dosen Uji");
  await db.trn_class_collaborator.create({
    data: { userId: assistant.id, classId: alfaA.id },
  });
  await data.activate(assistant, alfa, false);

  const laboranToken = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;

  await size(1366);
  check("login dosen", await browser.login(data.lecturer, data.password));

  section("Dashboard dosen");
  await browser.navigate("/dashboard");
  await waitFor(
    `${bodyHas("Jumlah Pertemuan")} && ${cardsScript}.every((card) => card.number !== "-")`,
    20000,
  );
  const cards = await evaluate(cardsScript);
  check(
    "tiga kartu: Jumlah Kelas, Jumlah Mahasiswa, Jumlah Pertemuan, tanpa Rata-rata Kehadiran",
    JSON.stringify(cards.map((card) => card.title)) ===
      JSON.stringify(["Jumlah Kelas", "Jumlah Mahasiswa", "Jumlah Pertemuan"]) &&
      !(await evaluate(bodyHas("Rata-rata Kehadiran"))) &&
      !(await evaluate(bodyHas("kesempatan hadir"))),
    JSON.stringify(cards),
  );
  check(
    "Jumlah Pertemuan hanya menghitung pertemuan yang sudah berjalan (3 kelas, 3 mahasiswa, 1 pertemuan)",
    JSON.stringify(cards.map((card) => card.number)) ===
      JSON.stringify(["3", "3", "1"]),
    JSON.stringify(cards),
  );
  const layouts = [];
  for (const width of [1024, 1366, 1440]) {
    await size(width, width === 1440 ? 900 : 768);
    await sleep(600);
    layouts.push({ width, ...(await evaluate(layoutScript)) });
  }
  await size(1366);
  check(
    "kartu satu baris dan semua tulisan di dalam kartu di 1024, 1366, dan 1440 px",
    layouts.every((layout) => layout.count === 3 && layout.problems.length === 0),
    JSON.stringify(layouts),
  );
  const edited = await call(
    "PUT",
    `/meeting/${meetings[1].id}/attendances/${s1.id}`,
    { token: laboranToken, body: { status: true } },
  );
  check(
    "  presensi Pertemuan 2 diisi laboran: Jumlah Pertemuan jadi 2 tanpa dimuat ulang",
    edited.code === 200 &&
      (await waitFor(
        `${cardsScript}.find((card) => card.title === "Jumlah Pertemuan")?.number === "2"`,
        10000,
      )),
    JSON.stringify(await evaluate(cardsScript)),
  );

  section("Praktikum");
  await latency(800);
  await browser.navigate(PRAKTIKUM, { waitForLoad: false });
  const banners = [];
  const end = Date.now() + 30000;
  while (Date.now() < end) {
    const text = await evaluate(
      `location.pathname === ${JSON.stringify(PRAKTIKUM)} ? (document.querySelector("main .rounded-3xl p")?.innerText ?? "") : ""`,
    ).catch(() => "");
    if (text && banners.at(-1) !== text) banners.push(text);
    if (await evaluate(bodyHas("Uji Dosen Alfa")).catch(() => false)) break;
    await sleep(80);
  }
  await latency(0);
  check(
    "saat memuat tidak sempat menampilkan tulisan asisten, langsung tulisan dosen",
    JSON.stringify(banners) === JSON.stringify([LECTURER_BANNER]),
    JSON.stringify(banners),
  );

  section("Detail Kelas");
  await browser.navigate(`${PRAKTIKUM}/${alfaA.id}`);
  await waitFor(bodyHas("Jumlah hadir"), 20000);
  await sleep(1000);
  const picked = await evaluate(
    `[...document.querySelectorAll("main button")].map((b) => b.innerText.trim()).find((t) => /^Pertemuan \\d+$/.test(t))`,
  );
  check(
    "tanpa presensi dibuka, pertemuan terakhir yang sudah berjalan yang terpilih (Pertemuan 2, bukan 4)",
    picked === "Pertemuan 2",
    picked,
  );
  await browser.navigate(`${PRAKTIKUM}/${otherClass.id}`);
  const refused = await waitFor(bodyHas(NOT_YOURS), 20000);
  const backLink = `[...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali ke Praktikum")`;
  const hasBack = await evaluate(`!!${backLink}`);
  check(
    "kelas dosen lain: pesan dan tautan Kembali ke Praktikum",
    refused && hasBack,
    `pesan: ${refused}, tautan: ${hasBack}`,
  );
  if (hasBack) await realClick(backLink);
  check(
    "  tautan membuka halaman Praktikum",
    hasBack &&
      (await waitFor(
        `location.pathname === ${JSON.stringify(PRAKTIKUM)} && ${bodyHas("Semester 3")}`,
        15000,
      )),
  );

  section("Rekap Presensi");
  await browser.navigate(
    `${PRAKTIKUM}/recap-attendances?classId=${alfaA.id}`,
  );
  await waitFor(bodyHas("Jumlah hadir"), 20000);
  await sleep(800);
  const totals = await evaluate(hadirCells);
  check(
    "kolom Hadir hanya menghitung pertemuan yang sudah berjalan (2/2, 1/2, 0/2)",
    JSON.stringify(totals) === JSON.stringify(["2/2", "1/2", "0/2"]),
    JSON.stringify(totals),
  );
  const pdf = await download();
  const pdfTexts = [...pdf.matchAll(/\(((?:\\.|[^\\)])*)\) Tj/g)].map(
    (match) => match[1],
  );
  check(
    "  PDF menulis angka Hadir yang sama, tanpa /4",
    ["2/2", "1/2", "0/2"].every((text) => pdfTexts.includes(text)) &&
      !pdfTexts.some((text) => /^\d+\/4$/.test(text)),
    JSON.stringify(pdfTexts.filter((text) => /^\d+\/\d+$|^-$/.test(text))),
  );
  await browser.navigate(
    `${PRAKTIKUM}/recap-attendances?classId=${alfaB.id}`,
  );
  await waitFor(bodyHas("Jumlah hadir"), 20000);
  await sleep(800);
  const noneHeld = await evaluate(hadirCells);
  check(
    "  kelas yang pertemuannya belum ada yang berjalan: kolom Hadir berisi -",
    JSON.stringify(noneHeld) === JSON.stringify(["-", "-"]),
    JSON.stringify(noneHeld),
  );

  section("Pembayaran lewat alamat");
  const paymentView = async () => {
    await browser.navigate(PAYMENT);
    const shown = await waitFor(bodyHas(PAYMENT_ONLY), 20000);
    await sleep(1500);
    return {
      shown,
      ...(await evaluate(`({
        controls: document.querySelectorAll("main input, main button").length,
        cards: ${bodyHas("Jumlah aktivasi")},
        list: ${bodyHas("Status Pembayaran")},
      })`)),
    };
  };
  const lecturerView = await paymentView();
  check(
    "dosen: hanya tulisan Hanya laboran, tanpa kartu, kotak cari, dan tombol",
    lecturerView.shown &&
      lecturerView.controls === 0 &&
      !lecturerView.cards &&
      !lecturerView.list,
    JSON.stringify(lecturerView),
  );

  section("Asisten");
  await send("Network.clearBrowserCookies");
  check("login asisten", await browser.login(assistant, data.password));
  await browser.navigate(PRAKTIKUM);
  check(
    "banner Praktikum asisten menulis Anda dengan huruf besar",
    await waitFor(bodyHas(ASSISTANT_BANNER), 20000),
  );
  const assistantView = await paymentView();
  check(
    "asisten: Pembayaran lewat alamat hanya tulisan Hanya laboran, data bayarnya sendiri tidak tampil",
    assistantView.shown &&
      assistantView.controls === 0 &&
      !assistantView.cards &&
      !assistantView.list,
    JSON.stringify(assistantView),
  );
});
