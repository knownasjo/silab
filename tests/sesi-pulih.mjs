import {
  bodyHas,
  check,
  jwt,
  runWebTest,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("53");
const PAYMENT = "/dashboard/master-data/pembayaran";
const NOTICE = "Data akun gagal dimuat";

await runWebTest(
  "Sesi login kedaluwarsa, server mati, lalu pulih",
  data,
  async (browser) => {
    const { evaluate, waitFor } = browser;
    const name = data.laboran.fullname;
    const nameShown = `document.body.innerText.includes(${JSON.stringify(name)})`;
    let serverDown = false;
    await browser.intercept((request) => {
      if (serverDown && request.method !== "OPTIONS")
        return { fail: "ConnectionRefused" };
    });
    const path = () => evaluate("location.pathname");

    check("login laboran", await browser.login(data.laboran, data.password));

    const { iat, exp, ...claims } = jwt.decode(
      (await browser.cookie("accessToken")).value,
    );
    const now = Math.floor(Date.now() / 1000);
    const expired = jwt.sign(
      { ...claims, iat: now - 3600, exp: now - 60 },
      process.env.JWT_SECRET,
    );
    await browser.setCookie("accessToken", expired);
    await browser.navigate(PAYMENT);
    const loaded = await waitFor(
      `${bodyHas("Jumlah aktivasi mahasiswa")} && !${bodyHas(NOTICE)} && ${nameShown}`,
      20000,
    );
    const renewed = (await browser.cookie("accessToken"))?.value;
    check(
      "token kedaluwarsa: diperbarui otomatis, halaman tetap terbuka",
      loaded && !!renewed && renewed !== expired,
      `termuat: ${loaded}, token baru: ${!!renewed && renewed !== expired}`,
    );
    check("  tetap di halaman pembayaran", (await path()) === PAYMENT);

    serverDown = true;
    await browser.navigate(PAYMENT);
    check(
      "server mati: pemberitahuan data akun muncul",
      await waitFor(bodyHas(NOTICE), 15000),
    );
    check(
      "  tetap di halaman pembayaran, tidak terlempar ke login",
      (await path()) === PAYMENT,
    );
    check(
      "  halaman menampilkan pesan tidak dapat terhubung",
      await evaluate(bodyHas("Tidak dapat terhubung ke server")),
    );
    check(
      "  kartu jumlah menampilkan tanda strip, bukan 0",
      await evaluate(
        `[...document.querySelectorAll("h1")].some((h) => h.innerText.trim() === "–")`,
      ),
    );

    serverDown = false;
    check(
      "server hidup lagi: halaman pulih sendiri tanpa dimuat ulang",
      await waitFor(
        `!${bodyHas(NOTICE)} && !${bodyHas("Tidak dapat terhubung ke server")} && ${nameShown}`,
        45000,
      ),
    );
    check(
      "  angka pembayaran kembali tampil",
      await evaluate(
        `[...document.querySelectorAll("h1")].every((h) => h.innerText.trim() !== "–")`,
      ),
    );

    serverDown = true;
    await browser.navigate("/dashboard/profil");
    await waitFor(bodyHas(NOTICE), 15000);
    serverDown = false;
    await browser.clickText("Coba lagi");
    check(
      "tombol Coba lagi memuat ulang data akun",
      await waitFor(
        `${bodyHas(data.laboran.nim)} && !${bodyHas(NOTICE)}`,
        15000,
      ),
    );

    await browser.setCookie("accessToken", "token.rusak.sekali");
    await browser.navigate("/dashboard/praktikum");
    const onLogin = await waitFor(`location.pathname === "/auth"`, 20000);
    await sleep(2000);
    check("token rusak: diarahkan ke halaman login", onLogin);
    check(
      "  tetap di halaman login, tidak memantul ke dashboard",
      (await path()) === "/auth",
    );
    check(
      "  cookie sesi dihapus",
      !(await browser.cookie("accessToken")) &&
        !(await browser.cookie("refreshToken")),
    );
  },
);
