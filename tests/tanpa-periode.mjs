import {
  bodyHas,
  check,
  json,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("74");
const NOTICE = "Belum ada periode akademik";
const FOR_LABORAN =
  "Belum ada periode akademik. Mulai periode pertama dulu sebelum mengisi jam sesi, kelas, dan pendaftaran.";
const FOR_DOSEN =
  "Belum ada periode akademik. Data praktikum muncul setelah laboran memulai semester.";
const BUTTON = `[...document.querySelectorAll('a[href="/dashboard/master-data/periode"]')].find((a) => a.innerText.trim() === "Buka Periode Akademik")`;
const PAGES = [
  ["Dashboard", "/dashboard"],
  ["Praktikum", "/dashboard/praktikum"],
  ["Tambah Praktikum", "/dashboard/praktikum/tambah-praktikum"],
  ["Jam Sesi", "/dashboard/master-data/jam-sesi"],
  ["Pembayaran", "/dashboard/master-data/pembayaran"],
];

await runWebTest("Petunjuk saat belum ada periode", data, async (browser) => {
  const { evaluate, waitFor, realClick } = browser;
  let mode = "kosong";
  await browser.intercept((request) => {
    if (request.method !== "GET" || new URL(request.url).pathname !== "/period")
      return;
    if (mode === "kosong")
      return json(200, { status: true, message: "Berhasil", data: [] });
    if (mode === "gagal")
      return json(503, {
        status: false,
        message: "Server sedang sibuk, silakan coba lagi sebentar lagi.",
      });
  });
  const switchUser = async (user) => {
    await browser.navigate("/auth");
    await evaluate(`localStorage.clear(); sessionStorage.clear(); true`);
    await browser.send("Network.clearBrowserCookies");
    return browser.login(user, data.password);
  };

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Laboran, belum ada periode");
  for (const [name, path] of PAGES) {
    await browser.navigate(path);
    check(
      `${name}: petunjuk dan tombol Buka Periode Akademik tampil`,
      await waitFor(`${bodyHas(FOR_LABORAN)} && !!(${BUTTON})`, 20000),
    );
  }
  await realClick(BUTTON);
  check(
    "tombol membuka Periode Akademik dengan Mulai Periode Pertama",
    await waitFor(
      `location.pathname === "/dashboard/master-data/periode" && ${bodyHas("Mulai Periode Pertama")}`,
      20000,
    ),
  );
  check(
    "  halaman Periode Akademik sendiri tanpa petunjuk",
    !(await evaluate(bodyHas(NOTICE))),
  );

  section("Periode ada atau gagal dimuat");
  mode = "asli";
  for (const [name, path] of PAGES) {
    await browser.navigate(path);
    await sleep(2500);
    check(
      `${name}: tanpa petunjuk saat periode ada`,
      !(await evaluate(bodyHas(NOTICE))),
    );
  }
  mode = "gagal";
  await browser.navigate("/dashboard/master-data/jam-sesi");
  await sleep(3000);
  check(
    "daftar periode gagal dimuat: petunjuk tidak ditampilkan",
    !(await evaluate(bodyHas(NOTICE))),
  );

  section("Dosen, belum ada periode");
  mode = "kosong";
  check("login dosen", await switchUser(data.lecturer));
  for (const [name, path] of PAGES.slice(0, 2)) {
    await browser.navigate(path);
    check(
      `${name}: petunjuk untuk dosen tanpa tombol`,
      (await waitFor(bodyHas(FOR_DOSEN), 20000)) &&
        !(await evaluate(`!!(${BUTTON})`)),
    );
  }
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
