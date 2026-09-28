import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("55");
const HINT = "Kosongkan bila mahasiswa memilih kelas sendiri di aplikasi.";
const EMPTY_OPTION = "Kosongkan (mahasiswa memilih sendiri)";
const NO_CHANGE = "Tidak ada perubahan yang perlu disimpan.";
const WARNING =
  "Mahasiswa akan dikeluarkan dari kelas A bila belum punya presensi.";

await runWebTest("Halaman Pembayaran", data, async (browser) => {
  const { evaluate, waitFor, realClick, clickText } = browser;
  const alpro = await data.subject("Uji Bayar Alpro");
  const rpl = await data.subject("Uji Bayar RPL");
  const imk = await data.subject("Uji Bayar IMK");
  const alproA = await data.classOf(alpro, "A", "MONDAY", 1);
  await data.classOf(alpro, "B", "MONDAY", 2);
  await data.classOf(rpl, "A", "TUESDAY", 1);
  const one = await data.student("Uji Bayar Satu");
  const two = await data.student("Uji Batal Satu");
  const three = await data.student("Uji Batal Dua");
  await data.activate(one, alpro, true);
  await data.enroll(one, alproA);
  const oneRpl = await data.activate(one, rpl, true);
  const oneImk = await data.activate(one, imk, false);
  for (const student of [two, three]) {
    await data.activate(student, alpro, true);
    await data.enroll(student, alproA);
  }
  const meeting = await data.meeting(alproA, "Pertemuan 1");
  await data.attend(meeting, three, true);

  const writes = [];
  await browser.intercept((request) => {
    if (
      ["POST", "PUT"].includes(request.method) &&
      request.url.includes("/activation/")
    )
      writes.push({
        url: request.url,
        body: JSON.parse(request.postData ?? "{}"),
      });
  });
  const classButton = `[...document.querySelectorAll('[role="dialog"] button[aria-haspopup="listbox"]')].find((b) => b.getBoundingClientRect().width > 0)`;
  const openStudent = async (name) => {
    await realClick(
      `document.querySelector('[aria-label="Lihat pembayaran ${name}"]')`,
    );
    return waitFor(bodyHas("Status Pembayaran Mahasiswa"), 5000);
  };
  const openEdit = async (subject) => {
    await realClick(`document.querySelector('[aria-label="Ubah ${subject}"]')`);
    return waitFor(bodyHas("Ubah Data Aktivasi Mahasiswa"), 5000);
  };
  const backToList = async () => {
    await clickText("Kembali");
    await waitFor(bodyHas("Status Pembayaran Mahasiswa"), 5000);
  };
  const closeStudent = async () => {
    await clickText("Tutup");
    await waitFor(`!${bodyHas("Status Pembayaran Mahasiswa")}`, 5000);
  };
  const classOptions = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      await realClick(classButton);
      if (
        await waitFor(
          `document.querySelectorAll('[role="option"]').length > 0 || ${bodyHas("Belum ada kelas untuk mata kuliah ini.")}`,
          2500,
        )
      )
        break;
    }
    return evaluate(
      `[...document.querySelectorAll('[role="option"]')].map((o) => o.innerText.trim())`,
    );
  };
  const pickOption = (startsWith) =>
    realClick(
      `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.trim().startsWith(${JSON.stringify(startsWith)}))`,
    );
  const classLabel = () => evaluate(`(${classButton})?.innerText.trim()`);
  const toggle = async (want) => {
    await evaluate(`document.querySelector('[role="switch"]').click()`);
    return waitFor(
      `document.querySelector('[role="switch"]').getAttribute("aria-checked") === "${want}"`,
      2000,
    );
  };
  const saveExpecting = async (text) => {
    await clickText("Simpan Perubahan");
    const shown = await waitFor(bodyHas(text), 8000);
    await sleep(500);
    return shown;
  };
  const row = (subject) =>
    `[...document.querySelectorAll("div")].find((d) => d.childElementCount >= 3 && d.innerText.startsWith(${JSON.stringify(subject)}))`;
  const rowHas = (subject, ...texts) =>
    waitFor(
      `(() => { const lines = ((${row(subject)})?.innerText ?? "").split("\\n").map((x) => x.trim()); return ${JSON.stringify(texts)}.every((t) => lines.includes(t)); })()`,
      5000,
    );
  const statusOf = async (activation) =>
    (await db.trn_activations.findUnique({ where: { id: activation.id } }))
      .status;

  check("login laboran", await browser.login(data.laboran, data.password));
  await browser.navigate("/dashboard/master-data/pembayaran");
  check(
    "daftar pembayaran menampilkan mahasiswa uji",
    await waitFor(
      `!!document.querySelector('[aria-label="Lihat pembayaran Uji Bayar Satu"]')`,
      20000,
    ),
  );
  check("dialog Uji Bayar Satu terbuka", await openStudent("Uji Bayar Satu"));

  section("Sudah bayar dan sudah punya kelas");
  check("form ubah terbuka", await openEdit("Uji Bayar Alpro"));
  check("  petunjuk kosongkan tidak tampil", !(await evaluate(bodyHas(HINT))));
  const alproOptions = await classOptions();
  check(
    "  pilihan kelas ada, tanpa pilihan kosongkan",
    alproOptions.length > 0 && !alproOptions.includes(EMPTY_OPTION),
    JSON.stringify(alproOptions),
  );
  await browser.pressEscape();
  check(
    "  simpan tanpa perubahan: pesan tidak ada perubahan",
    await saveExpecting(NO_CHANGE),
  );
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );
  await backToList();

  section("Sudah bayar, belum punya kelas");
  check("form ubah terbuka", await openEdit("Uji Bayar RPL"));
  check("  petunjuk kosongkan tampil", await evaluate(bodyHas(HINT)));
  const rplOptions = await classOptions();
  check(
    "  pilihan diawali kosongkan, lalu kelas A",
    rplOptions[0] === EMPTY_OPTION &&
      rplOptions.some((o) => o.startsWith("Kelas A")),
    JSON.stringify(rplOptions),
  );
  await pickOption("Kelas A");
  check(
    "  kelas A terpilih",
    await waitFor(
      `(${classButton}).innerText.trim().startsWith("Kelas A")`,
      3000,
    ),
  );
  await classOptions();
  await pickOption(EMPTY_OPTION);
  check(
    "  setelah kosongkan kembali ke Pilih Kelas",
    await waitFor(`(${classButton}).innerText.trim() === "Pilih Kelas"`, 3000),
    await classLabel(),
  );
  check(
    "  simpan tanpa perubahan: pesan tidak ada perubahan",
    await saveExpecting(NO_CHANGE),
  );
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );
  await backToList();

  section("Belum bayar, mata kuliah belum punya kelas");
  check("form ubah terbuka", await openEdit("Uji Bayar IMK"));
  check("  petunjuk kosongkan tampil", await evaluate(bodyHas(HINT)));
  const imkOptions = await classOptions();
  check(
    "  daftar kelas kosong dengan keterangan",
    imkOptions.length === 0 &&
      (await evaluate(bodyHas("Belum ada kelas untuk mata kuliah ini."))),
    JSON.stringify(imkOptions),
  );
  await browser.pressEscape();
  check(
    "  simpan tanpa perubahan: pesan tidak ada perubahan",
    await saveExpecting(NO_CHANGE),
  );
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );
  check("  geser ke Sudah Bayar", await toggle("true"));
  check(
    "  konfirmasi tanpa kelas berhasil",
    await saveExpecting(
      "Pembayaran dikonfirmasi. Mahasiswa memilih kelas sendiri di aplikasi.",
    ),
  );
  check(
    "  satu permintaan dikirim, tanpa kelas",
    writes.length === 1 &&
      writes[0].url.endsWith(oneImk.id) &&
      JSON.stringify(writes[0].body) === '{"status":true}',
    JSON.stringify(writes),
  );
  check(
    "  baris IMK kini Sudah Bayar",
    await rowHas("Uji Bayar IMK", "Sudah Bayar"),
  );
  check("  tersimpan di database", (await statusOf(oneImk)) === true);
  writes.length = 0;

  section("Sudah bayar tanpa kelas diubah ke belum bayar");
  check("form ubah terbuka", await openEdit("Uji Bayar RPL"));
  check("  geser ke Belum Bayar", await toggle("false"));
  check(
    "  berhasil",
    await saveExpecting("Status pembayaran diubah menjadi belum bayar"),
  );
  check(
    "  satu permintaan dikirim, tanpa kelas",
    writes.length === 1 &&
      writes[0].url.endsWith(oneRpl.id) &&
      JSON.stringify(writes[0].body) === '{"status":false}',
    JSON.stringify(writes),
  );
  check("  tersimpan di database", (await statusOf(oneRpl)) === false);
  writes.length = 0;
  await closeStudent();

  section("Batal bayar mahasiswa yang sudah punya kelas");
  check("dialog Uji Batal Satu terbuka", await openStudent("Uji Batal Satu"));
  check("form ubah terbuka", await openEdit("Uji Bayar Alpro"));
  check(
    "  status awal Sudah Bayar, peringatan belum tampil",
    (await evaluate(
      `document.querySelector('[role="switch"]').getAttribute("aria-checked")`,
    )) === "true" && !(await evaluate(bodyHas(WARNING))),
  );
  check("  geser ke Belum Bayar", await toggle("false"));
  check(
    "  peringatan dikeluarkan dari kelas tampil",
    await waitFor(bodyHas(WARNING), 2000),
  );
  await classOptions();
  await pickOption("Kelas B");
  await waitFor(
    `(${classButton}).innerText.trim().startsWith("Kelas B")`,
    3000,
  );
  check(
    "  pindah kelas sambil Belum Bayar ditolak di browser",
    await saveExpecting("Geser tombol ke Sudah Bayar untuk memilih kelas."),
  );
  check(
    "  tidak ada permintaan ke server",
    writes.length === 0,
    JSON.stringify(writes),
  );
  await backToList();
  check("form ubah dibuka lagi", await openEdit("Uji Bayar Alpro"));
  await toggle("false");
  check(
    "  batal bayar: pesan dikeluarkan dari kelas A",
    await saveExpecting(
      "Status pembayaran diubah menjadi belum bayar dan mahasiswa dikeluarkan dari kelas A",
    ),
  );
  check(
    "  satu permintaan dikirim, tanpa kelas",
    writes.length === 1 &&
      JSON.stringify(writes[0].body) === '{"status":false}',
    JSON.stringify(writes),
  );
  check(
    "  baris kini tanpa kelas dan Belum Bayar",
    await rowHas("Uji Bayar Alpro", "Belum Bayar", "-"),
  );
  check(
    "  benar-benar keluar dari kelas A",
    (await db.trn_class_participants.count({
      where: { userId: two.id, classId: alproA.id },
    })) === 0,
  );
  writes.length = 0;
  await closeStudent();

  section("Batal bayar mahasiswa yang sudah punya presensi");
  check("dialog Uji Batal Dua terbuka", await openStudent("Uji Batal Dua"));
  check("form ubah terbuka", await openEdit("Uji Bayar Alpro"));
  await toggle("false");
  check(
    "  ditolak dengan jumlah presensinya",
    await saveExpecting(
      "Mahasiswa sudah punya 1 presensi di kelas A. Hapus presensinya dulu bila pembayaran memang harus dibatalkan.",
    ),
  );
  check(
    "  form tetap terbuka untuk diperbaiki",
    await evaluate(bodyHas("Ubah Data Aktivasi Mahasiswa")),
  );
  check(
    "  tetap sudah bayar dan di kelas A",
    (await db.trn_class_participants.count({
      where: { userId: three.id, classId: alproA.id },
    })) === 1,
  );
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
