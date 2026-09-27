import {
  bodyHas,
  check,
  json,
  runWebTest,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("52");

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
});
