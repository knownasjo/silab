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

const data = new TestData("77");
const PROFIL = "/dashboard/profil";
const NOTICE = "Data akun gagal dimuat";
const UNCHANGED = "Tidak ada perubahan yang perlu disimpan.";
const MISMATCH = "Konfirmasi password tidak sama.";
const LONG_NAME =
  "Muhammad Abdurrahman Wahyudiningrat Kusumawardhani Prawirodirdjo Hadikusumowibowo Setyaningrum Putra";
const PASSWORD_INPUTS = ["#old-password", "#new-password", "#confirm-password"];
const loadingStyle = `(() => {
  const p = [...document.querySelectorAll("main p")].find((x) => x.innerText.trim() === "Loading...");
  if (!p) return null;
  const s = getComputedStyle(p);
  return s.fontSize + " " + s.fontWeight + " " + s.color;
})()`;
const LOADING_LOOK = "14px 600 rgb(94, 98, 120)";
const STYLED = `getComputedStyle(document.querySelector("main")).borderTopLeftRadius === "35px"`;
const TITLE_SHOWN = `[...document.querySelectorAll("main p")].some((p) => p.innerText === "Profil")`;
const formOf = (heading) =>
  `[...document.querySelectorAll("main form")].find((f) => f.querySelector("h2")?.innerText === ${JSON.stringify(heading)})`;
const eye = (label) =>
  `document.querySelector('main button[aria-label=${JSON.stringify(label)}]')`;
const brokenWords = `(() => {
  const dd = document.querySelector("main dd");
  const node = dd?.firstChild;
  if (!node) return null;
  const broken = [];
  for (const match of node.data.matchAll(/\\S+/g)) {
    const range = document.createRange();
    range.setStart(node, match.index);
    range.setEnd(node, match.index + match[0].length);
    if ([...range.getClientRects()].filter((r) => r.width > 0).length > 1) broken.push(match[0]);
  }
  const lines = Math.round(dd.getBoundingClientRect().height / parseFloat(getComputedStyle(dd).lineHeight));
  return { lines, broken };
})()`;

await runWebTest("Profil", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto, send } = browser;
  const puts = [];
  let accountDown = false;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname;
    if (request.method === "PUT") puts.push(path);
    if (accountDown && request.method === "GET" && path === "/auth/me")
      return { fail: "ConnectionRefused" };
  });
  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const size = (width) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const openProfile = async () => {
    await browser.navigate(PROFIL);
    return waitFor(bodyHas("Ganti Password"), 20000);
  };
  const value = (selector) =>
    evaluate(`document.querySelector(${JSON.stringify(selector)}).value`);
  const isLocked = (selector) =>
    evaluate(
      `document.querySelector(${JSON.stringify(selector)}).matches(":disabled")`,
    );
  const typeAtEnd = async (selector, text) => {
    await evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    })()`);
    await send("Input.insertText", { text });
    await sleep(200);
  };
  const feedbackIn = (heading) =>
    evaluate(
      `(${formOf(heading)})?.querySelector('[role="status"], [role="alert"]')?.innerText ?? ""`,
    );
  const counter = () =>
    evaluate(
      `[...(${formOf("Ubah Nama")}).querySelectorAll("p")].map((p) => p.innerText).find((t) => /^\\d+\\/100$/.test(t)) ?? null`,
    );

  await size(1366);
  check("login laboran", await browser.login(data.laboran, data.password));
  check("halaman Profil terbuka", await openProfile());

  section("Judul, memuat, dan gagal memuat");
  const titleLook = await evaluate(`(() => {
    const p = document.querySelector("main p");
    const s = getComputedStyle(p);
    return p.innerText + " " + s.fontSize + " " + s.fontWeight + " " + s.color;
  })()`);
  check(
    "judul halaman Profil 32 px tebal hitam",
    titleLook === "Profil 32px 700 rgb(0, 0, 0)",
    titleLook,
  );

  await latency(1500);
  await browser.navigate(PROFIL, { waitForLoad: false });
  const sawLoading = await waitFor(
    `location.pathname === ${JSON.stringify(PROFIL)} && ${STYLED} && ${loadingStyle} !== null`,
    20000,
  );
  const look = await evaluate(loadingStyle);
  const oldLoading = await evaluate(bodyHas("Memuat profil"));
  check(
    "saat memuat tampil Loading... seperti halaman lain",
    sawLoading && look === LOADING_LOOK && !oldLoading,
    `terlihat: ${sawLoading}, gaya: ${look}, "Memuat profil": ${oldLoading}`,
  );
  await waitFor(bodyHas("Ganti Password"), 30000);
  await latency(0);

  accountDown = true;
  await browser.navigate(PROFIL);
  const noticeShown = await waitFor(bodyHas(NOTICE), 15000);
  await sleep(1500);
  const failedView = await evaluate(`({
    title: ${TITLE_SHOWN},
    loading: ${bodyHas("Loading...")} || ${bodyHas("Memuat profil")},
    parts: document.querySelectorAll("main form, main dl").length,
  })`);
  check(
    "data akun gagal dimuat: judul dan pesan merah saja, tanpa tulisan memuat",
    noticeShown &&
      failedView.title &&
      !failedView.loading &&
      failedView.parts === 0,
    JSON.stringify(failedView),
  );
  accountDown = false;
  await clickText("Coba lagi");
  check(
    "  Coba lagi memuat data akun dan form",
    await waitFor(`${bodyHas("Ganti Password")} && !${bodyHas(NOTICE)}`, 15000),
  );

  section("Nama panjang di Data Akun");
  await db.mst_user.update({
    where: { id: data.laboran.id },
    data: { fullname: LONG_NAME },
  });
  const wraps = [];
  for (const width of [1024, 1366]) {
    await size(width);
    await openProfile();
    await waitFor(bodyHas("Wahyudiningrat"), 10000);
    wraps.push({ width, ...(await evaluate(brokenWords)) });
  }
  check(
    "nama panjang pindah baris di spasi, tidak memotong kata (1024 dan 1366 px)",
    wraps.every((wrap) => wrap.lines > 1 && wrap.broken?.length === 0),
    JSON.stringify(wraps),
  );
  await db.mst_user.update({
    where: { id: data.laboran.id },
    data: { fullname: data.laboran.fullname },
  });
  await size(1366);

  section("Ubah Nama");
  await openProfile();
  const nameLabel = await evaluate(
    `document.querySelector('label[for="fullname"]')?.innerText`,
  );
  const maxLength = await evaluate(`document.querySelector("#fullname").maxLength`);
  check(
    "label menulis (maks: 100 karakter) dan isian dibatasi 100",
    nameLabel?.includes("(maks: 100 karakter)") && maxLength === 100,
    `${nameLabel} / ${maxLength}`,
  );
  check(
    "penghitung awal sesuai nama sekarang (11/100)",
    (await counter()) === "11/100",
    await counter(),
  );
  await typeInto("#fullname", "Laboran Uji Baru");
  check(
    "  penghitung ikut ketikan (16/100)",
    (await counter()) === "16/100",
    await counter(),
  );
  await typeInto("#fullname", "a".repeat(120));
  const cappedLength = (await value("#fullname")).length;
  check(
    "  mengetik 120 huruf berhenti di 100",
    cappedLength === 100 && (await counter()) === "100/100",
    `${cappedLength} ${await counter()}`,
  );

  await typeInto("#fullname", data.laboran.fullname);
  puts.length = 0;
  await clickText("Simpan Nama");
  const unchanged = await waitFor(bodyHas(UNCHANGED), 5000);
  await sleep(500);
  check(
    "nama tanpa perubahan: pesan tampil dan tidak dikirim ke server",
    unchanged && puts.length === 0,
    `${await feedbackIn("Ubah Nama")} ${JSON.stringify(puts)}`,
  );
  await typeInto("#fullname", "  Laboran   Uji  ");
  check(
    "  pesan hilang saat mengetik lagi",
    !(await evaluate(bodyHas(UNCHANGED))),
  );
  await clickText("Simpan Nama");
  const spacesOnly = await waitFor(bodyHas(UNCHANGED), 5000);
  await sleep(500);
  check(
    "  beda spasi saja juga dianggap tanpa perubahan",
    spacesOnly && puts.length === 0,
    `${await feedbackIn("Ubah Nama")} ${JSON.stringify(puts)}`,
  );

  await typeInto("#fullname", "Laboran Uji Baru");
  await latency(1500);
  puts.length = 0;
  await clickText("Simpan Nama");
  await sleep(300);
  const nameLocked = await isLocked("#fullname");
  await typeAtEnd("#fullname", " Lagi");
  const typedWhileSaving = await value("#fullname");
  check(
    "isian nama terkunci selama menyimpan",
    nameLocked && typedWhileSaving === "Laboran Uji Baru",
    `terkunci: ${nameLocked}, isi: ${typedWhileSaving}`,
  );
  const nameSaved = await waitFor(bodyHas("Nama berhasil diperbarui"), 20000);
  await latency(0);
  await sleep(300);
  const stored = await db.mst_user.findUnique({
    where: { id: data.laboran.id },
  });
  const afterName = {
    value: await value("#fullname"),
    locked: await isLocked("#fullname"),
    sidebar: await evaluate(
      `[...document.querySelectorAll("aside span")].some((s) => s.innerText === "Laboran Uji Baru")`,
    ),
    stored: stored.fullname,
    puts: [...puts],
  };
  check(
    "  sesudah tersimpan: nama baru di isian, menu samping, dan database; isian bisa diketik lagi",
    nameSaved &&
      afterName.value === "Laboran Uji Baru" &&
      !afterName.locked &&
      afterName.sidebar &&
      afterName.stored === "Laboran Uji Baru" &&
      afterName.puts.length === 1,
    JSON.stringify(afterName),
  );

  section("Ganti Password");
  const eyeLabels = await evaluate(
    `[...document.querySelectorAll("main form button[aria-label]")].map((b) => b.getAttribute("aria-label"))`,
  );
  check(
    "tiga kolom password punya tombol mata",
    ["password lama", "password baru", "konfirmasi password baru"].every(
      (label) => eyeLabels.includes(`Tampilkan ${label}`),
    ),
    JSON.stringify(eyeLabels),
  );

  await typeInto("#new-password", "rahasiaBaru1");
  puts.length = 0;
  await realClick(eye("Tampilkan password baru"));
  await sleep(200);
  const shown = await evaluate(`({
    type: document.querySelector("#new-password").type,
    label: !!${eye("Sembunyikan password baru")},
    others: [document.querySelector("#old-password").type, document.querySelector("#confirm-password").type],
  })`);
  await realClick(eye("Sembunyikan password baru"));
  await sleep(200);
  const hiddenAgain = await evaluate(`document.querySelector("#new-password").type`);
  check(
    "tombol mata menampilkan lalu menyembunyikan password itu saja",
    shown.type === "text" &&
      shown.label &&
      shown.others.every((type) => type === "password") &&
      hiddenAgain === "password",
    JSON.stringify({ shown, hiddenAgain }),
  );
  check(
    "  tombol mata tidak menyimpan form",
    puts.length === 0 && (await feedbackIn("Ganti Password")) === "",
    `${JSON.stringify(puts)} ${await feedbackIn("Ganti Password")}`,
  );

  await typeInto("#old-password", data.password);
  await typeInto("#new-password", "rahasiaBaru1");
  await typeInto("#confirm-password", "rahasiaBaru2");
  await clickText("Simpan Password");
  const mismatch = await waitFor(bodyHas(MISMATCH), 5000);
  await typeInto("#confirm-password", "rahasiaBaru1");
  check(
    "pesan password hilang saat mengetik lagi",
    mismatch && !(await evaluate(bodyHas(MISMATCH))),
    `muncul: ${mismatch}`,
  );

  await realClick(eye("Tampilkan password lama"));
  await sleep(200);
  await latency(1500);
  puts.length = 0;
  await clickText("Simpan Password");
  await sleep(300);
  const passwordLocked = await evaluate(
    `${JSON.stringify(PASSWORD_INPUTS)}.every((s) => document.querySelector(s).matches(":disabled")) && [...document.querySelectorAll("main form button[aria-label]")].every((b) => b.matches(":disabled"))`,
  );
  await typeAtEnd("#new-password", "zz");
  const passwordWhileSaving = await value("#new-password");
  check(
    "isian password dan tombol mata terkunci selama menyimpan",
    passwordLocked && passwordWhileSaving === "rahasiaBaru1",
    `terkunci: ${passwordLocked}, isi: ${passwordWhileSaving}`,
  );
  const changed = await waitFor(bodyHas("Password berhasil diganti"), 20000);
  await latency(0);
  await sleep(300);
  const afterPassword = await evaluate(
    `${JSON.stringify(PASSWORD_INPUTS)}.map((s) => { const el = document.querySelector(s); return [el.value, el.type, el.matches(":disabled")]; })`,
  );
  check(
    "  sesudah berhasil: isian kosong, tersembunyi lagi, dan bisa diketik",
    changed &&
      afterPassword.every(
        ([text, type, locked]) => text === "" && type === "password" && !locked,
      ) &&
      puts.length === 1,
    `${JSON.stringify(afterPassword)} ${JSON.stringify(puts)}`,
  );
  const relogin = await call("POST", "/auth/login", {
    body: { nim: data.laboran.nim, password: "rahasiaBaru1" },
  });
  await sleep(3000);
  const stillHere = await evaluate("location.pathname");
  check(
    "  password baru bisa dipakai masuk dan halaman ini tetap masuk",
    relogin.code === 200 && stillHere === PROFIL,
    `${relogin.code} ${stillHere}`,
  );

  section("Asisten");
  const subject = await data.subject("Uji Profil Asisten");
  const cls = await data.classOf(subject, "A", "MONDAY", 1);
  const assistant = await data.student("Asisten Profil Uji");
  await db.trn_class_collaborator.create({
    data: { userId: assistant.id, classId: cls.id },
  });
  await send("Network.clearBrowserCookies");
  check("login asisten", await browser.login(assistant, data.password));
  await browser.navigate(PROFIL);
  await waitFor(bodyHas("Data Akun"), 20000);
  const assistantView = await evaluate(`({
    title: ${TITLE_SHOWN},
    forms: document.querySelectorAll("main form").length,
    note: ${bodyHas("Ubah nama dan password lewat aplikasi SILAB di HP.")},
  })`);
  check(
    "asisten: judul dan data akun tampil, tanpa form ubah",
    assistantView.title && assistantView.forms === 0 && assistantView.note,
    JSON.stringify(assistantView),
  );
});
