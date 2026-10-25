import {
  bodyHas,
  call,
  check,
  db,
  json,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("71");
const PAGE = "/dashboard/master-data/add-subject";
const LIST_TITLE = "Mata kuliah yang sudah ada";
const LONG_LECTURER =
  "Prof. Dr. Ir. Raden Mas Muhammad Fadhil Ramadhan Saputra Wijayakusuma, S.T., M.T., Ph.D.";

const fieldButton = (label) =>
  `[...document.querySelectorAll("main fieldset")].find((f) => f.querySelector("label")?.innerText.trim() === ${JSON.stringify(label)})?.querySelector("button[id^=headlessui-listbox-button]")`;
const PANEL = `document.querySelector('[role="listbox"]')`;
const option = (text) =>
  `[...document.querySelectorAll('[role="option"]')].find((o) => o.innerText.trim().startsWith(${JSON.stringify(text)}))`;
const listSection = `[...document.querySelectorAll("main p")].find((p) => p.innerText.startsWith(${JSON.stringify(LIST_TITLE)}))?.parentElement`;
const groupButton = (semester) =>
  `[...document.querySelectorAll("main section > button[aria-expanded]")].find((b) => b.querySelector("span")?.innerText.trim() === ${JSON.stringify(`Semester ${semester}`)})`;
const groupCount = (semester) =>
  `(${groupButton(semester)})?.querySelector(":scope > span:last-child")?.innerText.trim()`;

await runWebTest("Tambah Mata Kuliah", data, async (browser) => {
  const { evaluate, waitFor, send, realClick, typeInto } = browser;

  await data.user("DOSEN", LONG_LECTURER);
  for (let i = 1; i <= 20; i++)
    await data.user(
      "DOSEN",
      `Dosen Uji Tambahan ${String(i).padStart(2, "0")}`,
    );
  const algoritma = await data.subject("Uji Matkul Algoritma", {
    semester: "1",
  });
  const basisData = await data.subject("Uji Matkul Basis Data", {
    semester: "3",
  });
  const analisis = await data.subject("Uji Matkul Analisis", {
    semester: "3",
  });
  const withClass = await data.subject("Uji Matkul Untuk Kelas", {
    semester: "5",
  });
  const busyClass = await data.classOf(withClass, "A", "MONDAY", 1);
  for (let i = 1; i <= 20; i++) await data.meeting(busyClass, `Pertemuan ${i}`);

  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const countSubjects = () =>
    db.mst_subject.count({ where: { deletedAt: null } });
  const countPerSemester = async () =>
    Object.fromEntries(
      (
        await db.mst_subject.groupBy({
          by: ["semester"],
          where: { deletedAt: null },
          _count: { _all: true },
        })
      ).map((row) => [row.semester, row._count._all]),
    );
  let onlySubjects = null;
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (onlySubjects && request.method === "GET" && path === "/subject")
      return json(200, { status: true, message: "OK", data: onlySubjects });
  });
  const size = (width, height) =>
    send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
  const network = (latency) =>
    send("Network.emulateNetworkConditions", {
      offline: false,
      latency,
      downloadThroughput: -1,
      uploadThroughput: -1,
    });
  const press = async (key, keyCode) => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key,
        code: key,
        windowsVirtualKeyCode: keyCode,
        ...(type === "keyDown" && key === "Enter" && { text: "\r" }),
      });
    await sleep(250);
  };
  const open = async () => {
    await browser.navigate(PAGE);
    const ok = await waitFor(
      `!!document.querySelector("#subject-code") && ${bodyHas(`${LIST_TITLE} (`)}`,
      20000,
    );
    await sleep(800);
    return ok;
  };
  const pick = async (label, text) => {
    await realClick(fieldButton(label));
    await waitFor(`!!(${option(text)})`, 5000);
    await evaluate(`(${option(text)})?.scrollIntoView({ block: "nearest" })`);
    await sleep(200);
    await realClick(option(text));
    await sleep(400);
  };
  const buttonText = (label) =>
    evaluate(`(${fieldButton(label)})?.innerText.trim()`);
  const toggle = async (semester) => {
    await realClick(groupButton(semester));
    await sleep(300);
  };
  const openGroup = async (semester) => {
    if (
      (await evaluate(
        `(${groupButton(semester)})?.getAttribute("aria-expanded")`,
      )) === "false"
    )
      await toggle(semester);
  };
  const readList = () =>
    evaluate(`(() => {
      const section = ${listSection};
      if (!section) return null;
      return {
        title: section.querySelector("p").innerText.trim(),
        groups: [...section.querySelectorAll("section")].map((group) => {
          const button = group.querySelector(":scope > button");
          const [semester, count] = [...(button?.querySelectorAll(":scope > span") ?? [])].map((span) => span.innerText.trim());
          return {
            semester,
            count,
            open: button?.getAttribute("aria-expanded") === "true",
            subjects: [...group.querySelectorAll(":scope > div > div")].map((row) => row.innerText.split("\\n").map((line) => line.trim()).filter(Boolean)),
          };
        }),
      };
    })()`);
  const openState = async () =>
    Object.fromEntries(
      (await readList())?.groups.map((group) => [
        group.semester.replace("Semester ", ""),
        group.open,
      ]) ?? [],
    );
  const panelState = () =>
    evaluate(`(() => {
      const panel = ${PANEL};
      if (!panel) return null;
      panel.scrollTop = panel.scrollHeight;
      const options = [...panel.querySelectorAll('[role="option"]')];
      return {
        bottom: Math.round(panel.getBoundingClientRect().bottom),
        viewport: innerHeight,
        lastBottom: Math.round(options[options.length - 1].getBoundingClientRect().bottom),
        options: options.length,
        nested: panel.querySelectorAll('[role="option"] button').length,
      };
    })()`);

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Tampilan halaman");
  await size(1366, 768);
  check("halaman terbuka dengan daftar mata kuliah", await open());
  const title = await evaluate(
    `(() => { const p = [...document.querySelectorAll("main p")].find((el) => el.innerText.trim() === "Tambah Mata Kuliah"); return p ? getComputedStyle(p).fontSize : null; })()`,
  );
  check("judul Tambah Mata Kuliah", title === "32px", JSON.stringify(title));
  const placeholders = [
    await buttonText("Semester"),
    await buttonText("Dosen Pengampu"),
  ];
  check(
    "  tulisan bawaan pilihan: Pilih semester dan Pilih dosen pengampu",
    placeholders[0] === "Pilih semester" &&
      placeholders[1] === "Pilih dosen pengampu",
    JSON.stringify(placeholders),
  );
  const total = await countSubjects();
  const perSemester = await countPerSemester();
  const list = await readList();
  const semesters =
    list?.groups.map((group) =>
      Number(group.semester.replace("Semester ", "")),
    ) ?? [];
  check(
    "daftar Mata kuliah yang sudah ada awalnya hanya judul semester (urut) dan jumlah mata kuliahnya, semua tertutup",
    list?.title === `${LIST_TITLE} (${total})` &&
      semesters.length > 1 &&
      semesters.length === Object.keys(perSemester).length &&
      JSON.stringify(semesters) ===
        JSON.stringify([...semesters].sort((a, b) => a - b)) &&
      list.groups.every(
        (group) =>
          !group.open &&
          group.subjects.length === 0 &&
          group.count ===
            `${perSemester[group.semester.replace("Semester ", "")]} mata kuliah`,
      ),
    JSON.stringify({ total, perSemester, list }),
  );
  await toggle(3);
  const opened = await readList();
  const third = opened?.groups.find((group) => group.semester === "Semester 3");
  const thirdNames = third?.subjects.map((row) => row[0]) ?? [];
  check(
    "  klik Semester 3 membuka isinya urut abjad, semester lain tetap tertutup",
    !!third?.open &&
      thirdNames.length === perSemester["3"] &&
      thirdNames.indexOf(analisis.subjectName) >= 0 &&
      thirdNames.indexOf(analisis.subjectName) <
        thirdNames.indexOf(basisData.subjectName) &&
      opened.groups.filter((group) => group.open).length === 1,
    JSON.stringify({
      third,
      open: opened?.groups
        .filter((group) => group.open)
        .map((group) => group.semester),
    }),
  );
  const analisisRow = third?.subjects.find(
    (row) => row[0] === analisis.subjectName,
  );
  check(
    "  setiap mata kuliah menulis kode dan dosen pengampu",
    !!analisisRow?.includes(analisis.subjectCode) &&
      !!analisisRow?.includes(`Dosen pengampu: ${data.lecturer.fullname}`),
    JSON.stringify(analisisRow),
  );
  await toggle(3);
  const closed = (await readList())?.groups.find(
    (group) => group.semester === "Semester 3",
  );
  check(
    "  klik sekali lagi menutupnya",
    closed?.open === false && closed.subjects.length === 0,
    JSON.stringify(closed),
  );

  section("Semester yang dipilih di form");
  await open();
  await pick("Semester", "3");
  const afterThree = await openState();
  check(
    "memilih Semester 3 di form langsung membuka Semester 3 saja",
    afterThree["3"] === true &&
      Object.values(afterThree).filter(Boolean).length === 1,
    JSON.stringify(afterThree),
  );
  await pick("Semester", "5");
  const afterFive = await openState();
  check(
    "  ganti ke Semester 5: Semester 3 tertutup lagi, Semester 5 terbuka",
    afterFive["3"] === false &&
      afterFive["5"] === true &&
      Object.values(afterFive).filter(Boolean).length === 1,
    JSON.stringify(afterFive),
  );
  await toggle(1);
  await pick("Semester", "3");
  const afterManual = await openState();
  check(
    "  semester yang dibuka sendiri tetap terbuka saat pilihan semester diganti",
    afterManual["1"] === true &&
      afterManual["3"] === true &&
      afterManual["5"] === false,
    JSON.stringify(afterManual),
  );
  await browser.clickText("Kosongkan");
  await sleep(400);
  const afterClear = await openState();
  const clearedSemester = await buttonText("Semester");
  check(
    "  Kosongkan juga menutup semua semester",
    clearedSemester === "Pilih semester" &&
      Object.keys(afterClear).length > 1 &&
      Object.values(afterClear).every((open) => !open),
    JSON.stringify({ clearedSemester, afterClear }),
  );
  onlySubjects = (await call("GET", "/subject", { token })).json.data.filter(
    (subject) => [analisis.id, basisData.id].includes(subject.id),
  );
  await open();
  const lone = await readList();
  onlySubjects = null;
  check(
    "  kalau hanya ada satu semester, semester itu langsung terbuka",
    lone?.groups.length === 1 &&
      lone.groups[0].open &&
      lone.groups[0].subjects.length === 2,
    JSON.stringify(lone),
  );

  section("Pilihan dosen dan semester");
  await realClick(fieldButton("Dosen Pengampu"));
  await waitFor(`!!(${PANEL})`, 5000);
  await sleep(400);
  const lecturerPanel = await panelState();
  check(
    "daftar 22 dosen berhenti 16 px dari bawah layar, dosen terakhir utuh setelah digulir",
    lecturerPanel?.options >= 22 &&
      lecturerPanel.bottom <= lecturerPanel.viewport - 16 + 1 &&
      lecturerPanel.lastBottom <= lecturerPanel.bottom + 1,
    JSON.stringify(lecturerPanel),
  );
  await browser.pressEscape();
  await realClick(fieldButton("Semester"));
  await waitFor(`!!(${PANEL})`, 5000);
  await sleep(300);
  const semesterPanel = await panelState();
  await browser.pressEscape();
  check(
    "  opsi dosen dan semester tanpa tombol di dalamnya",
    lecturerPanel?.nested === 0 && semesterPanel?.nested === 0,
    JSON.stringify({ lecturerPanel, semesterPanel }),
  );
  await size(1024, 768);
  await sleep(400);
  await pick("Dosen Pengampu", LONG_LECTURER);
  const long = await evaluate(`(() => {
    const button = ${fieldButton("Dosen Pengampu")};
    const text = button.querySelector("p");
    const b = button.getBoundingClientRect();
    const t = text.getBoundingClientRect();
    return { height: Math.round(t.height), cut: text.scrollWidth > text.clientWidth, title: text.getAttribute("title"), leftGap: Math.round(t.left - b.left) };
  })()`);
  check(
    "nama dosen panjang di layar 1024 px: satu baris rata kiri dengan ..., nama lengkap saat disorot",
    long.height <= 26 &&
      long.cut &&
      long.title === LONG_LECTURER &&
      long.leftGap <= 16,
    JSON.stringify(long),
  );
  await size(1366, 768);
  await open();
  await evaluate(`(${fieldButton("Semester")}).focus()`);
  for (let i = 0; i < 3; i++) await press("ArrowDown", 40);
  await press("Enter", 13);
  const semesterByKey = await buttonText("Semester");
  await evaluate(`(${fieldButton("Dosen Pengampu")}).focus()`);
  await press("ArrowDown", 40);
  await press("ArrowDown", 40);
  const active = await evaluate(
    `[...document.querySelectorAll('[role="option"]')].find((o) => o.hasAttribute("data-focus"))?.innerText.trim()`,
  );
  await press("Enter", 13);
  const lecturerByKey = await buttonText("Dosen Pengampu");
  check(
    "semester dan dosen bisa dipilih dengan keyboard",
    semesterByKey === "3" && !!active && lecturerByKey === active,
    JSON.stringify({ semesterByKey, active, lecturerByKey }),
  );

  section("Menyimpan");
  await open();
  await typeInto("#subject-code", data.nextCode());
  await typeInto("#subject-name", "Uji Matkul Baru");
  await pick("Semester", "4");
  await pick("Dosen Pengampu", data.lecturer.fullname);
  const before = await countSubjects();
  await network(1500);
  await realClick(`document.querySelector('main button[type="submit"]')`);
  await sleep(300);
  const locked = await evaluate(`({
    code: document.querySelector("#subject-code").matches(":disabled"),
    name: document.querySelector("#subject-name").matches(":disabled"),
    semester: (${fieldButton("Semester")}).matches(":disabled"),
    lecturer: (${fieldButton("Dosen Pengampu")}).matches(":disabled"),
    clear: [...document.querySelectorAll("main button")].find((b) => b.innerText.trim() === "Kosongkan")?.disabled,
  })`);
  check(
    "selama menyimpan, isian dan tombol Kosongkan terkunci",
    Object.values(locked).every(Boolean),
    JSON.stringify(locked),
  );
  const saved = await waitFor(
    bodyHas("Mata kuliah Uji Matkul Baru berhasil ditambahkan"),
    20000,
  );
  await network(0);
  await sleep(800);
  const after = await readList();
  const totalAfter = await countSubjects();
  const fourthGroup = after?.groups.find(
    (group) => group.semester === "Semester 4",
  );
  const fourth = fourthGroup?.subjects.map((row) => row[0]) ?? [];
  const cleared = await evaluate(
    `document.querySelector("#subject-code").value === "" && document.querySelector("#subject-name").value === ""`,
  );
  const resetLabels = [
    await buttonText("Semester"),
    await buttonText("Dosen Pengampu"),
  ];
  check(
    "  setelah berhasil: form kosong lagi, Semester 4 tetap terbuka dan mata kuliah baru langsung ada di sana",
    saved &&
      totalAfter === before + 1 &&
      after?.title === `${LIST_TITLE} (${totalAfter})` &&
      !!fourthGroup?.open &&
      fourth.includes("Uji Matkul Baru") &&
      cleared &&
      resetLabels[0] === "Pilih semester" &&
      resetLabels[1] === "Pilih dosen pengampu",
    JSON.stringify({
      saved,
      before,
      totalAfter,
      title: after?.title,
      fourthGroup,
      cleared,
      resetLabels,
    }),
  );
  await openGroup(1);
  const sixth = `${((await countPerSemester())["6"] ?? 0) + 1} mata kuliah`;
  const added = await call("POST", "/subject", {
    token,
    body: {
      subjectCode: data.nextCode(),
      subjectName: "Uji Matkul Dari Laboran Lain",
      semester: "6",
      lecturerId: data.lecturer.id,
    },
  });
  const appeared = await waitFor(
    `${groupCount(6)} === ${JSON.stringify(sixth)}`,
    8000,
  );
  const sixthClosed =
    (await evaluate(`(${groupButton(6)})?.getAttribute("aria-expanded")`)) ===
    "false";
  await openGroup(6);
  const addedShown = await waitFor(
    bodyHas("Uji Matkul Dari Laboran Lain"),
    3000,
  );
  const renamed = await call("PUT", `/subject/${algoritma.id}`, {
    token,
    body: { subjectName: "Uji Matkul Algoritma Lanjut" },
  });
  const renamedShown = await waitFor(
    bodyHas("Uji Matkul Algoritma Lanjut"),
    8000,
  );
  check(
    "daftar ikut berubah saat laboran lain menambah dan mengganti nama mata kuliah, tanpa membuka semester sendiri",
    added.code === 201 &&
      appeared &&
      sixthClosed &&
      addedShown &&
      renamed.code === 200 &&
      renamedShown,
    JSON.stringify({
      added: added.code,
      appeared,
      sixthClosed,
      addedShown,
      renamed: renamed.code,
      renamedShown,
    }),
  );

  section("Ubah Mata Kuliah di halaman Praktikum");
  const semesterThree = `[...document.querySelectorAll("button[aria-expanded]")].find((b) => b.innerText.includes("Semester 3"))`;
  await browser.navigate("/dashboard/praktikum");
  await waitFor(`!!(${semesterThree})`, 20000);
  if (
    (await evaluate(`(${semesterThree}).getAttribute("aria-expanded")`)) ===
    "false"
  )
    await realClick(semesterThree);
  await realClick(
    `document.querySelector('[aria-label="Ubah mata kuliah ${basisData.subjectName}"]')`,
  );
  await waitFor(bodyHas("Ubah Mata Kuliah"), 5000);
  await typeInto('[role="dialog"] #subject-name', "Uji Matkul Basis Data Baru");
  await network(1500);
  await realClick(
    `[...document.querySelectorAll('[role="dialog"] button')].find((b) => b.innerText.trim() === "Simpan")`,
  );
  await sleep(300);
  const dialogLocked = await evaluate(`({
    code: !!document.querySelector('[role="dialog"] #subject-code')?.matches(":disabled"),
    name: !!document.querySelector('[role="dialog"] #subject-name')?.matches(":disabled"),
    lists: [...document.querySelectorAll('[role="dialog"] button[id^=headlessui-listbox-button]')].every((b) => b.matches(":disabled")),
  })`);
  await waitFor(`!document.querySelector('[role="dialog"]')`, 20000);
  await network(0);
  check(
    "isian pop-up Ubah Mata Kuliah terkunci selama menyimpan",
    Object.values(dialogLocked).every(Boolean),
    JSON.stringify(dialogLocked),
  );

  section("Tambah Praktikum dan Detail Kelas");
  await browser.navigate("/dashboard/praktikum/tambah-praktikum");
  await waitFor(`!!(${browser.visibleButton("Pilih mata kuliah")})`, 20000);
  await sleep(500);
  await realClick(browser.visibleButton("Pilih mata kuliah"));
  await waitFor(`!!(${option(withClass.subjectName)})`, 5000);
  await realClick(option(withClass.subjectName));
  await waitFor(`!!document.querySelector("form")`, 5000);
  await sleep(500);
  const formLabels = await evaluate(`(() => {
    const next = (text) => [...document.querySelectorAll("form p")].find((p) => p.innerText.trim() === text)?.nextElementSibling?.innerText.trim();
    return { day: next("Hari"), room: next("Ruangan") };
  })()`);
  check(
    "Tambah Praktikum: tulisan bawaan Pilih hari dan Pilih ruangan",
    formLabels.day === "Pilih hari" && formLabels.room === "Pilih ruangan",
    JSON.stringify(formLabels),
  );
  await size(1024, 768);
  await browser.navigate(`/dashboard/praktikum/${busyClass.id}`);
  await waitFor(bodyHas("Rekap All"), 20000);
  await sleep(800);
  await realClick(
    `[...document.querySelectorAll("main button[aria-haspopup]")].find((b) => b.innerText.includes("Pertemuan"))`,
  );
  await waitFor(`!!(${PANEL})`, 5000);
  await sleep(400);
  const meetingPanel = await panelState();
  const meetingButton = await evaluate(
    `(() => { const r = [...document.querySelectorAll("main button[aria-haspopup]")].find((b) => b.innerText.includes("Pertemuan")).getBoundingClientRect(); const p = document.querySelector('[role="listbox"]').getBoundingClientRect(); return { top: Math.round(r.top), bottom: Math.round(r.bottom), panelTop: Math.round(p.top) }; })()`,
  );
  await browser.pressEscape();
  check(
    "layar 1024 px: daftar Pilih Pertemuan (20 pertemuan) berhenti 16 px dari bawah layar tanpa menutupi tombolnya",
    meetingPanel?.options === 20 &&
      meetingPanel.bottom <= meetingPanel.viewport - 16 + 1 &&
      (meetingButton.panelTop >= meetingButton.bottom ||
        meetingPanel.bottom <= meetingButton.top),
    JSON.stringify({ meetingPanel, meetingButton }),
  );
  await send("Emulation.clearDeviceMetricsOverride");
});
