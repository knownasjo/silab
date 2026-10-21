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

const data = new TestData("65");
const PAGE = "/dashboard/praktikum";
const ZETA = "Uji Praktikum Zeta";
const ALFA = "Uji Praktikum Alfa";
const EMPTY = "Uji Praktikum Kosong";
const LONG =
  "Uji Praktikum Analisis dan Perancangan Sistem Informasi Berorientasi Objek Lanjutan";
const EMPTY_TEXT = "Belum ada kelas di periode ini.";

const semesterButton = `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes("Semester 8"))`;
const subjectButton = (name) =>
  `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes(${JSON.stringify(name)}))`;
const subjectCard = (name) =>
  `(${subjectButton(name)})?.closest("div.border-2")`;
const classCards = (name) =>
  `[...((${subjectCard(name)})?.querySelectorAll("a") ?? [])]`;

await runWebTest("Halaman Praktikum", data, async (browser) => {
  const { evaluate, waitFor, send, realClick } = browser;

  const zeta = await data.subject(ZETA, { semester: "8" });
  const alfa = await data.subject(ALFA, { semester: "8" });
  await data.subject(EMPTY, { semester: "8" });
  const long = await data.subject(LONG, { semester: "8" });
  const alfaC = await data.classOf(alfa, "C", "MONDAY", 1);
  const alfaA = await data.classOf(alfa, "A", "TUESDAY", 1, { room: "SBTI" });
  const alfaB = await data.classOf(alfa, "B", "WEDNESDAY", 1, { quota: 2 });
  const zetaA = await data.classOf(zeta, "A", "THURSDAY", 1);
  await data.classOf(long, "A", "FRIDAY", 1);
  for (const student of await data.students(2))
    await data.enroll(student, alfaB);
  const assistant = await data.student("Asisten Praktikum Uji");
  for (const cls of [zetaA, alfaC, alfaA])
    await db.trn_class_collaborator.create({
      data: { userId: assistant.id, classId: cls.id },
    });

  let failClass = false;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (failClass && request.method === "GET" && path === "/class")
      return { fail: "ConnectionRefused" };
  });

  const open = async (button) => {
    if (
      (await evaluate(`(${button})?.getAttribute("aria-expanded")`)) === "false"
    )
      await realClick(button);
    await sleep(300);
  };

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Memuat");
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 2500,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  await browser.navigate(PAGE);
  const sawLoading = await waitFor(bodyHas("Loading..."), 20000);
  await send("Network.emulateNetworkConditions", {
    offline: false,
    latency: 0,
    downloadThroughput: -1,
    uploadThroughput: -1,
  });
  const loaded = await waitFor(`!!(${semesterButton})`, 20000);
  check("selama data dimuat tampil Loading...", sawLoading);
  check(
    "  setelah termuat Loading... hilang",
    loaded && !(await evaluate(bodyHas("Loading..."))),
  );

  section("Urutan");
  await open(semesterButton);
  const names = await evaluate(
    `[...document.querySelectorAll("#semester-8 button[aria-expanded] p.text-lg")].map((p) => p.innerText.trim())`,
  );
  const ours = names.filter((name) => name.startsWith("Uji Praktikum"));
  check(
    "mata kuliah dalam satu semester urut abjad",
    names.every(
      (name, i) => i === 0 || names[i - 1].localeCompare(name) <= 0,
    ) && JSON.stringify(ours) === JSON.stringify([ALFA, LONG, EMPTY, ZETA]),
    JSON.stringify(names),
  );

  for (const name of [ALFA, EMPTY, LONG]) await open(subjectButton(name));
  const alfaClasses = await evaluate(
    `${classCards(ALFA)}.map((a) => a.querySelector("p").innerText.trim())`,
  );
  check(
    "kelas urut A, B, C",
    JSON.stringify(alfaClasses) === JSON.stringify(["A", "B", "C"]),
    JSON.stringify(alfaClasses),
  );

  section("Isi kartu");
  check(
    "mata kuliah tanpa kelas menulis Belum ada kelas di periode ini.",
    await evaluate(
      `(${subjectCard(EMPTY)}).innerText.includes(${JSON.stringify(EMPTY_TEXT)})`,
    ),
  );
  check(
    "  mata kuliah yang punya kelas tidak menulisnya",
    !(await evaluate(
      `(${subjectCard(ALFA)}).innerText.includes(${JSON.stringify(EMPTY_TEXT)})`,
    )),
  );

  const longCard = await evaluate(`(() => {
    const card = ${classCards(LONG)}[0];
    const box = card.getBoundingClientRect();
    const name = [...card.querySelectorAll("p")].find((p) => p.getAttribute("title"));
    const outside = [...card.querySelectorAll("p")].filter((p) => {
      const t = p.getBoundingClientRect();
      return t.bottom > box.bottom + 1 || t.right > box.right + 1;
    }).map((p) => p.innerText.slice(0, 20));
    const lines = name ? Math.round(name.getBoundingClientRect().height / parseFloat(getComputedStyle(name).lineHeight)) : 0;
    return { outside, title: name?.getAttribute("title"), lines };
  })()`);
  check(
    "nama mata kuliah panjang tidak keluar dari kartu kelas",
    longCard.outside.length === 0,
    JSON.stringify(longCard),
  );
  check(
    "  paling banyak 2 baris, nama lengkap ada saat disorot",
    longCard.lines <= 2 && longCard.title === LONG,
    JSON.stringify(longCard),
  );

  const cardTexts = await evaluate(
    `Object.fromEntries(${classCards(ALFA)}.map((a) => [a.querySelector("p").innerText.trim(), a.innerText.replace(/\\s+/g, " ").trim()]))`,
  );
  check(
    "kelas penuh (2/2) bertanda Penuh",
    cardTexts.B?.includes("2/2") && cardTexts.B?.includes("Penuh"),
    JSON.stringify(cardTexts),
  );
  check(
    "  kelas yang belum penuh tanpa tanda",
    !cardTexts.A?.includes("Penuh") && !cardTexts.C?.includes("Penuh"),
    JSON.stringify(cardTexts),
  );
  check(
    "ruangan tampil di sebelah jam",
    cardTexts.A?.includes("Selasa, 18.00 - 18.40 · SBTI") &&
      cardTexts.C?.includes("Senin, 18.00 - 18.40 · PSI"),
    JSON.stringify(cardTexts),
  );

  section("Kembali dari detail kelas");
  await realClick(`${classCards(ALFA)}[0]`);
  const inDetail = await waitFor(
    `location.pathname === "${PAGE}/${alfaA.id}" && ${bodyHas(ALFA)}`,
    20000,
  );
  await sleep(1000);
  await evaluate("history.back(), true");
  const back = await waitFor(
    `location.pathname === "${PAGE}" && !!(${semesterButton})`,
    20000,
  );
  await sleep(1000);
  const states = await evaluate(`({
    semester: (${semesterButton})?.getAttribute("aria-expanded"),
    alfa: (${subjectButton(ALFA)})?.getAttribute("aria-expanded"),
    classes: ${classCards(ALFA)}.length,
  })`);
  check(
    "semester dan mata kuliah yang tadi dibuka tetap terbuka",
    inDetail &&
      back &&
      states.semester === "true" &&
      states.alfa === "true" &&
      states.classes === 3,
    JSON.stringify({ inDetail, back, ...states }),
  );

  section("Daftar kelas gagal dimuat");
  failClass = true;
  await browser.navigate(PAGE);
  await waitFor(`!!(${semesterButton})`, 20000);
  const failed = await waitFor(
    bodyHas("Tidak dapat terhubung ke server"),
    15000,
  );
  await sleep(1000);
  check("pesan error tampil", failed);
  check(
    "  mata kuliah tidak ditulis Belum ada kelas",
    !(await evaluate(bodyHas(EMPTY_TEXT))),
  );
  failClass = false;

  section("Layar 1024 px");
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1024,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await browser.navigate(PAGE);
  await waitFor(bodyHas("Tambah Praktikum"), 20000);
  await sleep(800);
  const banner = await evaluate(`(() => {
    const link = [...document.querySelectorAll("a")].find((a) => a.innerText.trim() === "Tambah Praktikum");
    const box = link.closest("div.rounded-3xl").getBoundingClientRect();
    const button = link.getBoundingClientRect();
    const text = link.previousElementSibling.getBoundingClientRect();
    return {
      height: Math.round(button.height),
      inside: button.bottom <= box.bottom + 1 && text.bottom <= button.top + 1,
    };
  })()`);
  check(
    "tombol Tambah Praktikum utuh dan di dalam kotak",
    banner.height === 54 && banner.inside,
    JSON.stringify(banner),
  );
  await send("Emulation.clearDeviceMetricsOverride");

  section("Asisten");
  const assistantBrowser = await openBrowser();
  try {
    check(
      "login asisten",
      await assistantBrowser.login(assistant, data.password),
    );
    await assistantBrowser.navigate(PAGE);
    await assistantBrowser.waitFor(bodyHas(ZETA), 20000);
    const order = await assistantBrowser.evaluate(
      `[...document.querySelectorAll("main a")].map((a) => a.querySelector("p").innerText.trim() + " " + a.querySelector("p.text-lg").innerText.trim())`,
    );
    check(
      "kelas asisten urut menurut mata kuliah lalu nama kelas",
      JSON.stringify(order) ===
        JSON.stringify([`A ${ALFA}`, `C ${ALFA}`, `A ${ZETA}`]),
      JSON.stringify(order),
    );
  } finally {
    await assistantBrowser.close();
  }
});
