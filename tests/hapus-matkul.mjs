import {
  bodyHas,
  check,
  db,
  openBrowser,
  runWebTest,
  section,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("61");
const EMPTY = "Uji Hapus Kosong";
const USED = "Uji Hapus Berkelas";

await runWebTest("Hapus mata kuliah", data, async (browser) => {
  const empty = await data.subject(EMPTY, { semester: "8" });
  const used = await data.subject(USED, { semester: "8" });
  await data.classOf(used, "A", "MONDAY", 1);

  const deletes = [];
  await browser.intercept((request) => {
    if (request.method === "DELETE" && request.url.includes("/subject/"))
      deletes.push(request.url);
  });

  const semester = `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes("Semester 8"))`;
  const card = (name) =>
    `[...document.querySelectorAll("button")].find((b) => b.innerText.includes(${JSON.stringify(name)}) && !b.getAttribute("aria-label"))`;
  const openPraktikum = async (page) => {
    await page.navigate("/dashboard/praktikum");
    await page.waitFor(`!!(${semester})`, 20000);
    if (
      (await page.evaluate(`(${semester}).getAttribute("aria-expanded")`)) ===
      "false"
    )
      await page.realClick(semester);
    return page.waitFor(`!!(${card(EMPTY)}) && !!(${card(USED)})`, 5000);
  };
  const openEdit = async (name) => {
    await browser.realClick(
      `document.querySelector('[aria-label="Ubah mata kuliah ${name}"]')`,
    );
    return browser.waitFor(bodyHas("Ubah Mata Kuliah"), 5000);
  };
  const dialogButton = (text) =>
    `[...document.querySelectorAll('[role="dialog"] button')].find((b) => b.innerText.trim() === ${JSON.stringify(text)})`;
  const press = (text) => browser.realClick(dialogButton(text));
  const exists = async (subject) =>
    (await db.mst_subject.count({ where: { id: subject.id } })) === 1;

  const lecturer = await openBrowser();
  try {
    section("Dosen hanya melihat");
    check("login dosen", await lecturer.login(data.lecturer, data.password));
    check("dosen melihat kedua mata kuliah uji", await openPraktikum(lecturer));
    check(
      "  tanpa tombol Ubah, jadi tanpa Hapus",
      !(await lecturer.evaluate(
        `!!document.querySelector('[aria-label^="Ubah mata kuliah Uji Hapus"]')`,
      )),
    );

    section("Mata kuliah yang belum pernah dipakai");
    check("login laboran", await browser.login(data.laboran, data.password));
    check("halaman Praktikum laboran", await openPraktikum(browser));
    check("dialog Ubah terbuka", await openEdit(EMPTY));
    const layout = await browser.evaluate(`(() => {
      const r = (b) => b.getBoundingClientRect();
      const remove = r(${dialogButton("Hapus Mata Kuliah")});
      const save = r(${dialogButton("Simpan")});
      const cancel = r(${dialogButton("Batal")});
      const panel = r(document.querySelector('[role="dialog"] form'));
      return {
        sameRow: Math.abs(remove.top - save.top) < 4,
        leftSide: remove.left - panel.left < 4,
        rightSide: panel.right - save.right < 4,
        gap: Math.round(cancel.left - remove.right),
      };
    })()`);
    check(
      "  tombol Hapus Mata Kuliah di kiri, Batal dan Simpan di kanan, tidak bertumpuk",
      layout.sameRow && layout.leftSide && layout.rightSide && layout.gap >= 16,
      JSON.stringify(layout),
    );
    await press("Hapus Mata Kuliah");
    check(
      "  konfirmasi tampil",
      await browser.waitFor(bodyHas(`Hapus mata kuliah ${EMPTY}?`), 5000),
    );
    await press("Batal");
    check(
      "  Batal kembali ke form ubah tanpa menghapus",
      (await browser.waitFor(
        `${bodyHas("Ubah Mata Kuliah")} && !${bodyHas(`Hapus mata kuliah ${EMPTY}?`)}`,
        5000,
      )) &&
        deletes.length === 0 &&
        (await exists(empty)),
      JSON.stringify(deletes),
    );
    await press("Hapus Mata Kuliah");
    await browser.waitFor(bodyHas(`Hapus mata kuliah ${EMPTY}?`), 5000);
    await press("Ya, hapus");
    check(
      "  Ya, hapus: dialog tertutup, pesan tampil di atas daftar",
      await browser.waitFor(
        `!document.querySelector('[role="dialog"]') && [...document.querySelectorAll('[role="status"]')].some((p) => p.innerText.includes("Mata kuliah ${EMPTY} berhasil dihapus"))`,
        8000,
      ),
    );
    check(
      "  kartu mata kuliah hilang, yang lain tetap",
      await browser.waitFor(`!(${card(EMPTY)}) && !!(${card(USED)})`, 5000),
    );
    check(
      "  satu permintaan DELETE untuk mata kuliah itu",
      deletes.length === 1 && deletes[0].endsWith(`/subject/${empty.id}`),
      JSON.stringify(deletes),
    );
    check("  terhapus dari database", !(await exists(empty)));
    check(
      "  halaman dosen ikut berubah tanpa dimuat ulang",
      await lecturer.waitFor(`!(${card(EMPTY)}) && !!(${card(USED)})`, 10000),
    );

    section("Mata kuliah yang sudah punya kelas");
    check("dialog Ubah terbuka", await openEdit(USED));
    await press("Hapus Mata Kuliah");
    await browser.waitFor(bodyHas(`Hapus mata kuliah ${USED}?`), 5000);
    await press("Ya, hapus");
    check(
      "  penolakan server tampil di konfirmasi",
      await browser.waitFor(
        bodyHas(`${USED} sudah punya 1 kelas, jadi tidak bisa dihapus.`),
        8000,
      ),
    );
    check(
      "  konfirmasi tetap terbuka, mata kuliah tetap ada",
      (await browser.evaluate(bodyHas(`Hapus mata kuliah ${USED}?`))) &&
        (await exists(used)),
    );
    await press("Batal");
    check(
      "  Batal kembali ke form ubah dan pesan penolakan hilang",
      await browser.waitFor(
        `${bodyHas("Ubah Mata Kuliah")} && !${bodyHas("jadi tidak bisa dihapus")}`,
        5000,
      ),
    );

    check(
      "halaman tanpa error JavaScript",
      browser.exceptions.length === 0 && lecturer.exceptions.length === 0,
      JSON.stringify([...browser.exceptions, ...lecturer.exceptions]),
    );
  } finally {
    await lecturer.close();
  }
});
