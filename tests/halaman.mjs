import {
  check,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("51");

await runWebTest(
  "Semua halaman laboran tampil tanpa error",
  data,
  async (browser) => {
    const { evaluate, waitFor, realClick } = browser;
    const subject = await data.subject("Uji Halaman");

    const visit = async (path, readyText) => {
      browser.resetErrors();
      await browser.navigate(path);
      const ready = await waitFor(
        `location.pathname === ${JSON.stringify(path)} && document.body.innerText.includes(${JSON.stringify(readyText)})`,
        20000,
      );
      await sleep(1500);
      return ready;
    };
    const noErrors = (label) =>
      check(
        `  ${label} tanpa error JavaScript`,
        browser.exceptions.length + browser.consoleErrors.length === 0,
        JSON.stringify([...browser.exceptions, ...browser.consoleErrors]),
      );
    const optionsOf = async (buttonExpression) => {
      for (let attempt = 0; attempt < 3; attempt++) {
        await realClick(buttonExpression);
        if (
          await waitFor(
            `document.querySelectorAll('[role="option"],[role="menuitem"]').length > 0`,
            2500,
          )
        )
          break;
      }
      return evaluate(
        `[...document.querySelectorAll('[role="option"],[role="menuitem"]')].map((o) => o.innerText.trim())`,
      );
    };
    const popup = (text) =>
      `[...document.querySelectorAll("button[aria-haspopup]")].find((b) => b.innerText.includes(${JSON.stringify(text)}) && b.getBoundingClientRect().width > 0)`;

    check("login laboran", await browser.login(data.laboran, data.password));

    section("Dashboard");
    check("dashboard tampil", await visit("/dashboard", "Dashboard"));
    noErrors("dashboard");

    section("Tambah mata kuliah");
    check(
      "halaman tampil",
      await visit("/dashboard/master-data/add-subject", "Dosen Pengampu"),
    );
    const lecturers = await optionsOf(popup("Dosen Pengampu"));
    check(
      "  pilihan dosen pengampu memuat dosen uji",
      lecturers.some((o) => o.includes(data.lecturer.fullname)),
      JSON.stringify(lecturers),
    );
    await browser.pressEscape();
    noErrors("tambah mata kuliah");

    section("Tambah praktikum");
    check(
      "halaman tampil",
      await visit("/dashboard/praktikum/tambah-praktikum", "Mata Kuliah"),
    );
    const subjects = await optionsOf(browser.visibleButton("Praktikum"));
    check(
      "  pilihan mata kuliah memuat mata kuliah uji",
      subjects.some((o) => o.includes(subject.subject_name)),
      JSON.stringify(subjects),
    );
    await realClick(
      `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.includes(${JSON.stringify(subject.subject_name)}))`,
    );
    check(
      "  form kelas muncul setelah mata kuliah dipilih",
      await waitFor(`!!(${browser.visibleButton("Hari")})`, 5000),
    );
    const days = await optionsOf(browser.visibleButton("Hari"));
    check(
      "  pilihan hari Senin sampai Jumat",
      ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"].every((day) =>
        days.some((o) => o.includes(day)),
      ),
      JSON.stringify(days),
    );
    await realClick(
      `[...document.querySelectorAll('[role="option"] button')].find((o) => o.innerText.includes("Senin"))`,
    );
    check(
      "  hari Senin terpilih",
      await waitFor(`!!(${browser.visibleButton("Senin")})`, 3000),
    );
    const rooms = await optionsOf(browser.visibleButton("Ruangan"));
    check("  pilihan ruangan terisi", rooms.length > 0, JSON.stringify(rooms));
    await browser.pressEscape();
    noErrors("tambah praktikum");

    section("Tambah pengumuman");
    check(
      "halaman tampil",
      await visit("/dashboard/pengumuman/add-pengumuman", "Pengumuman"),
    );
    const types = await optionsOf(
      `document.querySelector("button[aria-haspopup]")`,
    );
    check(
      "  pilihan jenis pengumuman ada 4",
      types.length === 4 &&
        ["Pengumuman", "Pendaftaran Praktikum", "Pendaftaran Inhal"].every(
          (t) => types.includes(t),
        ),
      JSON.stringify(types),
    );
    await browser.pressEscape();
    noErrors("tambah pengumuman");

    for (const [label, path, readyText] of [
      ["Jam sesi", "/dashboard/master-data/jam-sesi", "Sesi"],
      ["Periode akademik", "/dashboard/master-data/periode", "Periode aktif"],
      [
        "Pembayaran",
        "/dashboard/master-data/pembayaran",
        "Jumlah aktivasi mahasiswa",
      ],
      ["Praktikum", "/dashboard/praktikum", "Semester"],
      [
        "Daftar pengumuman",
        "/dashboard/pengumuman/list-pengumuman",
        "pengumuman",
      ],
      [
        "Rekap presensi tanpa kelas",
        "/dashboard/praktikum/recap-attendances",
        "Kelas tidak ditemukan.",
      ],
      ["Profil", "/dashboard/profil", "Data Akun"],
    ]) {
      section(label);
      check("halaman tampil", await visit(path, readyText));
      noErrors(label.toLowerCase());
    }
  },
);
