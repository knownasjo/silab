import { randomBytes } from "node:crypto";
import {
  bodyHas,
  check,
  db,
  openBrowser,
  runWebTest,
  section,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("58");
const BOX = `document.querySelector('section[aria-label="HP tidak biasa"]')`;
const boxHas = (text) =>
  `!!${BOX}?.innerText.includes(${JSON.stringify(text)})`;
const marks = `document.querySelectorAll('span[aria-label="HP tidak biasa"]').length`;
const button = (label) =>
  `document.querySelector('button[aria-label=${JSON.stringify(label)}]')`;
const newDeviceId = () => randomBytes(32).toString("hex");

await runWebTest("Tanda HP tidak biasa di web", data, async (browser) => {
  const subject = await data.subject("Uji HP Web");
  const cls = await data.classOf(subject, "A", "MONDAY", 1);
  const [andi, budi, citra, dedi] = await data.students(
    4,
    (i) => ["Andi HP Web", "Budi HP Web", "Citra HP Web", "Dedi HP Web"][i],
  );
  for (const student of [andi, budi, citra, dedi]) {
    await data.activate(student, subject, true);
    await data.enroll(student, cls);
  }
  const meeting = await data.meeting(cls, "Pertemuan 1", { status: true });
  const phone = {
    andiOld: newDeviceId(),
    andiNew: newDeviceId(),
    budi: newDeviceId(),
    citra: newDeviceId(),
    dedi: newDeviceId(),
  };
  await db.trn_user_devices.createMany({
    data: [
      { userId: andi.id, device_id: phone.andiOld, is_usual: true },
      { userId: andi.id, device_id: phone.andiNew, is_usual: false },
    ],
  });
  const scanned = (user, device_id, device_check) =>
    db.trn_meeting_participants.create({
      data: {
        meetingId: meeting.id,
        userId: user.id,
        status: true,
        device_id,
        device_check,
      },
    });
  await scanned(andi, phone.andiNew, "TIDAK_BIASA");
  await scanned(budi, phone.budi, "TIDAK_BIASA");
  await scanned(citra, phone.citra, "BIASA");
  await scanned(dedi, phone.dedi, "TIDAK_BIASA");
  const recordOf = (user) =>
    db.trn_meeting_participants.findUnique({
      where: { meetingId_userId: { meetingId: meeting.id, userId: user.id } },
    });
  const openMeeting = async (page) => {
    await page.navigate(`/dashboard/praktikum/${cls.id}`);
    await page.waitFor(
      `${bodyHas("Uji HP Web")} && ${bodyHas("Pilih Pertemuan")}`,
      20000,
    );
    await page.clickText("Pilih Pertemuan");
    await page.waitFor(`!!(${page.visibleButton("Pertemuan 1")})`, 5000);
    await page.clickText("Pertemuan 1");
    return page.waitFor(bodyHas("Jumlah hadir"), 10000);
  };

  const lecturer = await openBrowser();
  try {
    section("Dosen hanya melihat");
    check("login dosen", await lecturer.login(data.lecturer, data.password));
    check("dosen membuka Pertemuan 1", await openMeeting(lecturer));
    check(
      "kotak ⚠ berisi 3 mahasiswa dari HP tidak biasa",
      await lecturer.waitFor(
        `${boxHas("3 mahasiswa presensi dari HP yang tidak biasa")} && ${boxHas("Andi HP Web")} && ${boxHas("Budi HP Web")} && ${boxHas("Dedi HP Web")} && !${boxHas("Citra HP Web")}`,
        5000,
      ),
      await lecturer.evaluate(`${BOX}?.innerText`),
    );
    check(
      "  tertulis menunggu dicek asisten, tanpa tombol",
      (await lecturer.evaluate(boxHas("Menunggu dicek asisten."))) &&
        !(await lecturer.evaluate(`!!${button("Ada: Andi HP Web")}`)),
    );

    section("Laboran menjawab Ada / Tidak ada");
    check("login laboran", await browser.login(data.laboran, data.password));
    check("laboran membuka Pertemuan 1", await openMeeting(browser));
    check(
      "kotak ⚠ meminta asisten memanggil nama",
      await browser.waitFor(
        `${boxHas("Panggil namanya, lalu pilih Ada atau Tidak ada.")} && !!${button("Ada: Andi HP Web")} && !!${button("Tidak ada: Andi HP Web")}`,
        5000,
      ),
    );
    check(
      "  tiga baris daftar presensi bertanda ⚠",
      (await browser.evaluate(marks)) === 3,
      String(await browser.evaluate(marks)),
    );

    await browser.realClick(button("Ada: Andi HP Web"));
    check(
      "tombol Ada: pesan berhasil tampil",
      await browser.waitFor(
        bodyHas(
          "Andi HP Web ditandai hadir. HP ini sekarang menjadi HP biasanya.",
        ),
        10000,
      ),
    );
    check(
      "  Andi hilang dari kotak ⚠",
      await browser.waitFor(
        `${boxHas("2 mahasiswa")} && !${boxHas("Andi HP Web")}`,
        10000,
      ),
      await browser.evaluate(`${BOX}?.innerText`),
    );
    const andiRecord = await recordOf(andi);
    const andiUsual = (
      await db.trn_user_devices.findMany({
        where: { userId: andi.id, is_usual: true },
      })
    ).map((d) => d.device_id);
    check(
      "  tersimpan: tetap hadir, sudah dicek, HP baru jadi HP biasa",
      andiRecord.status === true &&
        andiRecord.device_check === "SUDAH_DICEK" &&
        andiUsual.length === 1 &&
        andiUsual[0] === phone.andiNew,
      JSON.stringify({ andiRecord, andiUsual }),
    );

    await browser.realClick(button("Tidak ada: Budi HP Web"));
    check(
      "tombol Tidak ada: pesan berhasil tampil",
      await browser.waitFor(
        bodyHas("Budi HP Web ditandai tidak hadir."),
        10000,
      ),
    );
    check(
      "  Budi hilang dari kotak ⚠ dan barisnya menjadi Tidak Hadir",
      await browser.waitFor(
        `${boxHas("1 mahasiswa")} && !${boxHas("Budi HP Web")} && [...document.querySelectorAll("#recap-attendances > div")].some((row) => row.innerText.includes("Budi HP Web") && row.innerText.includes("Tidak Hadir"))`,
        10000,
      ),
    );
    const budiRecord = await recordOf(budi);
    check(
      "  tersimpan: tidak hadir dan sudah dicek",
      budiRecord.status === false && budiRecord.device_check === "SUDAH_DICEK",
      JSON.stringify(budiRecord),
    );
    check(
      "  tinggal satu baris bertanda ⚠",
      (await browser.evaluate(marks)) === 1,
    );

    section("Halaman dosen ikut berubah tanpa dimuat ulang");
    check(
      "kotak ⚠ dosen tinggal Dedi",
      await lecturer.waitFor(
        `${boxHas("1 mahasiswa")} && ${boxHas("Dedi HP Web")} && !${boxHas("Andi HP Web")}`,
        15000,
      ),
      await lecturer.evaluate(`${BOX}?.innerText`),
    );

    section("Sudah dicek staf lain");
    await db.trn_meeting_participants.update({
      where: { meetingId_userId: { meetingId: meeting.id, userId: dedi.id } },
      data: { device_check: "SUDAH_DICEK" },
    });
    await browser.realClick(button("Ada: Dedi HP Web"));
    check(
      "menekan Ada yang sudah dicek: pesan ditolak tampil",
      await browser.waitFor(
        `document.querySelector('[role="alert"]')?.innerText === "Presensi ini sudah dicek."`,
        10000,
      ),
    );
    check(
      "  kotak ⚠ hilang setelah daftar dimuat ulang",
      await browser.waitFor(`!${BOX} && ${marks} === 0`, 10000),
    );
    check(
      "  presensi Dedi tidak berubah",
      (await recordOf(dedi)).status === true,
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
