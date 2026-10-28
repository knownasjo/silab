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

const data = new TestData("76");
const LIST = "/dashboard/pengumuman/list-pengumuman";
const BUSY = "Server sedang sibuk, silakan coba lagi sebentar lagi.";
const GONE = "Pengumuman ini sudah dihapus.";
const DIALOG = `document.querySelector('[role="dialog"]')`;
const DIALOG_TITLE = `document.querySelector('[role="dialog"] input[maxlength="150"]')`;
const DIALOG_BODY = `document.querySelector('[role="dialog"] textarea')`;
const RED = "rgb(241, 65, 108)";
const cardOf = (title) =>
  `[...document.querySelectorAll("main p")].find((p) => p.innerText === ${JSON.stringify(title)})?.closest(".space-x-3")`;
const dialogButton = (text) =>
  `[...document.querySelectorAll('[role="dialog"] button')].find((b) => b.innerText.trim() === ${JSON.stringify(text)})`;
const dialogLabel = (text) =>
  `[...document.querySelectorAll('[role="dialog"] label')].find((l) => l.innerText.startsWith(${JSON.stringify(text)}))`;
const loadingStyle = `(() => {
  const p = [...document.querySelectorAll("main p")].find((x) => x.innerText.trim() === "Loading...");
  if (!p) return null;
  const s = getComputedStyle(p);
  return s.fontSize + " " + s.fontWeight + " " + s.color;
})()`;
const LOADING_LOOK = "14px 600 rgb(94, 98, 120)";
const STYLED = `getComputedStyle(document.querySelector("main")).borderTopLeftRadius === "35px"`;

await runWebTest("List dan Detail Pengumuman", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText, typeInto, send } = browser;
  const alfa = await data.subject("Uji Daftar Alfa", { semester: "2" });
  const make = (title, fields = {}) =>
    db.mst_announcement.create({
      data: {
        type: "BASIC",
        title,
        body: "Isi pengumuman uji.",
        author: data.laboran.id,
        ...fields,
      },
    });
  const targeted = await make("Uji Daftar Tujuan", {
    forAll: false,
    periodId: data.period.id,
    subjects: { create: [{ subjectId: alfa.id }] },
  });
  await make("Uji Daftar Satu");
  const two = await make("Uji Daftar Dua");
  await make("Uji Daftar Tiga");
  const four = await make("Uji Daftar Empat");
  const five = await make("Uji Daftar Lima");
  for (let i = 1; i <= 6; i++) await make(`Uji Daftar Isi ${i}`);
  await make("Uji Daftar Lama", {
    createdAt: new Date("2001-01-01T00:00:00Z"),
  });
  const login = await call("POST", "/auth/login", {
    body: { nim: data.laboran.nim, password: data.password },
  });
  const api = (method, path, body) =>
    call(method, path, { token: login.json.data?.accessToken, body });

  let listMode = "asli";
  await browser.intercept((request) => {
    if (
      listMode === "gagal" &&
      request.method === "GET" &&
      new URL(request.url).pathname === "/announcement"
    )
      return json(503, { status: false, message: BUSY });
  });
  const latency = (ms) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency: ms,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const openList = async () => {
    await browser.navigate(LIST);
    return waitFor(`!!(${cardOf("Uji Daftar Satu")})`, 20000);
  };
  const openMenu = async (title) => {
    await realClick(`(${cardOf(title)})?.querySelector("button")`);
    return waitFor(`!!document.querySelector('[role="menuitem"]')`, 3000);
  };
  const openEdit = async (title) => {
    await openMenu(title);
    await clickText("Edit");
    return waitFor(bodyHas("Edit Pengumuman"), 5000);
  };
  const openDelete = async (title) => {
    await openMenu(title);
    await clickText("Hapus");
    return waitFor(`!!${DIALOG}`, 5000);
  };
  const buttonLook = (selector) =>
    evaluate(`(() => {
      const el = ${selector};
      if (!el) return null;
      const s = getComputedStyle(el);
      return { border: s.borderTopWidth, background: s.backgroundColor, color: s.color };
    })()`);

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  check("login laboran", await browser.login(data.laboran, data.password));
  check("halaman List Pengumuman terbuka", await openList());

  section("Tampilan daftar");
  const heading = await evaluate(`(() => {
    const p = document.querySelector("main p");
    const s = getComputedStyle(p);
    return { text: p.innerText, size: s.fontSize, weight: s.fontWeight };
  })()`);
  check(
    "judul halaman List Pengumuman, 32px tebal seperti halaman lain",
    heading.text === "List Pengumuman" &&
      heading.size === "32px" &&
      heading.weight === "700",
    JSON.stringify(heading),
  );
  await latency(2000);
  await browser.navigate(LIST, { waitForLoad: false });
  await waitFor(
    `location.pathname === "${LIST}" && ${bodyHas("Loading...")} && ${STYLED}`,
    30000,
  );
  const listLoading = await evaluate(loadingStyle);
  await latency(0);
  check(
    "Loading... bergaya seperti halaman lain",
    listLoading === LOADING_LOOK,
    listLoading,
  );
  listMode = "gagal";
  await browser.navigate(LIST);
  check(
    "gagal memuat: pesan 'Daftar pengumuman gagal dimuat. ...'",
    await waitFor(bodyHas(`Daftar pengumuman gagal dimuat. ${BUSY}`), 10000),
  );
  listMode = "asli";

  section("Keterangan Untuk ikut berubah");
  await openList();
  await api("PUT", `/subject/${alfa.id}`, {
    subjectName: "Uji Daftar Alfa Baru",
  });
  check(
    "nama mata kuliah diganti di tab lain: kartu menyebut nama baru tanpa muat ulang",
    await waitFor(
      `(${cardOf("Uji Daftar Tujuan")})?.innerText.includes("Untuk: Mahasiswa Uji Daftar Alfa Baru")`,
      15000,
    ),
  );

  section("Pop-up Edit");
  check("Edit terbuka", await openEdit("Uji Daftar Satu"));
  await realClick(dialogLabel("Judul Pengumuman"));
  check(
    "klik tulisan Judul Pengumuman: kursor masuk ke kotak judul",
    await evaluate(`document.activeElement === ${DIALOG_TITLE}`),
  );
  await realClick(dialogLabel("Deskripsi Pengumuman"));
  check(
    "klik tulisan Deskripsi Pengumuman: kursor masuk ke kotak deskripsi",
    await evaluate(`document.activeElement === ${DIALOG_BODY}`),
  );
  const titleInfo = await evaluate(`(() => {
    const texts = [...document.querySelectorAll('[role="dialog"] p, [role="dialog"] label')].map((el) => el.innerText.trim());
    return { counter: texts.includes("15/150"), limit: texts.some((t) => t.startsWith("Judul Pengumuman") && t.includes("(maks: 150 karakter)")) };
  })()`);
  check(
    "judul punya penghitung 15/150 dan tulisan (maks: 150 karakter)",
    titleInfo.counter && titleInfo.limit,
    JSON.stringify(titleInfo),
  );
  const cancelLook = await buttonLook(dialogButton("Batal"));
  const panelPadding = await evaluate(
    `getComputedStyle(document.querySelector('[role="dialog"] .rounded-2xl')).paddingTop`,
  );
  check(
    "gaya pop-up seperti pop-up lain: Batal bergaris, jarak tepi 40px",
    cancelLook?.border === "2px" &&
      cancelLook.background === "rgba(0, 0, 0, 0)" &&
      panelPadding === "40px",
    JSON.stringify({ cancelLook, panelPadding }),
  );
  await typeInto(
    '[role="dialog"] input[maxlength="150"]',
    "Uji Daftar Satu Baru",
  );
  await latency(2500);
  const savedAt = Date.now();
  await clickText("Simpan Perubahan");
  await sleep(300);
  const lockedTitle = await evaluate(`!!${DIALOG_TITLE}?.matches(":disabled")`);
  await evaluate(`${DIALOG_TITLE}?.focus()`);
  await send("Input.insertText", { text: " LAGI" });
  const typedWhileSaving = await evaluate(`${DIALOG_TITLE}?.value`);
  check(
    "selama menyimpan, isian terkunci dan ketikan tidak masuk",
    lockedTitle && typedWhileSaving === "Uji Daftar Satu Baru",
    JSON.stringify({ lockedTitle, typedWhileSaving }),
  );
  const closed = await waitFor(`!${bodyHas("Edit Pengumuman")}`, 30000);
  const closedAfterMs = Date.now() - savedAt;
  await latency(0);
  const saved =
    closed &&
    (await waitFor(
      `!!document.querySelector('main [role="status"]')?.innerText.includes("Pengumuman berhasil diperbarui") && !!(${cardOf("Uji Daftar Satu Baru")})`,
      10000,
    ));
  check(
    "  tersimpan: pop-up tertutup, kotak hijau tampil, kartu menyebut judul baru",
    saved,
    saved
      ? ""
      : JSON.stringify({
          closed,
          closedAfterMs,
          page: await evaluate(`(() => ({
            dialogMessages: [...document.querySelectorAll('[role="dialog"] [role="alert"], [role="dialog"] [role="status"]')].map((el) => el.innerText),
            notices: [...document.querySelectorAll('main [role="status"], main [role="alert"]')].map((el) => el.innerText),
            titles: [...document.querySelectorAll("main p")].map((p) => p.innerText).filter((text) => text.startsWith("Uji Daftar Satu")),
          }))()`),
          stored: (
            await db.mst_announcement.findFirst({
              where: {
                author: data.laboran.id,
                title: { startsWith: "Uji Daftar Satu" },
              },
              select: { title: true },
            })
          )?.title,
        }),
  );

  await openList();
  await evaluate(`(() => {
    const card = ${cardOf("Uji Daftar Lama")};
    card.scrollIntoView({ block: "center" });
    return true;
  })()`);
  await sleep(500);
  await openEdit("Uji Daftar Lama");
  await typeInto(
    '[role="dialog"] input[maxlength="150"]',
    "Uji Daftar Lama Diubah",
  );
  await clickText("Simpan Perubahan");
  await waitFor(`!${bodyHas("Edit Pengumuman")}`, 15000);
  await sleep(1500);
  const noticeView = await evaluate(`(() => {
    const box = document.querySelector('main [role="status"]');
    if (!box) return null;
    const r = box.getBoundingClientRect();
    return { top: Math.round(r.top), bottom: Math.round(r.bottom), height: innerHeight };
  })()`);
  check(
    "  mengubah kartu paling bawah: kotak hijau tetap terlihat di layar",
    !!noticeView &&
      noticeView.top >= 0 &&
      noticeView.bottom <= noticeView.height,
    JSON.stringify(noticeView),
  );

  await openList();
  check("Edit terbuka lagi", await openEdit("Uji Daftar Dua"));
  await typeInto(
    '[role="dialog"] input[maxlength="150"]',
    "Ketikan yang belum disimpan",
  );
  const removedTwo = await api("DELETE", `/announcement/${two.id}`);
  const goneShown = await waitFor(`!!${DIALOG} && ${bodyHas(GONE)}`, 15000);
  const goneView = await evaluate(`({
    open: ${bodyHas("Edit Pengumuman")},
    title: ${DIALOG_TITLE}?.value,
    save: !!(${dialogButton("Simpan Perubahan")}),
    close: !!(${dialogButton("Tutup")}),
  })`);
  check(
    "dihapus laboran lain saat pop-up Edit terbuka: pop-up tetap terbuka dengan pesan, ketikan tetap ada, tanpa Simpan Perubahan",
    goneShown &&
      goneView.open &&
      goneView.title === "Ketikan yang belum disimpan" &&
      !goneView.save &&
      goneView.close,
    JSON.stringify({ removed: removedTwo.message, ...goneView }),
  );
  await realClick(dialogButton("Tutup"));
  check("  Tutup menutup pop-up", await waitFor(`!${DIALOG}`, 3000));

  section("Pop-up Hapus");
  check("Hapus terbuka", await openDelete("Uji Daftar Tiga"));
  const deleteView = await evaluate(`({
    title: document.querySelector('[role="dialog"] h2')?.innerText.trim(),
    text: ${DIALOG}?.innerText.includes("akan dihapus dan tidak tampil lagi di HP mahasiswa"),
  })`);
  const cancelDelete = await buttonLook(dialogButton("Batal"));
  const confirmDelete = await buttonLook(dialogButton("Ya, hapus"));
  check(
    "judul Hapus pengumuman?, teks menyebut HP mahasiswa, Batal bergaris, Ya, hapus merah",
    deleteView.title === "Hapus pengumuman?" &&
      deleteView.text &&
      cancelDelete?.border === "2px" &&
      confirmDelete?.background === RED,
    JSON.stringify({ deleteView, cancelDelete, confirmDelete }),
  );
  await realClick(dialogButton("Batal"));
  await waitFor(`!${DIALOG}`, 3000);
  check(
    "  Batal tidak menghapus",
    !!(await evaluate(`!!(${cardOf("Uji Daftar Tiga")})`)) &&
      (await db.mst_announcement.count({
        where: { title: "Uji Daftar Tiga", deletedAt: null },
      })) === 1,
  );
  await openDelete("Uji Daftar Tiga");
  await realClick(dialogButton("Ya, hapus"));
  check(
    "  Ya, hapus: kartu hilang dan kotak hijau tampil",
    await waitFor(
      `!(${cardOf("Uji Daftar Tiga")}) && !${DIALOG} && !!document.querySelector('main [role="status"]')?.innerText.includes("Pengumuman berhasil dihapus")`,
      10000,
    ),
  );
  await sleep(1200);
  check("Hapus terbuka lagi", await openDelete("Uji Daftar Empat"));
  await api("DELETE", `/announcement/${four.id}`);
  check(
    "dihapus laboran lain saat pop-up Hapus terbuka: pesan sudah dihapus, hanya tombol Tutup",
    await waitFor(
      `${bodyHas(GONE)} && !!(${dialogButton("Tutup")}) && !(${dialogButton("Ya, hapus")})`,
      15000,
    ),
  );
  await realClick(dialogButton("Tutup"));
  await waitFor(`!${DIALOG}`, 3000);

  section("Halaman detail");
  for (const [width, minShare] of [
    [1366, 0.6],
    [1024, 0.4],
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await browser.navigate(`/dashboard/pengumuman/${targeted.id}`);
    await waitFor(bodyHas("Tanggal / Waktu Posting"), 20000);
    await sleep(500);
    const layout = await evaluate(`(() => {
      const main = document.querySelector("main");
      const label = [...main.querySelectorAll("p")].find((p) => p.innerText.trim() === "Untuk");
      const value = label?.nextElementSibling;
      const box = label?.closest(".rounded-2xl") ?? main;
      const heading = [...main.querySelectorAll("p")].find((p) => p.innerText.trim() === "Detail Pengumuman");
      return {
        heading: !!heading && getComputedStyle(heading).fontSize === "32px",
        back: !!main.querySelector('a[href="${LIST}"]'),
        share: value ? Math.round((value.getBoundingClientRect().width / box.getBoundingClientRect().width) * 100) / 100 : 0,
        labelLines: [...main.querySelectorAll("p")].filter((p) => p.innerText.trim() === "Tanggal / Waktu Posting").map((p) => Math.round(p.getBoundingClientRect().height / parseFloat(getComputedStyle(p).lineHeight)))[0],
      };
    })()`);
    check(
      `${width} px: judul Detail Pengumuman, tombol Kembali, kolom isi keterangan selebar sisa kotak`,
      layout.heading &&
        layout.back &&
        layout.share >= minShare &&
        layout.labelLines === 1,
      JSON.stringify(layout),
    );
  }
  await send("Emulation.setDeviceMetricsOverride", {
    width: 1366,
    height: 768,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await browser.navigate(`/dashboard/pengumuman/${targeted.id}`);
  await waitFor(bodyHas("Tanggal / Waktu Posting"), 20000);
  await api("PUT", `/subject/${alfa.id}`, {
    subjectName: "Uji Daftar Alfa Lagi",
  });
  check(
    "nama mata kuliah diganti di tab lain: detail ikut menyebut nama baru",
    await waitFor(bodyHas("Mahasiswa Uji Daftar Alfa Lagi"), 15000),
  );
  await latency(2000);
  await browser.navigate(`/dashboard/pengumuman/${targeted.id}`, {
    waitForLoad: false,
  });
  await waitFor(
    `location.pathname.endsWith("${targeted.id}") && ${bodyHas("Loading...")} && ${STYLED}`,
    30000,
  );
  const detailLoading = await evaluate(loadingStyle);
  await latency(0);
  check(
    "detail: Loading... bergaya seperti halaman lain",
    detailLoading === LOADING_LOOK,
    detailLoading,
  );
  await waitFor(bodyHas("Tanggal / Waktu Posting"), 20000);
  await realClick(`document.querySelector('main a[href="${LIST}"]')`);
  check(
    "tombol Kembali membuka List Pengumuman",
    await waitFor(`location.pathname === "${LIST}"`, 10000),
  );

  await browser.navigate(`/dashboard/pengumuman/${five.id}`);
  await waitFor(bodyHas("Tanggal / Waktu Posting"), 20000);
  await sleep(1500);
  await api("DELETE", `/announcement/${five.id}`);
  await waitFor(bodyHas(GONE), 15000);
  const deletedView = await evaluate(`({
    path: location.pathname,
    message: ${bodyHas(GONE)},
    back: !!document.querySelector('main a[href="${LIST}"]'),
  })`);
  check(
    "dihapus saat detail terbuka: tetap di halaman itu dengan pesan dan tombol Kembali",
    deletedView.path === `/dashboard/pengumuman/${five.id}` &&
      deletedView.message &&
      deletedView.back,
    JSON.stringify(deletedView),
  );
  await browser.navigate(`/dashboard/pengumuman/${two.id}`);
  check(
    "membuka alamat pengumuman yang sudah dihapus: pesan sudah dihapus dan tombol Kembali",
    await waitFor(
      `${bodyHas(GONE)} && !!document.querySelector('main a[href="${LIST}"]')`,
      15000,
    ),
    await evaluate(`document.querySelector("main").innerText.slice(0, 120)`),
  );

  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
