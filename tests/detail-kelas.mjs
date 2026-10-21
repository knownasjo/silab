import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("66");
const LONG_NAME = "Muhammad Fadhil Ramadhan Saputra Wijayakusuma Nugroho";

const picker = `document.querySelector('main button[id^="headlessui-listbox-button"]')`;
const pickerLabel = `(${picker})?.innerText.trim()`;
const dialogButton = (text) =>
  `[...document.querySelectorAll('[role="dialog"] button')].find((b) => b.innerText.trim() === ${JSON.stringify(text)})`;
const option = (name) =>
  `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.trim().startsWith(${JSON.stringify(name)}))`;

await runWebTest("Detail Kelas", data, async (browser) => {
  const { evaluate, waitFor, send, realClick } = browser;

  const subject = await data.subject("Uji Detail Kelas", { semester: "8" });
  const withOpen = await data.classOf(subject, "A", "MONDAY", 1);
  const noStudents = await data.classOf(subject, "B", "TUESDAY", 1);
  const allClosed = await data.classOf(subject, "C", "WEDNESDAY", 1);
  const noMeetings = await data.classOf(subject, "D", "THURSDAY", 1);
  const students = await data.students(4, (i) =>
    i === 1 ? LONG_NAME : undefined,
  );
  for (const student of students) await data.enroll(student, withOpen);
  for (const student of students.slice(0, 2))
    await data.enroll(student, allClosed);
  const first = await data.meeting(withOpen, "Pertemuan 1");
  await data.meeting(withOpen, "Pertemuan 2", { status: true });
  await data.meeting(withOpen, "Pertemuan 3");
  await data.attend(first, students[0], true);
  await data.meeting(noStudents, "Pertemuan 1");
  await data.meeting(allClosed, "Pertemuan 1");
  await data.meeting(allClosed, "Pertemuan 2");

  let failMeetings = false;
  const writes = [];
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname;
    if (request.method !== "GET" && path.includes("/attendances/"))
      writes.push(`${request.method} ${path}`);
    if (
      failMeetings &&
      request.method === "GET" &&
      path === `/meeting/${withOpen.id}`
    )
      return { fail: "ConnectionRefused" };
  });

  const page = (cls) => `/dashboard/praktikum/${cls.id}`;
  const open = async (cls, ready = bodyHas("Rekap All")) => {
    await browser.navigate(page(cls));
    const ok = await waitFor(ready, 20000);
    await sleep(800);
    return ok;
  };
  const pick = async (name) => {
    await realClick(picker);
    await waitFor(`!!(${option(name)})`, 5000);
    await realClick(option(name));
    await sleep(600);
  };
  const pressEnter = async () => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key: "Enter",
        code: "Enter",
        windowsVirtualKeyCode: 13,
        ...(type === "keyDown" && { text: "\r" }),
      });
  };

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Memuat");
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 2500,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  await browser.navigate(page(withOpen), { waitForLoad: false });
  const sawLoading = await waitFor(
    `location.pathname === "${page(withOpen)}" && ${bodyHas("Loading...")}`,
    20000,
  );
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  const loaded = await waitFor(bodyHas("Rekap All"), 20000);
  await sleep(800);
  check("selama halaman dimuat tampil Loading...", sawLoading);
  check(
    "  setelah termuat Loading... hilang",
    loaded && !(await evaluate(bodyHas("Loading..."))),
  );

  section("Pertemuan terpilih otomatis");
  check(
    "pertemuan yang presensinya dibuka langsung terpilih",
    (await waitFor(
      `${pickerLabel} === "Pertemuan 2" && ${bodyHas("Presensi Dibuka")} && ${bodyHas("Jumlah hadir")}`,
      10000,
    )) && !(await evaluate(bodyHas("Pilih Pertemuan untuk Melihat"))),
    await evaluate(pickerLabel),
  );
  await realClick(picker);
  await waitFor(`!!(${option("Pertemuan 1")})`, 5000);
  const options = await evaluate(
    `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.replace(/\\s+/g, " ").trim())`,
  );
  check(
    "daftar pertemuan menandai yang sedang dibuka",
    JSON.stringify(options) ===
      JSON.stringify(["Pertemuan 1", "Pertemuan 2 Dibuka", "Pertemuan 3"]),
    JSON.stringify(options),
  );
  await browser.pressEscape();

  await open(allClosed);
  check(
    "tanpa presensi dibuka, pertemuan terakhir yang terpilih",
    (await evaluate(pickerLabel)) === "Pertemuan 2" &&
      (await evaluate(bodyHas("Jumlah hadir"))),
    await evaluate(pickerLabel),
  );

  await open(withOpen);
  await pick("Pertemuan 1");
  await realClick(
    `[...document.querySelectorAll("a")].find((a) => a.innerText.trim() === "Rekap All")`,
  );
  const inRecap = await waitFor(
    `location.pathname.endsWith("recap-attendances")`,
    15000,
  );
  await sleep(1500);
  await evaluate("history.back(), true");
  const back = await waitFor(
    `location.pathname === ${JSON.stringify(page(withOpen))} && ${bodyHas("Jumlah hadir")}`,
    20000,
  );
  await sleep(800);
  check(
    "pilihan pertemuan tetap setelah kembali dari Rekap",
    inRecap && back && (await evaluate(pickerLabel)) === "Pertemuan 1",
    JSON.stringify({ inRecap, back, label: await evaluate(pickerLabel) }),
  );

  section("Isi kosong");
  await open(noStudents);
  check(
    "kelas tanpa mahasiswa menulis Belum ada mahasiswa di kelas ini.",
    (await evaluate(bodyHas("Belum ada mahasiswa di kelas ini."))) &&
      !(await evaluate(
        `[...document.querySelectorAll("#recap-attendances p")].some((p) => p.innerText.trim() === "NIM")`,
      )),
  );
  await open(noMeetings);
  check(
    "kelas tanpa pertemuan mengarahkan ke Tambah Pertemuan",
    await evaluate(
      bodyHas("Belum ada pertemuan. Klik Tambah Pertemuan untuk memulai."),
    ),
  );

  section("Tambah Pertemuan");
  const meetingCount = () =>
    db.trn_meetings.count({ where: { classId: noMeetings.id } });
  await browser.clickText("Tambah Pertemuan");
  await waitFor(`!!document.querySelector('[role="dialog"] input')`, 5000);
  await realClick(dialogButton("Batal"));
  await sleep(800);
  check(
    "Batal menutup pop-up tanpa menyimpan",
    !(await evaluate(`!!document.querySelector('[role="dialog"] input')`)) &&
      (await meetingCount()) === 0,
  );
  await browser.clickText("Tambah Pertemuan");
  await waitFor(`!!document.querySelector('[role="dialog"] input')`, 5000);
  await evaluate(`document.querySelector('[role="dialog"] input')?.focus()`);
  await pressEnter();
  await waitFor(bodyHas("berhasil ditambahkan"), 10000);
  check(
    "Enter di judul pertemuan langsung menyimpan",
    (await meetingCount()) === 1,
  );
  await realClick(dialogButton("Tutup"));
  await sleep(800);
  check(
    "  pertemuan baru langsung terpilih",
    (await evaluate(pickerLabel)) === "Pertemuan 1" &&
      (await evaluate(bodyHas("Presensi Ditutup"))),
    await evaluate(pickerLabel),
  );

  section("Pop-up QR");
  await open(withOpen, bodyHas("Jumlah hadir"));
  await pick("Pertemuan 2");
  await realClick(
    `[...document.querySelectorAll("main button")].find((b) => b.querySelector('img[src*="qr"]'))`,
  );
  await waitFor(`!!document.querySelector('[role="dialog"] svg')`, 15000);
  const small = await evaluate(
    `Math.round(document.querySelector('[role="dialog"] svg')?.getBoundingClientRect().width ?? 0)`,
  );
  await realClick(dialogButton("Layar Penuh"));
  await sleep(1200);
  const full = await evaluate(`({
    fullscreen: !!document.fullscreenElement,
    width: Math.round(document.querySelector('[role="dialog"] svg')?.getBoundingClientRect().width ?? 0),
  })`);
  check(
    "Layar Penuh memperbesar kode QR",
    full.fullscreen && full.width > small * 1.5,
    JSON.stringify({ small, ...full }),
  );
  await realClick(dialogButton("Keluar Layar Penuh"));
  await sleep(800);
  check(
    "  Keluar Layar Penuh kembali ke pop-up biasa",
    !(await evaluate("!!document.fullscreenElement")) &&
      (await evaluate(`!!document.querySelector('[role="dialog"] svg')`)),
  );
  await realClick(dialogButton("Tutup"));
  await sleep(800);
  check(
    "tombol Tutup menutup pop-up QR",
    !(await evaluate(`!!document.querySelector('[role="dialog"]')`)),
  );

  section("Pop-up Ubah Status Presensi");
  await browser.pressEscape();
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1366,
    height: 720,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await pick("Pertemuan 1");
  await realClick(
    `[...document.querySelectorAll("#recap-attendances > div")].find((row) => row.innerText.includes(${JSON.stringify(students[0].nim)}))?.querySelector("button")`,
  );
  await waitFor(
    `!!document.querySelector('[role="dialog"] [role="switch"]')`,
    5000,
  );
  await sleep(500);
  const layout = await evaluate(`(() => {
    if (!document.querySelector('[role="dialog"] [role="switch"]')) return { gap: -1, fits: false };
    const toggle = document.querySelector('[role="dialog"] [role="switch"]').getBoundingClientRect();
    const save = (${dialogButton("Simpan Perubahan")}).getBoundingClientRect();
    const buttons = [...document.querySelectorAll('[role="dialog"] button')].map((b) => b.getBoundingClientRect().bottom);
    return { gap: Math.round(save.top - toggle.bottom), fits: Math.max(...buttons) <= innerHeight };
  })()`);
  check(
    "di layar 720 px ada jarak antara sakelar dan tombol Simpan",
    layout.gap >= 16 && layout.fits,
    JSON.stringify(layout),
  );
  writes.length = 0;
  const cancel = await evaluate(`!!(${dialogButton("Batal")})`);
  if (cancel) await realClick(dialogButton("Batal"));
  await sleep(800);
  check(
    "  tombol Batal menutup tanpa mengubah presensi",
    cancel &&
      !(await evaluate(`!!document.querySelector('[role="dialog"]')`)) &&
      writes.length === 0,
    JSON.stringify({ cancel, writes }),
  );

  section("Layar 1024 px");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await open(withOpen, bodyHas("Rekap All"));
  await pick("Pertemuan 2");
  const narrow = await evaluate(`(() => {
    const main = document.querySelector("main").getBoundingClientRect();
    const labels = ["Ubah Kelas", "Hapus Kelas", "Tambah Pertemuan", "Ubah", "Hapus", "Buka Presensi", "Tutup Presensi", "Rekap All"];
    const buttons = [...document.querySelectorAll("main button, main a")]
      .filter((b) => labels.includes(b.innerText.trim()))
      .map((b) => ({ text: b.innerText.trim(), r: b.getBoundingClientRect() }));
    const wrapped = buttons.filter(({ r }) => r.height > 48 || r.right > main.right).map(({ text }) => text);
    const row = [...document.querySelectorAll("#recap-attendances > div")].find((d) => d.innerText.includes(${JSON.stringify(LONG_NAME)}));
    if (!row) return { buttons: buttons.length, wrapped, row: false };
    const [nim, name] = row.querySelectorAll("p");
    const text = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getBoundingClientRect(); };
    const box = [...document.querySelectorAll("p")].find((p) => p.innerText === "Dosen").closest(".rounded-\\\\[20px\\\\]").getBoundingClientRect();
    const lecturer = [...document.querySelectorAll("p")].find((p) => p.innerText === "Dosen").nextElementSibling.getBoundingClientRect();
    return {
      buttons: buttons.length,
      wrapped,
      nimInside: text(nim).right <= name.getBoundingClientRect().left + 1,
      nameInside: text(name).left >= name.getBoundingClientRect().left - 1 && text(name).right <= name.getBoundingClientRect().right + 1,
      lecturerInside: lecturer.bottom <= box.bottom && lecturer.width > 80,
    };
  })()`);
  check(
    "tombol tetap satu baris dan tidak keluar halaman",
    narrow.buttons >= 6 && narrow.wrapped.length === 0,
    JSON.stringify(narrow),
  );
  check(
    "  NIM dan nama mahasiswa panjang tidak saling menimpa",
    narrow.nimInside && narrow.nameInside,
    JSON.stringify(narrow),
  );
  check(
    "  nama dosen utuh di dalam kotak informasi",
    narrow.lecturerInside,
    JSON.stringify(narrow),
  );
  await send("Emulation.clearDeviceMetricsOverride");

  section("Daftar pertemuan gagal dimuat");
  failMeetings = true;
  await open(withOpen, bodyHas("Rekap All"));
  const failed = await waitFor(
    bodyHas("Tidak dapat terhubung ke server"),
    15000,
  );
  check("pesan error tampil", failed);
  check(
    "  tidak ditulis Belum ada pertemuan",
    !(await evaluate(bodyHas("Belum ada pertemuan"))),
  );
  failMeetings = false;
});
