import { existsSync, readdirSync, readFileSync } from "node:fs";
import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("56");
const NAME = "Uji Kode Web";
const MUST_BE_9 = "Kode mata kuliah harus 9 angka.";

await runWebTest("Kode mata kuliah di web", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto } = browser;
  const subject = await data.subject(NAME, { semester: "8" });
  const code = subject.subject_code;
  const cls = await data.classOf(subject, "C", "MONDAY", 1);
  const student = await data.student();
  await data.activate(student, subject, true);
  await data.enroll(student, cls);
  const meeting = await data.meeting(cls, "Pertemuan 1");
  await data.attend(meeting, student, true);

  const writes = [];
  await browser.intercept((request) => {
    if (
      ["POST", "PUT"].includes(request.method) &&
      new URL(request.url).pathname.startsWith("/subject")
    )
      writes.push({
        method: request.method,
        body: JSON.parse(request.postData ?? "{}"),
      });
  });
  const waitForWrite = async () => {
    const end = Date.now() + 5000;
    while (Date.now() < end && writes.length === 0) await sleep(100);
    await sleep(300);
  };

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Daftar praktikum");
  await browser.navigate("/dashboard/praktikum");
  const semester = `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes("Semester 8"))`;
  check("kelompok Semester 8 tampil", await waitFor(`!!(${semester})`, 20000));
  if (
    (await evaluate(`(${semester}).getAttribute("aria-expanded")`)) === "false"
  )
    await realClick(semester);
  const header = `[...document.querySelectorAll("button")].find((b) => b.innerText.includes(${JSON.stringify(NAME)}) && !b.getAttribute("aria-label"))`;
  check("kartu mata kuliah tampil", await waitFor(`!!(${header})`, 5000));
  check(
    "kode tampil di sebelah nama tanpa membuka kartu",
    (await evaluate(`(${header}).innerText`)).includes(code),
  );
  const style = await evaluate(`(() => {
    const p = [...(${header}).querySelectorAll("p")].find((x) => x.innerText.trim() === ${JSON.stringify(code)});
    if (!p) return null;
    const cs = getComputedStyle(p);
    return { size: cs.fontSize, color: cs.color };
  })()`);
  check(
    "  kode kecil berwarna abu-abu",
    style?.size === "14px" && style?.color === "rgb(94, 98, 120)",
    JSON.stringify(style),
  );
  await realClick(header);
  check(
    "isi kartu terbuka",
    await waitFor(bodyHas(`Dosen pengampu: ${data.lecturer.fullname}`), 5000),
  );
  check(
    "  baris lama '· Kode' sudah tidak ada",
    !(await evaluate(bodyHas("· Kode"))),
  );

  section("Ubah mata kuliah");
  await realClick(
    `document.querySelector('[aria-label="Ubah mata kuliah ${NAME}"]')`,
  );
  check(
    "dialog ubah terbuka dengan kode sekarang",
    await waitFor(
      `document.querySelector("#subject-code")?.value === ${JSON.stringify(code)}`,
      5000,
    ),
  );
  check(
    "  kolom kode memakai keyboard angka",
    (await evaluate(`document.querySelector("#subject-code").inputMode`)) ===
      "numeric",
  );
  check(
    "  huruf yang diketik dibuang",
    (await typeInto("#subject-code", "12a34")) === "1234",
  );
  await clickText("Simpan");
  check(
    "  kode 4 angka ditolak di browser",
    await waitFor(bodyHas(MUST_BE_9), 3000),
  );
  await sleep(500);
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );
  const newCode = data.nextCode();
  const spaced = newCode.replace(/(\d{3})(\d{3})(\d{3})/, "$1 $2 $3");
  check(
    "  tempel dengan spasi tetap utuh",
    (await typeInto("#subject-code", spaced)) === newCode,
  );
  await clickText("Simpan");
  await waitForWrite();
  check(
    "  kode 9 angka dikirim ke server",
    writes.length === 1 &&
      writes[0].method === "PUT" &&
      writes[0].body.subject_code === newCode,
    JSON.stringify(writes),
  );
  check(
    "  pesan berhasil tampil",
    await waitFor(bodyHas(`Mata kuliah ${NAME} berhasil diperbarui`), 8000),
  );
  check(
    "  tersimpan di database",
    (await db.mst_subject.findUnique({ where: { id: subject.id } }))
      .subject_code === newCode,
  );
  writes.length = 0;

  section("Tambah mata kuliah");
  await browser.navigate("/dashboard/master-data/add-subject");
  check(
    "halaman tambah mata kuliah tampil",
    await waitFor(bodyHas("Kode Mata Kuliah"), 20000),
  );
  check(
    "  petunjuk 9 angka",
    (await evaluate(`document.querySelector("#subject-code").placeholder`)) ===
      "9 angka",
  );
  check(
    "  tempel lebih dari 9 angka dipotong",
    (await typeInto("#subject-code", "1234567890123")) === "123456789",
  );
  check(
    "  campuran huruf dan tanda baca jadi angka saja",
    (await typeInto("#subject-code", "IF-5533.1000 9")) === "553310009",
  );
  await typeInto("#subject-code", "55331000");
  await typeInto("#subject-name", "Uji Form Kode");
  await clickText("Simpan");
  check(
    "  kode 8 angka ditolak di browser",
    await waitFor(bodyHas(MUST_BE_9), 3000),
  );
  await sleep(500);
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );

  section("Rekap presensi PDF");
  await browser.navigate(
    `/dashboard/praktikum/recap-attendances?classId=${cls.id}`,
  );
  check(
    "tombol Unduh PDF siap",
    await waitFor(
      `[...document.querySelectorAll("button")].some((b) => b.innerText.trim() === "Unduh PDF" && !b.disabled)`,
      20000,
    ),
  );
  await clickText("Unduh PDF");
  const pdfs = () =>
    existsSync(browser.downloads)
      ? readdirSync(browser.downloads).filter((f) => f.endsWith(".pdf"))
      : [];
  const end = Date.now() + 15000;
  while (Date.now() < end && pdfs().length === 0) await sleep(200);
  check("PDF terunduh", pdfs().length === 1);
  if (pdfs().length) {
    await sleep(500);
    const raw = readFileSync(`${browser.downloads}/${pdfs()[0]}`, "latin1");
    check(
      "  judul PDF memuat nama dan kode",
      raw.includes(`Praktikum ${NAME} \\(${newCode}\\)`),
      raw.match(/\(Praktikum[^)]*\)/)?.[0] ?? "judul tidak ketemu",
    );
    check(
      "  judul PDF memuat kelas dan semester",
      /Kelas C .{0,6}Semester 8/.test(raw),
    );
  }
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
