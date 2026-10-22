import { existsSync, readdirSync, readFileSync } from "node:fs";
import { jsPDF } from "jspdf";
import {
  bodyHas,
  call,
  check,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("69");
const SUBJECT =
  "Uji Rekap Sistem Informasi Geografis dan Analisis Spasial Lanjutan untuk Perencanaan Wilayah";
const LONG_NAME = "Muhammad Fadhil Ramadhan Saputra Wijayakusuma Nugroho";
const LONG_MEETING = "Pengganti Libur Nasional Hari Kemerdekaan RI";
const PAGE_RIGHT_MM = 297 - 12;

const recapPage = (cls, meetingId) =>
  `/dashboard/praktikum/recap-attendances?classId=${cls.id}${meetingId ? `&meetingId=${meetingId}` : ""}`;

const readPdfTexts = (raw) => {
  const fontObjects = Object.fromEntries(
    [
      ...raw.matchAll(
        /\n(\d+) 0 obj\s*<<\s*\/Type \/Font\s*\/BaseFont \/([\w-]+)/g,
      ),
    ].map(([, id, baseFont]) => [id, baseFont]),
  );
  const fonts = Object.fromEntries(
    [...raw.matchAll(/\/(F\d+) (\d+) 0 R/g)].map(([, name, id]) => [
      name,
      fontObjects[id],
    ]),
  );
  const measure = new jsPDF({
    orientation: "landscape",
    unit: "mm",
    format: "a4",
  });
  return raw
    .split("\nBT\n")
    .slice(1)
    .flatMap((block) => {
      const font = block.match(/\/(F\d+) ([\d.]+) Tf/);
      const position = block.match(/([\d.-]+) ([\d.-]+) Td/);
      const text = block.match(/\(((?:\\.|[^\\)])*)\) Tj/);
      if (!font || !position || !text) return [];
      const value = text[1].replace(/\\([()\\])/g, "$1");
      measure.setFont(
        "helvetica",
        fonts[font[1]] === "Helvetica-Bold" ? "bold" : "normal",
      );
      measure.setFontSize(Number(font[2]));
      const left = (Number(position[1]) * 25.4) / 72;
      return [{ text: value, right: left + measure.getTextWidth(value) }];
    });
};

await runWebTest("Rekap Presensi", data, async (browser) => {
  const { evaluate, waitFor, send, clickText } = browser;

  const subject = await data.subject(SUBJECT, { semester: "8" });
  const a = await data.classOf(subject, "A", "MONDAY", 1);
  const big = await data.classOf(subject, "D", "TUESDAY", 1, { quota: 45 });
  const doomed = await data.classOf(subject, "E", "WEDNESDAY", 1);
  const single = await data.classOf(subject, "G", "THURSDAY", 1);

  const students = await data.students(8, (i) =>
    i === 3 ? LONG_NAME : undefined,
  );
  for (const student of [...students].reverse()) await data.enroll(student, a);
  const meetings = [];
  for (let i = 1; i <= 14; i++)
    meetings.push(await data.meeting(a, `Pertemuan ${i}`));
  meetings.push(await data.meeting(a, "Responsi Akhir"));
  for (const [m, meeting] of meetings.entries()) {
    if (m >= 10) continue;
    for (const [s, student] of students.entries()) {
      const kind = (s + m) % 4;
      if (kind !== 0) await data.attend(meeting, student, kind !== 1);
    }
  }
  const expectedFooter = meetings.map((_, m) => (m < 10 ? "4/8" : "0/8"));

  const crowd = await data.students(40);
  for (const student of crowd) await data.enroll(student, big);
  const bigFirst = await data.meeting(big, "Pertemuan 1");
  await data.meeting(big, "Pertemuan 2");
  await data.meeting(big, "Pertemuan 3");
  for (const student of crowd.slice(0, 30))
    await data.attend(bigFirst, student, true);

  for (const student of students.slice(0, 2))
    await data.enroll(student, doomed);
  await data.meeting(doomed, "Pertemuan 1");

  for (const student of students.slice(0, 2))
    await data.enroll(student, single);
  const longMeeting = await data.meeting(single, LONG_MEETING);
  await data.attend(longMeeting, students[0], true);

  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const periodName = (await call("GET", `/class/${a.id}`, { token })).json.data
    .period.name;

  let failClass = false;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname;
    if (failClass && request.method === "GET" && path === `/class/${a.id}`)
      return { fail: "ConnectionRefused" };
  });

  const size = (width, height) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const openRecap = async (cls, meetingId) => {
    await browser.navigate(recapPage(cls, meetingId));
    const ok = await waitFor(`!!document.querySelector("main table")`, 20000);
    await sleep(800);
    return ok;
  };
  const scrollTable = (left, top = 0) =>
    evaluate(`(() => {
      const scroller = document.querySelector("main table").parentElement;
      scroller.scrollLeft = ${left === "end" ? "scroller.scrollWidth" : left};
      scroller.scrollTop = ${top === "end" ? "scroller.scrollHeight" : top};
      return true;
    })()`);
  const columns = () =>
    evaluate(`(() => {
      const scroller = document.querySelector("main table").parentElement.getBoundingClientRect();
      const ths = [...document.querySelectorAll("main thead th")];
      const box = (th) => { const r = th.getBoundingClientRect(); return { left: Math.round(r.left - scroller.left), right: Math.round(r.right - scroller.left) }; };
      return { width: Math.round(scroller.width), no: box(ths[0]), nim: box(ths[1]), name: box(ths[2]), firstMeeting: box(ths[3]), total: box(ths[ths.length - 1]) };
    })()`);
  const scrollbarThumb = async (left, wait = 300) => {
    if (left !== null) await scrollTable(left);
    await sleep(wait);
    const strip = await evaluate(`(() => {
      const scroller = document.querySelector("main table").parentElement.getBoundingClientRect();
      const ths = [...document.querySelectorAll("main thead th")];
      return {
        x: Math.round(scroller.left),
        y: Math.round(scroller.bottom) - 12,
        width: Math.round(scroller.width),
        meetingsFrom: Math.round(ths[2].getBoundingClientRect().right - scroller.left),
        meetingsTo: Math.round(ths[ths.length - 1].getBoundingClientRect().left - scroller.left),
      };
    })()`);
    const { data: png } = await send("Page.captureScreenshot", {
      format: "png",
      clip: {
        x: strip.x,
        y: strip.y,
        width: strip.width,
        height: 12,
        scale: 1,
      },
    });
    const thumb = await evaluate(`new Promise((done) => {
      const image = new Image();
      image.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0);
        const isThumb = (x, y) => {
          const [r, g, b] = context.getImageData(x, y, 1, 1).data;
          return Math.abs(r - 161) < 16 && Math.abs(g - 165) < 16 && Math.abs(b - 183) < 16;
        };
        const xs = [];
        for (let x = 0; x < image.width; x++) if (isThumb(x, image.height - 3)) xs.push(x);
        if (!xs.length) return done(null);
        const middle = Math.round((xs[0] + xs[xs.length - 1]) / 2);
        let thickness = 0;
        for (let y = 0; y < image.height; y++) if (isThumb(middle, y)) thickness++;
        done({ from: xs[0], to: xs[xs.length - 1], thickness });
      };
      image.onerror = () => done(null);
      image.src = "data:image/png;base64,${png}";
    })`);
    return {
      meetingsFrom: strip.meetingsFrom,
      meetingsTo: strip.meetingsTo,
      thumb,
    };
  };
  const buttonHeights = () =>
    evaluate(`(() => {
      const height = (text) => [...document.querySelectorAll("main a, main button")].find((el) => el.innerText.replace(/\\s+/g, " ").trim() === text)?.getBoundingClientRect().height;
      return { back: height("Kembali"), pdf: height("Unduh PDF") };
    })()`);
  const download = async () => {
    const before = new Set(
      existsSync(browser.downloads) ? readdirSync(browser.downloads) : [],
    );
    await clickText("Unduh PDF");
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

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Banyak pertemuan di layar 1024 px");
  await size(1024, 768);
  check("rekap terbuka", await openRecap(a));
  const idleAtOpen = await scrollbarThumb(null, 0);
  const start = await columns();
  check(
    "kolom Hadir terlihat tanpa menggeser tabel",
    start.total.left >= 0 && start.total.right <= start.width + 1,
    JSON.stringify(start),
  );
  await scrollTable("end");
  await sleep(300);
  const end = await columns();
  const pinned = (view) =>
    Math.abs(view.no.left) <= 1 &&
    Math.abs(view.nim.left - view.no.right) <= 1 &&
    Math.abs(view.name.left - view.nim.right) <= 1;
  check(
    "  setelah digeser ke ujung kanan, No, NIM, dan Nama tetap di kiri; hanya kolom pertemuan yang bergeser",
    pinned(start) &&
      pinned(end) &&
      end.firstMeeting.left < start.firstMeeting.left - 100,
    JSON.stringify({ start, end }),
  );
  const thumbStart = await scrollbarThumb(0);
  const thumbEnd = await scrollbarThumb("end");
  const pageScrollbar = await evaluate(
    `getComputedStyle(document.querySelector("main > div")).scrollbarWidth`,
  );
  check(
    "  saat digeser, scrollbar hanya di bawah kolom pertemuan (mulai setelah Nama, berhenti sebelum Hadir), halaman tetap tanpa scrollbar",
    !!thumbStart.thumb &&
      !!thumbEnd.thumb &&
      Math.abs(thumbStart.thumb.from - thumbStart.meetingsFrom) <= 2 &&
      Math.abs(thumbEnd.thumb.to - (thumbEnd.meetingsTo - 1)) <= 2 &&
      pageScrollbar === "none",
    JSON.stringify({ thumbStart, thumbEnd, pageScrollbar }),
  );
  check(
    "  tebal scrollbar 6 px",
    thumbStart.thumb?.thickness === 6 && thumbEnd.thumb?.thickness === 6,
    JSON.stringify([thumbStart.thumb, thumbEnd.thumb]),
  );
  const idleAfterStop = await scrollbarThumb(null, 1500);
  check(
    "  scrollbar tidak tampil saat tabel diam: saat dibuka dan 1,5 detik setelah berhenti digeser",
    idleAtOpen.thumb === null && idleAfterStop.thumb === null,
    JSON.stringify({
      atOpen: idleAtOpen.thumb,
      afterStop: idleAfterStop.thumb,
    }),
  );
  const longName = await evaluate(`(() => {
    const row = [...document.querySelectorAll("main tbody tr")].find((tr) => tr.innerText.includes(${JSON.stringify(LONG_NAME)}));
    const r = row.children[2].getBoundingClientRect();
    return { width: Math.round(r.width), height: Math.round(r.height) };
  })()`);
  check(
    "  kolom Nama minimal 200 px, nama panjang paling banyak 3 baris",
    longName.width >= 200 && longName.height <= 80,
    JSON.stringify(longName),
  );
  const narrowButtons = await buttonHeights();
  check(
    "  tombol Unduh PDF satu baris walau nama mata kuliah panjang",
    narrowButtons.pdf <= narrowButtons.back + 1,
    JSON.stringify(narrowButtons),
  );

  section("Banyak pertemuan di layar 1366 px");
  await size(1366, 768);
  await openRecap(a);
  await scrollTable("end");
  await sleep(300);
  const wide = await columns();
  check(
    "No, NIM, dan Nama tetap di kiri saat tabel digeser",
    pinned(wide),
    JSON.stringify(wide),
  );
  const wideButtons = await buttonHeights();
  check(
    "  tombol Unduh PDF satu baris",
    wideButtons.pdf <= wideButtons.back + 1,
    JSON.stringify(wideButtons),
  );
  check(
    "  baris Jumlah hadir menghitung yang hadir di tiap pertemuan",
    JSON.stringify(
      await evaluate(
        `[...document.querySelectorAll("main tfoot td")].slice(2, 18).map((td) => td.innerText.trim())`,
      ),
    ) === JSON.stringify(["Jumlah hadir", ...expectedFooter]),
    JSON.stringify(
      await evaluate(
        `[...document.querySelectorAll("main tfoot td")].map((td) => td.innerText.trim())`,
      ),
    ),
  );
  const subtitle = await evaluate(`document.querySelector("main").innerText`);
  check(
    "  periode dan dosen pengampu tampil di bawah judul",
    subtitle.includes(
      `Periode ${periodName} · Dosen pengampu: ${data.lecturer.fullname}`,
    ),
    subtitle.slice(0, 300),
  );

  section("Kelas 40 mahasiswa");
  await openRecap(big);
  const legendVisible = `(() => {
    const legend = [...document.querySelectorAll("main p")].find((p) => p.innerText.startsWith("Keterangan"));
    const r = legend.getBoundingClientRect();
    return document.elementFromPoint(r.left + 20, r.top + r.height / 2) === legend;
  })()`;
  check(
    "keterangan H/A/- terlihat tanpa menggulir tabel",
    await evaluate(legendVisible),
  );
  const footerAtStart = await evaluate(`(() => {
    const cell = document.querySelectorAll("main tfoot td")[3];
    if (!cell) return null;
    const r = cell.getBoundingClientRect();
    return { text: cell.innerText.trim(), visible: document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2) === cell };
  })()`);
  check(
    "  baris Jumlah hadir terlihat di bawah tanpa menggulir",
    footerAtStart?.text === "30/40" && footerAtStart.visible,
    JSON.stringify(footerAtStart),
  );
  await scrollTable(0, "end");
  await sleep(400);
  const headerAfterScroll = await evaluate(`(() => {
    const scroller = document.querySelector("main table").parentElement.getBoundingClientRect();
    const head = document.querySelector("main thead th").getBoundingClientRect();
    return { offset: Math.round(head.top - scroller.top), scrolled: document.querySelector("main table").parentElement.scrollTop };
  })()`);
  check(
    "  setelah digulir ke bawah, judul kolom tetap terlihat di atas",
    headerAfterScroll.scrolled > 0 && Math.abs(headerAfterScroll.offset) <= 1,
    JSON.stringify(headerAfterScroll),
  );

  section("PDF");
  await openRecap(a);
  const allPdf = readPdfTexts(await download());
  const allText = allPdf.map((run) => run.text).join(" ");
  check(
    "nama panjang utuh di PDF (turun baris, tanpa ...)",
    allText.includes(LONG_NAME) &&
      !allPdf.some((run) => run.text.endsWith("...")),
    allPdf
      .filter((run) => run.text.startsWith("Muhammad"))
      .map((run) => run.text)
      .join(" | "),
  );
  check(
    "  judul kolom Responsi Akhir tidak terpotong di tengah kata",
    allPdf.some((run) => run.text === "Responsi") &&
      allPdf.some((run) => run.text === "Akhir"),
    allPdf
      .filter((run) => /Res|Akh|nsi/.test(run.text))
      .map((run) => run.text)
      .join(" | "),
  );
  check(
    "  baris Jumlah hadir ada di PDF",
    allText.includes(`Jumlah hadir ${expectedFooter.join(" ")}`),
    allText.slice(allText.indexOf("Jumlah"), allText.indexOf("Jumlah") + 120),
  );
  check(
    "  periode dan dosen pengampu ada di PDF",
    allText.includes(
      `Periode ${periodName} · Dosen pengampu: ${data.lecturer.fullname}`,
    ),
    allPdf
      .filter((run) => run.text.includes("Periode"))
      .map((run) => run.text)
      .join(" | ") || "tidak ada",
  );
  await openRecap(single, longMeeting.id);
  const singlePdf = readPdfTexts(await download());
  const overflow = singlePdf.filter((run) => run.right > PAGE_RIGHT_MM + 0.3);
  check(
    "  rekap satu pertemuan berjudul panjang: semua tulisan muat di kertas",
    singlePdf.length > 0 && overflow.length === 0,
    JSON.stringify(overflow.map((run) => [run.text, Math.round(run.right)])),
  );
  check(
    "  subjudul turun baris tanpa ada yang hilang",
    singlePdf
      .map((run) => run.text)
      .join(" ")
      .includes(`Kelas G · Semester 8 · ${LONG_MEETING}`),
    singlePdf
      .slice(0, 4)
      .map((run) => run.text)
      .join(" | "),
  );

  section("Data kelas gagal dimuat");
  failClass = true;
  await browser.navigate(recapPage(a));
  const failed = await waitFor(
    bodyHas("Tidak dapat terhubung ke server"),
    20000,
  );
  await sleep(500);
  const failedView = await evaluate(`({
    table: !!document.querySelector("main table"),
    back: [...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali")?.getAttribute("href"),
  })`);
  check(
    "pesan error tampil tanpa tabel, Kembali ke daftar Praktikum",
    failed && !failedView.table && failedView.back === "/dashboard/praktikum",
    JSON.stringify({ failed, ...failedView }),
  );
  failClass = false;
  const updated = await call("PUT", `/class/${a.id}`, {
    token,
    body: {
      name: a.name,
      quota: a.quota + 1,
      day: a.day,
      room: a.room,
      sessionId: a.sessionId,
    },
  });
  check(
    "  tabel muncul lagi setelah kelas berubah (event real-time)",
    updated.code === 200 &&
      (await waitFor(
        `!!document.querySelector("main table") && ${bodyHas("Dosen pengampu")}`,
        15000,
      )),
    JSON.stringify({ code: updated.code, message: updated.json.message }),
  );

  section("Kelas dihapus saat Rekap terbuka");
  await openRecap(doomed);
  const removed = await call("DELETE", `/class/${doomed.id}`, { token });
  const gone = await waitFor(bodyHas("Kelas ini sudah dihapus."), 15000);
  const goneView = await evaluate(`({
    table: !!document.querySelector("main table"),
    link: [...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali ke Praktikum")?.getAttribute("href"),
  })`);
  check(
    "pesan Kelas ini sudah dihapus, tabel lama hilang",
    removed.code === 200 &&
      gone &&
      !goneView.table &&
      goneView.link === "/dashboard/praktikum",
    JSON.stringify({ code: removed.code, gone, ...goneView }),
  );

  section("Detail Kelas");
  await browser.navigate(`/dashboard/praktikum/${a.id}`);
  await waitFor(bodyHas("Jumlah hadir"), 20000);
  await sleep(800);
  const nims = await evaluate(
    `[...document.querySelectorAll("#recap-attendances > div")].slice(1).map((row) => row.querySelector("p")?.innerText.trim())`,
  );
  check(
    "mahasiswa urut NIM seperti di Rekap",
    JSON.stringify(nims) ===
      JSON.stringify(students.map((student) => student.nim)),
    JSON.stringify(nims),
  );
  const icon = await evaluate(`(() => {
    const link = [...document.querySelectorAll("main a")].find((a) => a.getAttribute("href")?.includes("meetingId="));
    return link && { title: link.getAttribute("title"), meeting: link.nextElementSibling?.innerText.trim() };
  })()`);
  check(
    "  ikon rekap per pertemuan berketerangan Rekap <judul pertemuan>",
    !!icon?.meeting && icon.title === `Rekap ${icon.meeting}`,
    JSON.stringify(icon),
  );
  await send("Emulation.clearDeviceMetricsOverride");
});
