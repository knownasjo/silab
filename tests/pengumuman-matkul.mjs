import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("62");
const PAGE = "/dashboard/pengumuman/add-pengumuman";
const LIST = "/dashboard/pengumuman/list-pengumuman";
const X_NAME = "Uji Tujuan Algoritma";
const Y_NAME = "Uji Tujuan Basis Data";
const TITLE = 'input[placeholder="Judul pengumuman"]';
const BODY = 'textarea[placeholder="Deskripsi pengumuman"]';
const TYPE_BUTTON = `document.querySelector("button[aria-haspopup]")`;
const ALL = "Semua mahasiswa";
const SOME = "Mata kuliah tertentu";
const REGISTRATION_NOTE =
  "Semua mahasiswa. Pengumuman pendaftaran selalu untuk semua mahasiswa.";

await runWebTest(
  "Pengumuman untuk mata kuliah tertentu",
  data,
  async (browser) => {
    const { evaluate, waitFor, realClick, clickText, typeInto } = browser;
    const X = await data.subject(X_NAME, { semester: "8" });
    const Y = await data.subject(Y_NAME, { semester: "8" });
    const periodName = `${data.period.year} ${data.period.term === "GANJIL" ? "Ganjil" : "Genap"}`;

    const writes = [];
    await browser.intercept((request) => {
      if (
        ["POST", "PUT"].includes(request.method) &&
        request.url.includes("/announcement")
      )
        writes.push({
          method: request.method,
          body: JSON.parse(request.postData ?? "{}"),
        });
    });

    const radio = (label) =>
      `[...document.querySelectorAll('input[type="radio"]')].find((input) => input.closest("label")?.innerText.trim() === ${JSON.stringify(label)})`;
    const checkbox = (name) =>
      `[...document.querySelectorAll('[aria-label="Mata kuliah tujuan"] input[type="checkbox"]')].find((input) => input.closest("label")?.innerText.startsWith(${JSON.stringify(name)}))`;
    const checked = (selector) => evaluate(`!!(${selector})?.checked`);
    const hasChecklist = () =>
      evaluate(`!!document.querySelector('[aria-label="Mata kuliah tujuan"]')`);
    const pickType = async (title) => {
      await realClick(TYPE_BUTTON);
      const item = `[...document.querySelectorAll('[role="menuitem"]')].find((i) => i.innerText.trim() === ${JSON.stringify(title)})`;
      await waitFor(`!!(${item})`, 3000);
      await realClick(item);
      await sleep(300);
    };
    const save = async () => {
      await clickText("Simpan");
      const shown = await waitFor(
        bodyHas("Pengumuman berhasil diterbitkan"),
        8000,
      );
      await clickText("Tutup");
      await waitFor(`!${bodyHas("Pengumuman berhasil diterbitkan")}`, 3000);
      await sleep(300);
      return shown;
    };

    check("login laboran", await browser.login(data.laboran, data.password));
    await browser.navigate(PAGE);
    check(
      "halaman Buat Pengumuman menampilkan pilihan Untuk",
      await waitFor(`!!(${radio(ALL)}) && !!(${radio(SOME)})`, 20000),
    );
    check(
      "  awalnya Semua mahasiswa, tanpa daftar mata kuliah",
      (await checked(radio(ALL))) && !(await hasChecklist()),
    );

    section("Jenis pendaftaran");
    await pickType("Pendaftaran Praktikum");
    check(
      "Pendaftaran Praktikum: pilihan Untuk diganti keterangan untuk semua",
      (await evaluate(bodyHas(REGISTRATION_NOTE))) &&
        !(await evaluate(`!!(${radio(SOME)})`)),
    );
    await pickType("Pengumuman");

    section("Untuk mata kuliah tertentu");
    await realClick(`(${radio(SOME)}).closest("label")`);
    check(
      "memilih mata kuliah tertentu memunculkan daftar mata kuliah",
      await waitFor(`!!(${checkbox(X_NAME)}) && !!(${checkbox(Y_NAME)})`, 5000),
    );
    const xLine = await evaluate(
      `(${checkbox(X_NAME)}).closest("label").innerText`,
    );
    check(
      "  kode dan semester tampil di tiap mata kuliah",
      xLine.includes(X.subject_code) && xLine.includes("Semester 8"),
      xLine,
    );
    await typeInto(TITLE, "Uji Tujuan Hanya Algoritma");
    await typeInto(BODY, "Praktikum Algoritma minggu ini libur.");
    await clickText("Simpan");
    check(
      "  Simpan tanpa mencentang mata kuliah: ditolak tanpa mengirim",
      (await waitFor(
        bodyHas("Pilih minimal satu mata kuliah tujuan."),
        3000,
      )) && writes.length === 0,
      JSON.stringify(writes),
    );
    await realClick(`(${checkbox(X_NAME)}).closest("label")`);
    await waitFor(
      `getComputedStyle((${checkbox(X_NAME)}).nextElementSibling).backgroundColor === "rgb(50, 114, 202)"`,
      2000,
    );
    const look = await evaluate(`(() => {
    const input = ${checkbox(X_NAME)};
    const picked = ${radio(SOME)};
    const all = (${radio(ALL)}).closest("label").getBoundingClientRect();
    const some = picked.closest("label").getBoundingClientRect();
    const option = getComputedStyle(picked.closest("label"));
    return {
      hidden: input.getBoundingClientRect().width <= 1 && picked.getBoundingClientRect().width <= 1,
      box: getComputedStyle(input.nextElementSibling).backgroundColor,
      ring: getComputedStyle(picked.nextElementSibling).borderColor,
      text: option.color,
      outline: option.borderTopWidth,
      stacked: some.top >= all.bottom && Math.abs(some.left - all.left) < 2,
    };
  })()`);
    const BLUE = "rgb(50, 114, 202)";
    check(
      "  kotak centang dan pilihan bergaya tema (input asli tersembunyi, biru #3272CA, pilihan tanpa garis luar)",
      look.hidden &&
        look.box === BLUE &&
        look.ring === BLUE &&
        look.text === BLUE &&
        look.outline === "0px",
      JSON.stringify(look),
    );
    check(
      "  Semua mahasiswa dan Mata kuliah tertentu tersusun atas-bawah",
      look.stacked,
      JSON.stringify(look),
    );
    check("  centang Algoritma lalu Simpan: berhasil", await save());
    check(
      "  terkirim dengan subjectIds Algoritma saja",
      writes.length === 1 &&
        JSON.stringify(writes[0].body.subjectIds) === JSON.stringify([X.id]),
      JSON.stringify(writes),
    );
    check(
      "  form kembali ke Semua mahasiswa",
      (await checked(radio(ALL))) && !(await hasChecklist()),
    );

    await realClick(`(${radio(SOME)}).closest("label")`);
    await waitFor(`!!(${checkbox(Y_NAME)})`, 5000);
    await realClick(`(${checkbox(Y_NAME)}).closest("label")`);
    await pickType("Pendaftaran Praktikum");
    await typeInto(TITLE, "Uji Tujuan Pendaftaran");
    await typeInto(BODY, "Pendaftaran praktikum dibuka.");
    await save();
    check(
      "pendaftaran setelah sempat memilih mata kuliah: tetap terkirim untuk semua",
      writes.length === 2 &&
        writes[1].body.type === "PRACTICUM" &&
        JSON.stringify(writes[1].body.subjectIds) === "[]",
      JSON.stringify(writes[1]),
    );
    const saved = await db.mst_announcement.findFirst({
      where: { title: "Uji Tujuan Hanya Algoritma" },
      include: { subjects: true },
    });
    check(
      "  tersimpan di server untuk Algoritma di semester aktif",
      saved?.for_all === false &&
        saved.periodId === data.period.id &&
        saved.subjects.map((s) => s.subjectId).join() === X.id,
    );

    section("Daftar dan detail");
    const cardOf = (title) =>
      `[...document.querySelectorAll("p")].find((p) => p.innerText === ${JSON.stringify(title)})?.closest(".space-x-3")`;
    const cardText = (title) => evaluate(`(${cardOf(title)})?.innerText ?? ""`);
    await browser.navigate(LIST);
    await waitFor(`!!(${cardOf("Uji Tujuan Hanya Algoritma")})`, 20000);
    check(
      "kartu pengumuman mata kuliah menyebut mata kuliah dan semesternya",
      (await cardText("Uji Tujuan Hanya Algoritma")).includes(
        `Untuk: Mahasiswa ${X_NAME} (${periodName})`,
      ),
      await cardText("Uji Tujuan Hanya Algoritma"),
    );
    check(
      "kartu pengumuman pendaftaran: Untuk Semua mahasiswa",
      (await cardText("Uji Tujuan Pendaftaran")).includes(`Untuk: ${ALL}`),
      await cardText("Uji Tujuan Pendaftaran"),
    );

    const openEdit = async (title) => {
      await realClick(`(${cardOf(title)}).querySelector("button")`);
      await waitFor(`!!document.querySelector('[role="menuitem"]')`, 3000);
      await clickText("Edit");
      return waitFor(bodyHas("Edit Pengumuman"), 5000);
    };
    const saveEdit = async () => {
      await clickText("Simpan Perubahan");
      await sleep(300);
    };

    check("Edit terbuka", await openEdit("Uji Tujuan Hanya Algoritma"));
    check(
      "  tujuan tersimpan terisi: mata kuliah tertentu, Algoritma tercentang",
      await waitFor(
        `!!(${radio(SOME)})?.checked && !!(${checkbox(X_NAME)})?.checked && !(${checkbox(Y_NAME)})?.checked`,
        5000,
      ),
    );
    await saveEdit();
    check(
      "  simpan tanpa perubahan: pesan tanpa mengirim",
      (await waitFor(
        bodyHas("Tidak ada perubahan yang perlu disimpan."),
        3000,
      )) && writes.length === 2,
      JSON.stringify(writes.slice(2)),
    );
    await realClick(`(${checkbox(X_NAME)}).closest("label")`);
    await saveEdit();
    check(
      "  semua centang dilepas: ditolak tanpa mengirim",
      (await waitFor(
        bodyHas("Pilih minimal satu mata kuliah tujuan."),
        3000,
      )) && writes.length === 2,
    );
    await realClick(`(${checkbox(Y_NAME)}).closest("label")`);
    await saveEdit();
    check(
      "  ganti ke Basis Data: terkirim dan dialog tertutup",
      (await waitFor(`!${bodyHas("Edit Pengumuman")}`, 8000)) &&
        writes.length === 3 &&
        writes[2].method === "PUT" &&
        JSON.stringify(writes[2].body.subjectIds) === JSON.stringify([Y.id]),
      JSON.stringify(writes[2]),
    );
    check(
      "  kartu langsung menyebut Basis Data",
      await waitFor(
        `(${cardOf("Uji Tujuan Hanya Algoritma")})?.innerText.includes("Untuk: Mahasiswa ${Y_NAME}")`,
        8000,
      ),
      await cardText("Uji Tujuan Hanya Algoritma"),
    );

    await openEdit("Uji Tujuan Hanya Algoritma");
    await waitFor(`!!(${radio(ALL)})`, 5000);
    await realClick(`(${radio(ALL)}).closest("label")`);
    await saveEdit();
    check(
      "  diubah ke Semua mahasiswa: terkirim dengan daftar kosong",
      (await waitFor(`!${bodyHas("Edit Pengumuman")}`, 8000)) &&
        writes.length === 4 &&
        JSON.stringify(writes[3].body.subjectIds) === "[]",
      JSON.stringify(writes[3]),
    );
    check(
      "  kartu menyebut Semua mahasiswa",
      await waitFor(
        `(${cardOf("Uji Tujuan Hanya Algoritma")})?.innerText.includes("Untuk: ${ALL}")`,
        8000,
      ),
    );

    const targeted = await db.mst_announcement.create({
      data: {
        type: "BASIC",
        title: "Uji Tujuan Detail",
        body: "Untuk dua mata kuliah.",
        author: data.laboran.id,
        for_all: false,
        periodId: data.period.id,
        subjects: { create: [{ subjectId: X.id }, { subjectId: Y.id }] },
      },
    });
    await browser.navigate(`/dashboard/pengumuman/${targeted.id}`);
    await waitFor(bodyHas("Uji Tujuan Detail"), 20000);
    check(
      "detail menampilkan baris Untuk dengan kedua mata kuliah",
      await evaluate(bodyHas(`Mahasiswa ${X_NAME}, ${Y_NAME} (${periodName})`)),
      await evaluate(`document.querySelector("main").innerText`),
    );

    check(
      "halaman tanpa error JavaScript",
      browser.exceptions.length === 0,
      JSON.stringify(browser.exceptions),
    );
  },
);
