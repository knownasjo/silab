import {
  bodyHas,
  check,
  runWebTest,
  section,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("63");
const NO_SPACE = "Password baru tidak boleh mengandung spasi.";
const SPACED = [
  ["spasi di tengah", "rahasia 123"],
  ["spasi di awal", " rahasia123"],
  ["spasi di akhir", "rahasia123 "],
];

await runWebTest("Ganti password tanpa spasi", data, async (browser) => {
  const changes = [];
  await browser.intercept((request) => {
    if (request.method === "PUT" && request.url.includes("/auth/me/password"))
      changes.push(request.url);
  });

  const feedback = () =>
    browser.evaluate(
      `[...document.querySelectorAll("section")].find((s) => s.innerText.includes("Ganti Password"))?.querySelector('[role="status"], [role="alert"]')?.innerText ?? ""`,
    );
  const fill = async (password) => {
    await browser.typeInto("#old-password", data.password);
    await browser.typeInto("#new-password", password);
    await browser.typeInto("#confirm-password", password);
  };

  check("login laboran", await browser.login(data.laboran, data.password));
  await browser.navigate("/dashboard/profil");
  check(
    "halaman Profil terbuka",
    await browser.waitFor(bodyHas("Ganti Password"), 20000),
  );

  section("Password baru berspasi");
  for (const [label, password] of SPACED) {
    await browser.navigate("/dashboard/profil");
    await browser.waitFor(bodyHas("Ganti Password"), 20000);
    await fill(password);
    check(
      `  ${label}: isian terketik apa adanya`,
      (await browser.evaluate(
        `document.querySelector("#new-password").value`,
      )) === password,
    );
    await browser.clickText("Simpan Password");
    check(
      `${label}: pesan tampil dan tidak dikirim ke server`,
      (await browser.waitFor(bodyHas(NO_SPACE), 5000)) && changes.length === 0,
      `${await feedback()} ${JSON.stringify(changes)}`,
    );
  }

  section("Password baru tanpa spasi");
  await browser.navigate("/dashboard/profil");
  await browser.waitFor(bodyHas("Ganti Password"), 20000);
  await fill("rahasiaBaru123");
  await browser.clickText("Simpan Password");
  check(
    "tetap bisa disimpan",
    (await browser.waitFor(bodyHas("Password berhasil diganti"), 10000)) &&
      changes.length === 1,
    `${await feedback()} ${JSON.stringify(changes)}`,
  );
});
