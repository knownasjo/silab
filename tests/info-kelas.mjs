import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("60");
const NAMES = [
  "Muhammad Rizky Pratama Wijaya",
  "Anindya Kusumawardhani Putri",
  "Budi Santoso",
];

await runWebTest("Kotak informasi kelas", data, async (browser) => {
  const subject = await data.subject("Uji Info Kelas");
  const empty = await data.classOf(subject, "A", "MONDAY", 1);
  const full = await data.classOf(subject, "B", "TUESDAY", 1);
  for (const name of NAMES) {
    const assistant = await data.student(name);
    await db.trn_class_collaborator.create({
      data: { userId: assistant.id, classId: full.id },
    });
  }
  const measure = () =>
    browser.evaluate(`(() => {
      const value = (label) => [...document.querySelectorAll("p")].find((p) => p.innerText === label).nextElementSibling;
      const box = value("Kuota").closest(".rounded-\\\\[20px\\\\]").getBoundingClientRect();
      const quota = value("Kuota").getBoundingClientRect();
      const room = value("Ruangan").getBoundingClientRect();
      const time = new Set([...value("Hari, Jam").querySelector("span").getClientRects()].map((r) => Math.round(r.top))).size;
      const names = ${JSON.stringify(NAMES)}
        .map((name) => [...document.querySelectorAll("p")].find((p) => p.innerText === name))
        .filter(Boolean)
        .map((p) => p.getBoundingClientRect());
      const label = [...document.querySelectorAll("p")].find((p) => p.innerText === "Asisten Praktikum").getBoundingClientRect();
      const icon = document.querySelector('button[aria-label="Kelola asisten"]').getBoundingClientRect();
      return {
        iconGap: Math.round(icon.left - label.right),
        quotaOneLine: Math.round(quota.height) === Math.round(room.height),
        quotaInside: quota.right <= box.right,
        timeOneLine: time === 1,
        names: names.length,
        namesInside: names.every((r) => r.bottom <= box.bottom && r.right <= box.right),
      };
    })()`);

  check("login laboran", await browser.login(data.laboran, data.password));
  for (const width of [1440, 1280]) {
    section(`Layar ${width} px`);
    await browser.send("Emulation.setDeviceMetricsOverride", {
      width,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    for (const [label, cls, names] of [
      ["tanpa asisten", empty, 0],
      ["3 asisten bernama panjang", full, 3],
    ]) {
      await browser.navigate(`/dashboard/praktikum/${cls.id}`);
      await browser.waitFor(
        `${bodyHas("Kuota")} && ${bodyHas("Asisten Praktikum")}`,
        20000,
      );
      const box = await measure();
      check(
        `${label}: kuota dan jam masing-masing satu baris`,
        box.quotaOneLine && box.timeOneLine && box.quotaInside,
        JSON.stringify(box),
      );
      check(
        "  ikon kelola asisten menempel di sebelah tulisan Asisten Praktikum",
        box.iconGap >= 0 && box.iconGap <= 12,
        JSON.stringify(box),
      );
      if (names)
        check(
          "  semua nama asisten di dalam kotak",
          box.names === names && box.namesInside,
          JSON.stringify(box),
        );
    }
  }
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
});
