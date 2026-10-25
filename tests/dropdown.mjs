import {
  bodyHas,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("68");
const SUBJECT = "Uji Dropdown Alfa";
const STUDENT = "Mahasiswa Dropdown";
const ANNOUNCEMENT = "Uji Dropdown Pengumuman";
const BLUE = "rgb(50, 114, 202)";
const RED = "rgb(241, 65, 108)";
const WHITE = "rgb(255, 255, 255)";
const KEYS = { Enter: 13, ArrowUp: 38, ArrowDown: 40 };

const PANEL = `[...document.querySelectorAll('[role="listbox"],[role="menu"]')].find((p) => p.getBoundingClientRect().height > 0)`;
const ITEMS = `[...(${PANEL}).querySelectorAll('[role="option"],[role="menuitem"]')]`;
const nextOf = (selector, text) =>
  `[...document.querySelectorAll(${JSON.stringify(selector)})].find((el) => el.innerText.trim() === ${JSON.stringify(text)})?.nextElementSibling`;
const MEETINGS = `[...document.querySelectorAll("main button[aria-haspopup]")].find((b) => b.innerText.includes("Pertemuan"))`;

await runWebTest("Sorotan semua dropdown", data, async (browser) => {
  const { evaluate, waitFor, send, realClick } = browser;

  const subject = await data.subject(SUBJECT, { semester: "8" });
  const classA = await data.classOf(subject, "A", "MONDAY", 1);
  await data.classOf(subject, "B", "MONDAY", 2);
  for (const name of ["Pertemuan 1", "Pertemuan 2", "Pertemuan 3"])
    await data.meeting(classA, name);
  const student = await data.student(STUDENT);
  await data.activate(student, subject, true);
  await db.mst_announcement.create({
    data: {
      type: "BASIC",
      title: ANNOUNCEMENT,
      body: "sementara",
      author: data.laboran.id,
    },
  });

  const press = async (key) => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key,
        code: key,
        windowsVirtualKeyCode: KEYS[key],
        ...(key === "Enter" && type === "keyDown" ? { text: "\r" } : {}),
      });
    await sleep(250);
  };
  const hover = async (which) => {
    const index = which === "first" ? "0" : "items.length - 1";
    const point = await evaluate(`(() => {
      const items = ${ITEMS};
      const item = items[${index}];
      item.scrollIntoView({ block: "nearest" });
      const r = item.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    await send("Input.dispatchMouseEvent", {
      type: "mouseMoved",
      x: point.x,
      y: point.y,
    });
    await sleep(300);
    return evaluate(`(() => {
      const panel = ${PANEL};
      const items = ${ITEMS};
      const item = items[${index}];
      const p = panel.getBoundingClientRect();
      const r = item.getBoundingClientRect();
      const style = getComputedStyle(item);
      return {
        top: Math.round(r.top - p.top - panel.clientTop),
        bottom: Math.round(p.top + panel.clientTop + panel.clientHeight - r.bottom),
        left: Math.round(r.left - p.left - panel.clientLeft),
        right: Math.round(p.left + panel.clientLeft + panel.clientWidth - r.right),
        bg: style.backgroundColor,
        color: style.color,
      };
    })()`);
  };
  const inspect = async (label, button, lastColor = BLUE) => {
    await realClick(button);
    const opened = await waitFor(`!!(${PANEL}) && ${ITEMS}.length > 0`, 5000);
    await sleep(300);
    const first = opened ? await hover("first") : null;
    const last = opened ? await hover("last") : null;
    check(
      `${label}: sorotan opsi pertama dan terakhir penuh sampai tepi, teks putih`,
      !!first &&
        first.top === 0 &&
        first.left === 0 &&
        first.right === 0 &&
        last.bottom === 0 &&
        last.left === 0 &&
        last.right === 0 &&
        first.bg === BLUE &&
        last.bg === lastColor &&
        first.color === WHITE &&
        last.color === WHITE,
      JSON.stringify({ first, last }),
    );
    await browser.pressEscape();
    await sleep(300);
  };
  const pick = async (button, text) => {
    await realClick(button);
    await waitFor(
      `[...document.querySelectorAll('[role="option"]')].some((o) => o.innerText.trim().startsWith(${JSON.stringify(text)}))`,
      5000,
    );
    await realClick(
      `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.trim().startsWith(${JSON.stringify(text)}))`,
    );
    await sleep(500);
  };

  await send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  check("login laboran", await browser.login(data.laboran, data.password));

  section("Buat Pengumuman");
  await browser.navigate("/dashboard/pengumuman/add-pengumuman");
  await waitFor(bodyHas("Jenis Pengumuman"), 20000);
  await sleep(1000);
  await inspect("Jenis Pengumuman", nextOf("main p", "Jenis Pengumuman"));

  section("Tambah Mata Kuliah");
  await browser.navigate("/dashboard/master-data/add-subject");
  await waitFor(bodyHas("Dosen Pengampu"), 20000);
  await sleep(1500);
  await inspect("Dosen Pengampu", nextOf("main label", "Dosen Pengampu"));
  await inspect("Semester", nextOf("main label", "Semester"));

  section("Tambah Praktikum");
  await browser.navigate("/dashboard/praktikum/tambah-praktikum");
  await waitFor(
    `(${nextOf("main p", "Mata Kuliah")})?.innerText.trim() === "Pilih mata kuliah"`,
    20000,
  );
  await sleep(800);
  await inspect("Mata Kuliah", nextOf("main p", "Mata Kuliah"));
  await pick(nextOf("main p", "Mata Kuliah"), SUBJECT);
  await inspect("Hari", nextOf("form p", "Hari"));
  await inspect("Ruangan", nextOf("form p", "Ruangan"));
  await pick(nextOf("form p", "Hari"), "Senin");
  await pick(nextOf("form p", "Ruangan"), "PSI");
  await inspect(
    "Sesi Kelas",
    `document.querySelector('form button[aria-label="Sesi Kelas"]')`,
  );

  section("Praktikum");
  await browser.navigate("/dashboard/praktikum");
  await waitFor(
    `!!document.querySelector('button[aria-label="Pilih periode"]')`,
    20000,
  );
  await sleep(1000);
  await inspect(
    "Periode",
    `document.querySelector('button[aria-label="Pilih periode"]')`,
  );

  section("Detail Kelas");
  await browser.navigate(`/dashboard/praktikum/${classA.id}`);
  await waitFor(bodyHas("Rekap All"), 20000);
  await sleep(1200);
  await inspect("Pilih Pertemuan", MEETINGS);
  await evaluate(`(${MEETINGS}).focus()`);
  await press("ArrowDown");
  await waitFor(`!!(${PANEL})`, 5000);
  await press("ArrowUp");
  const focused = await evaluate(`(() => {
    const item = ${ITEMS}.find((o) => o.hasAttribute("data-focus"));
    return item ? { text: item.innerText.trim(), bg: getComputedStyle(item).backgroundColor } : null;
  })()`);
  await press("Enter");
  await sleep(500);
  check(
    "  pilihan pertemuan yang disorot keyboard juga biru",
    focused?.text.startsWith("Pertemuan 2") && focused.bg === BLUE,
    JSON.stringify(focused),
  );
  check(
    "  Enter memilih pertemuan itu",
    (await evaluate(`(${MEETINGS}).innerText.trim()`)) === "Pertemuan 2",
    await evaluate(`(${MEETINGS}).innerText.trim()`),
  );

  section("Daftar Pengumuman");
  await browser.navigate("/dashboard/pengumuman/list-pengumuman");
  await waitFor(bodyHas(ANNOUNCEMENT), 20000);
  await sleep(1000);
  const kebab = `[...document.querySelectorAll("p")].find((p) => p.innerText === ${JSON.stringify(ANNOUNCEMENT)})?.closest(".space-x-3")?.querySelector("button")`;
  await inspect("Menu Lihat Detail / Edit / Hapus (Hapus merah)", kebab, RED);
  await realClick(kebab);
  await waitFor(`!!document.querySelector('[role="menuitem"]')`, 5000);
  await realClick(
    `[...document.querySelectorAll('[role="menuitem"]')].find((m) => m.innerText.trim() === "Edit")`,
  );
  await waitFor(
    `!!document.querySelector('[role="dialog"] button[aria-haspopup="listbox"]')`,
    5000,
  );
  await sleep(800);
  await inspect(
    "Jenis Pengumuman di pop-up Edit",
    `document.querySelector('[role="dialog"] button[aria-haspopup="listbox"]')`,
  );
  await browser.pressEscape();

  section("Pembayaran");
  await browser.navigate("/dashboard/master-data/pembayaran");
  await waitFor(
    `!!document.querySelector('[aria-label="Lihat pembayaran ${STUDENT}"]')`,
    20000,
  );
  await sleep(1000);
  await realClick(
    `document.querySelector('[aria-label="Lihat pembayaran ${STUDENT}"]')`,
  );
  await waitFor(bodyHas("Status Pembayaran Mahasiswa"), 5000);
  await realClick(`document.querySelector('[aria-label="Ubah ${SUBJECT}"]')`);
  await waitFor(bodyHas("Ubah Data Aktivasi Mahasiswa"), 5000);
  await sleep(800);
  await inspect(
    "Pilih Kelas",
    `[...document.querySelectorAll('[role="dialog"] button[aria-haspopup="listbox"]')].find((b) => b.getBoundingClientRect().width > 0)`,
  );
});
