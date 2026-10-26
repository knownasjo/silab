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

const data = new TestData("79");
const PRAKTIKUM = "/dashboard/praktikum";
const NOT_ASSISTANT = "Anda bukan asisten kelas ini.";
const LIST_FAILED = "Daftar asisten gagal dimuat.";
const NO_ASSISTANT = "Asisten Praktikum Belum Ditambahkan";

const pageState = `({
  message: ${bodyHas(NOT_ASSISTANT)},
  back: [...document.querySelectorAll("main a")].some((a) => a.innerText.trim() === "Kembali ke Praktikum"),
  buttons: [...document.querySelectorAll("main button")].filter((b) => b.getBoundingClientRect().width > 0).map((b) => b.innerText.trim() || b.getAttribute("aria-label")),
  info: ${bodyHas("Kuota")},
})`;

const assistantsBox = `(() => {
  const label = [...document.querySelectorAll("main p")].find((p) => p.innerText === "Asisten Praktikum");
  return label ? label.parentElement.nextElementSibling.innerText.replace(/\\n+/g, " | ") : null;
})()`;

const toggleLabel = `[...document.querySelectorAll("main button")].map((b) => b.innerText.trim()).find((t) => ["Buka Presensi", "Tutup Presensi", "Memproses..."].includes(t)) ?? null`;

await runWebTest("Halaman asisten", data, async (browser) => {
  const { evaluate, waitFor, realClick, send } = browser;
  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const watch = async (expression, until, timeout = 15000) => {
    const seen = [];
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      const value = await evaluate(expression).catch(() => null);
      if (value !== null && seen[seen.length - 1] !== value) seen.push(value);
      if (await evaluate(until).catch(() => false)) break;
      await sleep(100);
    }
    return seen;
  };
  let failedList = null;
  await browser.intercept((request) => {
    if (
      failedList &&
      request.method !== "OPTIONS" &&
      request.url.includes(`/collaborator/${failedList}`)
    )
      return { fail: "ConnectionRefused" };
  });

  const alfa = await data.subject("Uji Asisten Alfa", { semester: "3" });
  const beta = await data.subject("Uji Asisten Beta", { semester: "5" });
  const gamma = await data.subject("Uji Asisten Gamma", { semester: "5" });
  const alfaA = await data.classOf(alfa, "A", "MONDAY", 1);
  const alfaB = await data.classOf(alfa, "B", "TUESDAY", 1);
  const alfaC = await data.classOf(alfa, "C", "WEDNESDAY", 1);
  const alfaD = await data.classOf(alfa, "D", "FRIDAY", 2);
  const betaA = await data.classOf(beta, "A", "THURSDAY", 1);
  const gammaA = await data.classOf(gamma, "A", "FRIDAY", 1);
  const assistant = await data.student("Asisten Satu Uji");
  const second = await data.student("Asisten Dua Uji");
  const third = await data.student("Asisten Tiga Uji");
  for (const [user, cls] of [
    [assistant, alfaA],
    [second, alfaA],
    [assistant, alfaB],
    [assistant, alfaD],
    [assistant, betaA],
    [second, betaA],
    [third, betaA],
    [third, alfaC],
  ])
    await db.trn_class_collaborator.create({
      data: { userId: user.id, classId: cls.id },
    });
  await data.activate(assistant, gamma, true);
  await data.enroll(assistant, gammaA);

  const [s1, s2, s3] = await data.students(3);
  for (const student of [s1, s2, s3]) {
    await data.activate(student, alfa, true);
    await data.enroll(student, alfaA);
  }
  await data.enroll(s1, gammaA);
  const [p1, , p3] = [
    await data.meeting(alfaA, "Pertemuan 1"),
    await data.meeting(alfaA, "Pertemuan 2"),
    await data.meeting(alfaA, "Pertemuan 3"),
  ];
  await data.attend(p1, s1, true);
  await data.attend(p1, s2, true);
  for (const cls of [alfaB, alfaC, alfaD, betaA])
    await data.meeting(cls, "Pertemuan 1");
  await data.attend(await data.meeting(gammaA, "Pertemuan 1"), assistant, true);

  const laboranToken = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const removeAssistant = (cls) =>
    call("DELETE", `/collaborator/${cls.id}/${assistant.id}`, {
      token: laboranToken,
    });
  const openDetail = async (cls) => {
    await browser.navigate(`${PRAKTIKUM}/${cls.id}`);
    return waitFor(bodyHas("Jumlah hadir"), 20000);
  };

  check("login asisten", await browser.login(assistant, data.password));

  section("Kelas yang bukan pegangan asisten");
  for (const [label, cls] of [
    ["kelas asisten lain", alfaC],
    ["kelas tempat ia ikut praktikum sebagai mahasiswa", gammaA],
  ]) {
    await browser.navigate(`${PRAKTIKUM}/${cls.id}`);
    await waitFor(bodyHas(NOT_ASSISTANT), 20000);
    await sleep(1500);
    const state = await evaluate(pageState);
    check(
      `${label}: hanya "${NOT_ASSISTANT}" dan Kembali ke Praktikum, tanpa data kelas dan tombol kelola`,
      state.message && state.back && !state.info && state.buttons.length === 0,
      JSON.stringify(state),
    );
  }
  await realClick(
    `[...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali ke Praktikum")`,
  );
  check(
    "  Kembali ke Praktikum membuka daftar kelas asisten",
    await waitFor(
      `location.pathname === ${JSON.stringify(PRAKTIKUM)} && ${bodyHas("Uji Asisten Beta")}`,
      15000,
    ),
  );
  for (const [label, cls] of [
    ["kelas asisten lain", alfaC],
    ["kelas tempat ia ikut praktikum", gammaA],
  ]) {
    await browser.navigate(`${PRAKTIKUM}/recap-attendances?classId=${cls.id}`);
    await waitFor(bodyHas(NOT_ASSISTANT), 20000);
    await sleep(1000);
    const recap = await evaluate(`({
      message: ${bodyHas(NOT_ASSISTANT)},
      table: !!document.querySelector("main table"),
      pdfOff: [...document.querySelectorAll("button")].find((b) => b.innerText.includes("Unduh PDF"))?.disabled,
      back: [...document.querySelectorAll("main a")].find((a) => a.innerText.trim() === "Kembali")?.getAttribute("href"),
    })`);
    check(
      `Rekap ${label}: pesan yang sama, tanpa tabel, Unduh PDF mati, Kembali ke Praktikum`,
      recap.message && !recap.table && recap.pdfOff && recap.back === PRAKTIKUM,
      JSON.stringify(recap),
    );
  }

  section("Asisten dicabut saat halaman terbuka");
  const detailBefore = await openDetail(alfaB);
  await sleep(1500);
  const removedDetail = await removeAssistant(alfaB);
  const detailSwitched = await waitFor(bodyHas(NOT_ASSISTANT), 10000);
  await sleep(500);
  const afterRemoval = await evaluate(pageState);
  check(
    "Detail Kelas langsung berganti ke pesan bukan asisten, tombol kelola hilang",
    detailBefore &&
      removedDetail.code === 200 &&
      detailSwitched &&
      afterRemoval.back &&
      afterRemoval.buttons.length === 0,
    JSON.stringify({ detailBefore, code: removedDetail.code, ...afterRemoval }),
  );
  await browser.navigate(`${PRAKTIKUM}/recap-attendances?classId=${alfaD.id}`);
  const recapBefore = await waitFor(
    bodyHas("Belum ada mahasiswa di kelas ini."),
    20000,
  );
  await sleep(1500);
  const removedRecap = await removeAssistant(alfaD);
  check(
    "  Rekap juga langsung berganti ke pesan itu",
    recapBefore &&
      removedRecap.code === 200 &&
      (await waitFor(bodyHas(NOT_ASSISTANT), 10000)),
    await evaluate(`document.querySelector("main").innerText.slice(0, 200)`),
  );

  section("Satu presensi terbuka per kelas");
  await call("PUT", `/meeting/${p1.id}/status`, {
    token: laboranToken,
    body: { status: true },
  });
  await openDetail(alfaA);
  await evaluate(
    `sessionStorage.setItem(${JSON.stringify(`pertemuan-terpilih:${alfaA.id}`)}, ${JSON.stringify(p3.id)})`,
  );
  await openDetail(alfaA);
  await waitFor(`${toggleLabel} === "Buka Presensi"`, 10000);
  await sleep(800);
  await browser.clickText("Buka Presensi");
  await waitFor(`!!document.querySelector("[role=dialog]")`, 10000);
  await sleep(500);
  const refusal = await evaluate(
    `document.querySelector("[role=dialog]")?.innerText ?? ""`,
  );
  const p3After = await db.trn_meetings.findUnique({ where: { id: p3.id } });
  check(
    "Pertemuan 1 masih dibuka: Buka Presensi untuk Pertemuan 3 menampilkan alasan penolakan",
    refusal.includes(
      "Presensi Pertemuan 1 masih dibuka. Tutup dulu sebelum membuka Pertemuan 3.",
    ) && p3After.status === false,
    JSON.stringify({ refusal, p3Open: p3After.status }),
  );
  await browser.pressEscape();
  await call("PUT", `/meeting/${p1.id}/status`, {
    token: laboranToken,
    body: { status: false },
  });

  section("Kotak Asisten Praktikum");
  failedList = betaA.id;
  await browser.navigate(`${PRAKTIKUM}/${betaA.id}`);
  await waitFor(bodyHas("Kuota"), 20000);
  await sleep(2500);
  const failedBox = await evaluate(assistantsBox);
  check(
    `daftar asisten gagal dimuat: tertulis "${LIST_FAILED}", bukan "${NO_ASSISTANT}"`,
    failedBox === LIST_FAILED,
    failedBox,
  );
  await openDetail(alfaA);
  await sleep(1000);
  await realClick(
    `[...document.querySelectorAll("aside nav a")].find((a) => a.innerText.includes("Praktikum"))`,
  );
  await waitFor(
    `location.pathname === ${JSON.stringify(PRAKTIKUM)} && ${bodyHas("Uji Asisten Beta")}`,
    20000,
  );
  await sleep(500);
  await realClick(
    `[...document.querySelectorAll("main a")].find((a) => a.innerText.includes("Uji Asisten Beta"))`,
  );
  const switched = await watch(
    `location.pathname.includes(${JSON.stringify(betaA.id)}) && ${bodyHas("Kuota")} ? ${assistantsBox} : null`,
    "false",
    6000,
  );
  check(
    "  pindah dari kelas lain tanpa muat ulang: daftar asisten kelas sebelumnya tidak ikut tampil",
    switched.length > 0 &&
      switched[switched.length - 1] === LIST_FAILED &&
      switched.every((text) => !text.includes("Asisten Satu Uji")),
    JSON.stringify(switched),
  );
  failedList = null;
  await openDetail(alfaA);
  await sleep(1000);
  await latency(1500);
  await realClick(
    `[...document.querySelectorAll("aside nav a")].find((a) => a.innerText.includes("Praktikum"))`,
  );
  await waitFor(
    `location.pathname === ${JSON.stringify(PRAKTIKUM)} && ${bodyHas("Uji Asisten Beta")}`,
    20000,
  );
  await realClick(
    `[...document.querySelectorAll("main a")].find((a) => a.innerText.includes("Uji Asisten Beta"))`,
  );
  const loading = await watch(
    `location.pathname.includes(${JSON.stringify(betaA.id)}) && ${bodyHas("Kuota")} ? ${assistantsBox} : null`,
    `${assistantsBox}?.includes("Asisten Tiga Uji")`,
    20000,
  );
  await latency(0);
  const finalNames = (loading[loading.length - 1] ?? "").split(" | ").sort();
  check(
    "  jaringan lambat: hanya Loading... lalu tiga asisten Beta, tanpa Belum Ditambahkan",
    JSON.stringify(finalNames) ===
      JSON.stringify([
        "Asisten Dua Uji",
        "Asisten Satu Uji",
        "Asisten Tiga Uji",
      ]) && loading.slice(0, -1).every((text) => text === "Loading..."),
    JSON.stringify(loading),
  );

  section("Tombol Buka Presensi");
  await openDetail(alfaA);
  await sleep(1000);
  await realClick(
    `document.querySelector('button[aria-label="Ubah presensi ${s3.fullname}"]')`,
  );
  await waitFor(`!!document.querySelector("[role=dialog]")`, 10000);
  await sleep(500);
  await realClick(
    `document.querySelector("[role=dialog] button[role=switch]")`,
  );
  await latency(1500);
  await browser.clickText("Simpan Perubahan");
  const whileSaving = await watch(
    toggleLabel,
    `!document.querySelector("[role=dialog]")`,
  );
  await latency(0);
  check(
    "menyimpan presensi mahasiswa: tombol Buka Presensi tidak berubah menjadi Memproses...",
    whileSaving.length > 0 &&
      whileSaving.every((label) => label === "Buka Presensi"),
    JSON.stringify(whileSaving),
  );
  await sleep(1000);
  await latency(1500);
  await browser.clickText("Buka Presensi");
  const ownClick = await watch(
    toggleLabel,
    `!!document.querySelector("[role=dialog]")`,
    20000,
  );
  await latency(0);
  check(
    "  menekan Buka Presensi sendiri: Memproses... lalu Tutup Presensi",
    ownClick.includes("Memproses...") &&
      (await waitFor(`${toggleLabel} === "Tutup Presensi"`, 10000)),
    JSON.stringify(ownClick),
  );
  await browser.pressEscape();
  await db.trn_meetings.updateMany({
    where: { classId: alfaA.id },
    data: { status: false },
  });
});
