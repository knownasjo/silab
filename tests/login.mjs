import {
  bodyHas,
  call,
  check,
  json,
  runWebTest,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("52");
const SESSION_ENDED = "Sesi Anda berakhir, silakan masuk kembali.";

await runWebTest("Pesan di halaman login", data, async (browser) => {
  const { evaluate, waitFor } = browser;
  let mode = "pass";
  const used = new Set();
  let posts = 0;
  await browser.intercept((request) => {
    if (request.method !== "POST" || !request.url.endsWith("/auth/login"))
      return;
    posts++;
    used.add(mode);
    if (mode === "down") return { fail: "ConnectionRefused" };
    if (mode === "empty500") return json(500, {});
  });
  const tryLogin = async (password, done) => {
    for (let attempt = 0; attempt < 3; attempt++) {
      const before = posts;
      await browser.openLogin();
      await browser.fillLogin(data.laboran.nim, password);
      if (await waitFor(done, 10000)) return true;
      if (posts > before) return false;
    }
    return false;
  };

  mode = "down";
  check(
    "server tidak terjangkau: pesan bahasa Indonesia",
    await tryLogin(
      data.password,
      bodyHas("Tidak dapat terhubung ke server, coba lagi!"),
    ),
  );
  check(
    "  pesan Inggris lama tidak muncul",
    !(await evaluate(bodyHas("Network error"))),
  );

  mode = "empty500";
  check(
    "balasan error tanpa pesan: Terjadi kesalahan",
    await tryLogin(
      data.password,
      `[...document.querySelectorAll("h1,h2,h3,p,div")].some((el) => el.childElementCount === 0 && el.innerText.trim() === "Terjadi kesalahan")`,
    ),
  );
  check(
    "  pesan Inggris lama tidak muncul",
    !(await evaluate(bodyHas("An unknown error occurred"))),
  );

  mode = "pass";
  check(
    "password salah: pesan dari server tampil",
    await tryLogin("salahsalah", bodyHas("NIM/NIY atau password salah!")),
  );
  check(
    "login benar masuk ke dashboard",
    await tryLogin(data.password, `location.pathname.startsWith("/dashboard")`),
  );
  check(
    "ketiga kondisi benar-benar teruji",
    ["down", "empty500", "pass"].every((m) => used.has(m)),
    JSON.stringify([...used]),
  );

  const path = () => evaluate("location.pathname");
  const onLogin = async () => {
    const ok = await waitFor(
      `location.pathname === "/auth" && !!document.querySelector('input[placeholder="NIM / NIY"]')`,
      20000,
    );
    await sleep(1500);
    return ok && (await path()) === "/auth";
  };

  await browser.navigate("/");
  check(
    "halaman awal saat sudah masuk langsung ke Dashboard",
    await waitFor(`location.pathname === "/dashboard"`, 15000),
    await path(),
  );

  await browser.navigate("/dashboard");
  await waitFor(browser.visibleButton("Sign Out"), 15000);
  await browser.clickText("Sign Out");
  await waitFor(browser.visibleButton("Keluar"), 5000);
  await browser.clickText("Keluar");
  check("Sign Out biasa kembali ke login", await onLogin());
  check(
    "  tanpa pesan sesi berakhir",
    !(await evaluate(bodyHas(SESSION_ENDED))),
  );

  await browser.navigate("/");
  check(
    "halaman awal saat belum masuk langsung ke login",
    await onLogin(),
    await path(),
  );

  await browser.openLogin();
  check(
    "login dibuka biasa: tanpa pesan sesi berakhir",
    !(await evaluate(bodyHas(SESSION_ENDED))),
  );

  await evaluate(`(() => {
    window.__buttonStates = [];
    const button = document.querySelector('button[type="submit"]');
    new MutationObserver(() =>
      window.__buttonStates.push({
        path: location.pathname,
        disabled: button.disabled,
        text: button.innerText.trim(),
      }),
    ).observe(button, { attributes: true, childList: true, subtree: true });
    return true;
  })()`);
  await browser.fillLogin(data.laboran.nim, data.password);
  const entered = await waitFor(
    `location.pathname.startsWith("/dashboard")`,
    20000,
  );
  const states = await evaluate("window.__buttonStates ?? []");
  check(
    "setelah login berhasil tombol tetap loading sampai Dashboard terbuka",
    entered &&
      states.length > 0 &&
      states.every((state) => state.disabled && state.text !== "Log In"),
    JSON.stringify(states),
  );

  await browser.setCookie("accessToken", "token.rusak.sekali");
  await browser.navigate("/dashboard/praktikum");
  check("akun ditolak server: kembali ke login", await onLogin());
  check("  pesan sesi berakhir tampil", await evaluate(bodyHas(SESSION_ENDED)));

  await browser.openLogin();
  check(
    "  login dibuka lagi tanpa sebab: pesan tidak tampil",
    !(await evaluate(bodyHas(SESSION_ENDED))),
  );

  check(
    "login lagi untuk uji ganti password",
    await browser.login(data.laboran, data.password),
  );
  await browser.navigate("/dashboard");
  await waitFor(bodyHas(data.laboran.fullname), 15000);
  await sleep(1500);
  const other = await call("POST", "/auth/login", {
    body: { nim: data.laboran.nim, password: data.password },
  });
  const changed = await call("PUT", "/auth/me/password", {
    token: other.json.data?.accessToken,
    body: {
      oldPassword: data.password,
      password: "passwordbaru123",
      confirmPassword: "passwordbaru123",
    },
  });
  check(
    "  password diganti dari perangkat lain",
    changed.code === 200,
    `${changed.code} ${changed.message}`,
  );
  check(
    "password diganti di tempat lain: Dashboard kembali ke login",
    await onLogin(),
  );
  check("  pesan sesi berakhir tampil", await evaluate(bodyHas(SESSION_ENDED)));
});
