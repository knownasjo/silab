import {
  bodyHas,
  call,
  check,
  db,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("73");
const PAGE = "/dashboard/master-data/jam-sesi";
const CARD = "main section[aria-label^=Jam]";
const ADD_DAYS = `${CARD} [role=group][aria-label^=Tambahkan]`;
const BELUM_ADA = "Belum ada sesi.";
const DAY_NAMES = {
  MONDAY: "Senin",
  TUESDAY: "Selasa",
  WEDNESDAY: "Rabu",
  FRIDAY: "Jumat",
};

await runWebTest("Jam Sesi", data, async (browser) => {
  const { evaluate, waitFor, send, realClick, typeInto } = browser;

  const sessions = await data.sessions();
  const tuesday = await data.sessions({ day: "TUESDAY" });
  const friday = await data.sessions({ day: "FRIDAY" });
  await data.sessions({ room: "SBTI", day: "TUESDAY" });
  const extra = (room, day, number, startAt, endAt) =>
    db.mst_session.create({
      data: {
        periodId: data.period.id,
        room,
        day,
        number,
        startAt,
        endAt,
        createdBy: data.laboran.id,
      },
    });
  const first = await extra(
    "PSI",
    "MONDAY",
    data.sessionFrom + 7,
    "06.00",
    "06.40",
  );
  const sbtiEarly = await extra(
    "SBTI",
    "MONDAY",
    data.sessionFrom + 8,
    "17.15",
    "17.55",
  );
  const subject = await data.subject("Uji Jam Sesi Basis Data");
  const networking = await data.subject("Uji Jam Sesi Jaringan");
  const basisData = await data.classOf(subject, "A", "MONDAY", 1);
  const gone = await data.classOf(subject, "B", "MONDAY", 2);
  await db.mst_class.update({
    where: { id: gone.id },
    data: { deletedAt: new Date() },
  });
  const networkClass = await db.mst_class.create({
    data: {
      subjectId: networking.id,
      periodId: data.period.id,
      name: "A",
      quota: 30,
      day: "MONDAY",
      room: "SBTI",
      sessionId: sbtiEarly.id,
      startAt: sbtiEarly.startAt,
      endAt: sbtiEarly.endAt,
      createdBy: data.laboran.id,
    },
  });
  const student = await data.student("Uji Jam Sesi Peserta");
  await data.enroll(student, basisData);
  await data.enroll(student, networkClass);

  const used = new Set(
    (
      await db.mst_session.findMany({
        where: { periodId: data.period.id },
        select: { number: true },
      })
    ).map((session) => session.number),
  );
  const [freeA, freeB, freeC, freeD, freeE, freeF, freeG, freeH] = Array.from(
    { length: 20 },
    (_, i) => 20 - i,
  ).filter((number) => !used.has(number));
  const label = (session, day = "MONDAY", room = "PSI") =>
    typeof session === "number"
      ? `Sesi ${session} ${DAY_NAMES[day]} ${room}`
      : `Sesi ${session.number} ${DAY_NAMES[session.day]} ${session.room}`;

  let mode = "normal";
  const posts = [];
  const puts = [];
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (request.method === "POST" && path === "/session")
      posts.push(JSON.parse(request.postData ?? "{}"));
    if (request.method === "PUT" && path.startsWith("/session/"))
      puts.push(JSON.parse(request.postData ?? "{}"));
    if (mode === "fail" && request.method === "GET" && path === "/session")
      return { fail: "ConnectionRefused" };
  });

  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
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
  const ubah = (session) =>
    `document.querySelector('[aria-label="Ubah ${typeof session === "string" ? session : label(session)}"]')`;
  const open = async () => {
    await browser.navigate(PAGE);
    const ok = await waitFor(`!!${ubah(sessions[5])}`, 20000);
    await sleep(600);
    return ok;
  };
  const button = (text, scope = "document") =>
    `[...${scope}.querySelectorAll("button")].find((b) => b.innerText.trim() === ${JSON.stringify(text)} && b.getBoundingClientRect().width > 0)`;
  const choose = async (group, text) => {
    await realClick(
      button(
        text,
        `document.querySelector('[role="group"][aria-label="${group}"]')`,
      ),
    );
    await sleep(400);
  };
  const tick = async (scope, text) => {
    await realClick(
      `[...document.querySelectorAll(${JSON.stringify(`${scope} label`)})].find((l) => l.innerText.trim().startsWith(${JSON.stringify(text)}))`,
    );
    await sleep(150);
  };
  const labelsIn = (scope) =>
    evaluate(
      `[...document.querySelectorAll(${JSON.stringify(`${scope} label`)})].map((l) => l.innerText.replace(/\\s+/g, " ").trim())`,
    );
  const unticked = (scope) =>
    evaluate(
      `[...document.querySelectorAll(${JSON.stringify(`${scope} input[type=checkbox]`)})].every((c) => !c.checked)`,
    );
  const cardState = () =>
    evaluate(`(() => {
      const cards = [...document.querySelectorAll("${CARD}")];
      const pressed = (group) => [...document.querySelectorAll('[role="group"][aria-label="' + group + '"] button[aria-pressed="true"]')].map((b) => b.innerText.trim());
      return {
        cards: cards.map((c) => c.getAttribute("aria-label")),
        title: cards[0]?.querySelector("p")?.innerText.trim(),
        room: pressed("Ruangan"),
        day: pressed("Hari"),
      };
    })()`);

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Tampilan");
  await size(1366, 768);
  check("halaman Jam Sesi terbuka", await open());
  const start = await cardState();
  check(
    "awalnya PSI dan Senin terpilih; satu kartu Senin · PSI",
    JSON.stringify(start) ===
      JSON.stringify({
        cards: ["Jam sesi Senin PSI"],
        title: "Senin · PSI",
        room: ["PSI"],
        day: ["Senin"],
      }),
    JSON.stringify(start),
  );
  const layout = () =>
    evaluate(`(() => {
      const card = document.querySelector("${CARD}");
      const box = card.getBoundingClientRect();
      const page = document.querySelector("main > div");
      const rows = [...card.querySelectorAll('button[aria-label^="Ubah "]')].map((ubah) => {
        const row = ubah.closest("div.grid");
        const time = row.querySelector("p.whitespace-nowrap") ?? row.children[1];
        const t = time.getBoundingClientRect();
        const u = ubah.getBoundingClientRect();
        return { ubahLeft: Math.round(u.left), ubahTop: Math.round(u.top), timeLeft: Math.round(t.left), timeBottom: Math.round(t.bottom), timeHeight: Math.round(t.height) };
      });
      return {
        rows,
        outside: [...document.querySelectorAll("main button, main label")].filter((b) => b.getBoundingClientRect().right > box.right + 1).length,
        pageScroll: page.scrollWidth > page.clientWidth,
      };
    })()`);
  const wide = await layout();
  check(
    "1366 px: semua tombol di dalam kartu, jam satu baris, tombol Ubah sejajar di semua baris",
    wide.rows.length >= 7 &&
      wide.outside === 0 &&
      wide.rows.every((row) => row.timeHeight <= 26) &&
      new Set(wide.rows.map((row) => row.ubahLeft)).size === 1,
    JSON.stringify(wide),
  );
  await size(1024, 768);
  await sleep(600);
  const narrow = await layout();
  check(
    "1024 px: tombol pindah ke baris kedua di bawah jam, tidak ada yang keluar kartu, halaman tidak bergeser ke samping",
    narrow.rows.length >= 7 &&
      narrow.outside === 0 &&
      !narrow.pageScroll &&
      narrow.rows.every(
        (row) =>
          row.timeHeight <= 26 &&
          row.ubahTop >= row.timeBottom &&
          Math.abs(row.ubahLeft - row.timeLeft) <= 1,
      ),
    JSON.stringify(narrow),
  );
  await size(1366, 768);
  await sleep(400);

  section("Pilihan ruangan dan hari");
  await choose("Ruangan", "SBTI");
  const sbti = await cardState();
  const sbtiRows = await evaluate(
    `({ own: !!${ubah(sbtiEarly)}, psi: !!${ubah(first)} })`,
  );
  await choose("Hari", "Jumat");
  const sbtiFriday = await cardState();
  await choose("Ruangan", "PSI");
  await choose("Hari", "Senin");
  const back = await waitFor(`!!${ubah(first)}`, 5000);
  check(
    "pilih SBTI: kartu Senin · SBTI hanya berisi sesi SBTI",
    sbti.title === "Senin · SBTI" &&
      JSON.stringify(sbti.room) === '["SBTI"]' &&
      sbtiRows.own &&
      !sbtiRows.psi,
    JSON.stringify({ sbti, sbtiRows }),
  );
  check(
    "  pilih Jumat: kartu Jumat · SBTI; kembali ke PSI Senin menampilkan sesi PSI lagi",
    sbtiFriday.title === "Jumat · SBTI" &&
      sbtiFriday.cards.length === 1 &&
      back,
    JSON.stringify({ sbtiFriday, back }),
  );

  section("Sesi yang kelasnya sudah dihapus");
  const goneRow = await evaluate(
    `[...document.querySelectorAll("${CARD} div.grid")].find((row) => row.innerText.startsWith("Sesi ${sessions[1].number}"))?.innerText.replace(/\\n/g, " | ")`,
  );
  await realClick(
    `document.querySelector('[aria-label="Hapus ${label(sessions[1])}"]')`,
  );
  await sleep(300);
  await realClick(button("Ya, hapus"));
  const removed = await waitFor(`!${ubah(sessions[1])}`, 8000);
  await waitFor(
    `!!document.querySelector("${CARD} [role=status]")?.innerText.includes("berhasil dihapus")`,
    8000,
  );
  const top = await evaluate(`(() => {
    const card = document.querySelector("${CARD}");
    const status = card.querySelector("[role=status]");
    return { text: status?.innerText.trim(), afterTitle: status?.previousElementSibling?.innerText.trim() === "Senin · PSI" };
  })()`);
  check(
    "baris menulis 0 kelas dan ada tombol Hapus; Ya, hapus benar-benar menghapus, pesannya di atas kartu",
    !!goneRow?.includes("0 kelas") &&
      removed &&
      top.text === `${label(sessions[1])} berhasil dihapus` &&
      top.afterTitle,
    JSON.stringify({ goneRow, removed, top }),
  );

  section("Pesan di dekat barisnya");
  await evaluate(`document.querySelector("main > div").scrollTop = 0`);
  await sleep(300);
  await realClick(ubah(first));
  await sleep(300);
  await typeInto(`[aria-label="Nomor ${label(first)}"]`, String(freeA));
  await typeInto(`[aria-label="Jam mulai ${label(first)}"]`, "17.50");
  await typeInto(`[aria-label="Jam selesai ${label(first)}"]`, "18.10");
  await realClick(button("Simpan"));
  await waitFor(`!!document.querySelector("${CARD} [role=alert]")`, 8000);
  const clash = await evaluate(`(() => {
    const form = document.querySelector('[aria-label="Jam mulai ${label(first)}"]')?.closest("form");
    const alert = form?.querySelector("[role=alert]");
    const r = alert?.getBoundingClientRect();
    return { text: alert?.innerText.trim(), visible: !!r && r.top >= 0 && r.bottom <= innerHeight };
  })()`);
  check(
    "jam yang bertabrakan saat mengubah sesi paling atas: pesan merah di bawah form itu dan terlihat di layar",
    clash.text ===
      `Jam sesi bertabrakan dengan ${label(sessions[0])} (18.00–18.40)!` &&
      clash.visible,
    JSON.stringify(clash),
  );
  await typeInto(`[aria-label="Jam mulai ${label(first)}"]`, "06.00");
  await typeInto(`[aria-label="Jam selesai ${label(first)}"]`, "06.30");
  await realClick(button("Simpan"));
  const renamed = label(freeA);
  await waitFor(`!!${ubah(renamed)}`, 8000);
  await sleep(300);
  const saved = await evaluate(`(() => {
    const row = ${ubah(renamed)}.closest("div.grid").parentElement;
    const status = row.querySelector("[role=status]");
    const r = status?.getBoundingClientRect();
    return { text: status?.innerText.trim(), visible: !!r && r.top >= 0 && r.bottom <= innerHeight };
  })()`);
  check(
    "  berhasil: pesan hijau di bawah baris itu",
    saved.text === `${renamed} berhasil diperbarui` && saved.visible,
    JSON.stringify(saved),
  );

  section("Ubah juga di hari lain");
  const target = sessions[2];
  const group = `[role=group][aria-label="Ubah juga di hari lain untuk ${label(target)}"]`;
  await realClick(ubah(target));
  await waitFor(`!!document.querySelector(${JSON.stringify(group)})`, 5000);
  await sleep(300);
  const listed = await labelsIn(group);
  const noneTicked = await unticked(group);
  check(
    "form Ubah menampilkan hari lain di ruangan yang sama dengan nomor itu dan jamnya sekarang, belum dicentang",
    JSON.stringify(listed) ===
      JSON.stringify([
        `Selasa sekarang ${tuesday[2].startAt} – ${tuesday[2].endAt}`,
        `Jumat sekarang ${friday[2].startAt} – ${friday[2].endAt}`,
      ]) && noneTicked,
    JSON.stringify({ listed, noneTicked }),
  );
  await tick(group, "Selasa");
  puts.length = 0;
  await typeInto(`[aria-label="Nomor ${label(target)}"]`, String(freeF));
  await typeInto(`[aria-label="Jam mulai ${label(target)}"]`, "19.35");
  await realClick(button("Simpan"));
  const both = await waitFor(
    bodyHas(`Sesi ${freeF} PSI hari Senin dan Selasa berhasil diperbarui`),
    8000,
  );
  const [mondayAfter, tuesdayAfter, fridayAfter] = await Promise.all(
    [target, tuesday[2], friday[2]].map((session) =>
      db.mst_session.findUnique({ where: { id: session.id } }),
    ),
  );
  check(
    "  centang Selasa lalu Simpan: nomor dan jam Senin serta Selasa berubah, Jumat tetap",
    both &&
      JSON.stringify(puts[0]?.alsoDays) === '["TUESDAY"]' &&
      [mondayAfter, tuesdayAfter].every(
        (session) => session.number === freeF && session.startAt === "19.35",
      ) &&
      fridayAfter.number === friday[2].number &&
      fridayAfter.startAt === friday[2].startAt,
    JSON.stringify({
      both,
      puts,
      monday: mondayAfter,
      tuesday: tuesdayAfter,
      friday: fridayAfter,
    }),
  );

  section("Tambahkan juga ke hari lain");
  const addDays = await labelsIn(ADD_DAYS);
  const tickGaps = await evaluate(
    `[...document.querySelectorAll(${JSON.stringify(`${ADD_DAYS} label`)})].map((label) => {
      const box = label.querySelector("span[aria-hidden]").getBoundingClientRect();
      const range = document.createRange();
      range.selectNodeContents([...label.childNodes].find((node) => node.nodeType === 3));
      return Math.round(range.getBoundingClientRect().left - box.right);
    })`,
  );
  await typeInto(`[aria-label="Nomor sesi baru Senin PSI"]`, String(freeB));
  await typeInto(`[aria-label="Jam mulai sesi baru Senin PSI"]`, "22.30");
  await typeInto(`[aria-label="Jam selesai sesi baru Senin PSI"]`, "22.40");
  await tick(ADD_DAYS, "Rabu");
  posts.length = 0;
  await realClick(button("Tambah Sesi", `document.querySelector("${CARD}")`));
  const addedMany = await waitFor(
    bodyHas(`Sesi ${freeB} PSI hari Senin dan Rabu berhasil ditambahkan`),
    8000,
  );
  await sleep(300);
  const addedRows = await db.mst_session.findMany({
    where: { periodId: data.period.id, room: "PSI", number: freeB },
  });
  const resetTicks = await unticked(ADD_DAYS);
  check(
    "pilihan hari lain berisi 4 hari selain Senin, nama hari tidak menempel kotak centang",
    JSON.stringify(addDays) === '["Selasa","Rabu","Kamis","Jumat"]' &&
      tickGaps.every((gap) => gap >= 6),
    JSON.stringify({ addDays, tickGaps }),
  );
  check(
    "  centang Rabu membuat sesi di Senin dan Rabu, lalu centangnya kosong lagi",
    addedMany &&
      JSON.stringify(posts[0]?.alsoDays) === '["WEDNESDAY"]' &&
      JSON.stringify(addedRows.map((s) => s.day).sort()) ===
        '["MONDAY","WEDNESDAY"]' &&
      resetTicks,
    JSON.stringify({
      addDays,
      addedMany,
      posts,
      days: addedRows.map((s) => s.day),
      resetTicks,
    }),
  );

  section("Peringatan jadwal bentrok");
  await choose("Ruangan", "SBTI");
  const warnedLabel = label(freeG, "MONDAY", "SBTI");
  await realClick(ubah(sbtiEarly));
  await sleep(300);
  await typeInto(`[aria-label="Nomor ${label(sbtiEarly)}"]`, String(freeG));
  await typeInto(`[aria-label="Jam selesai ${label(sbtiEarly)}"]`, "18.20");
  await realClick(button("Simpan"));
  const warned = await waitFor(
    `${bodyHas("Perhatian, 1 jadwal jadi bentrok.")} && !!${ubah(warnedLabel)}`,
    8000,
  );
  await sleep(300);
  const warning = await evaluate(`(() => {
    const row = ${ubah(warnedLabel)}?.closest("div.grid")?.parentElement;
    const box = row?.querySelector("[role=status]");
    return {
      message: box?.querySelector("p")?.innerText.trim(),
      items: [...(box?.querySelectorAll("li") ?? [])].map((li) => li.innerText.trim()),
      background: box ? getComputedStyle(box).backgroundColor : null,
    };
  })()`);
  const networkAfter = await db.mst_class.findUnique({
    where: { id: networkClass.id },
  });
  check(
    "jam baru membuat peserta bentrok: tetap tersimpan, kotak kuning di bawah barisnya menyebut nama dan kedua kelas",
    warned &&
      warning.message ===
        `${warnedLabel} berhasil diperbarui; jam 1 kelas ikut berubah. Perhatian, 1 jadwal jadi bentrok.` &&
      JSON.stringify(warning.items) ===
        JSON.stringify([
          "Uji Jam Sesi Jaringan kelas A (Senin, 17.15 - 18.20, SBTI): peserta Uji Jam Sesi Peserta juga mengikuti praktikum Uji Jam Sesi Basis Data kelas A (Senin, 18.00 - 18.40, PSI)",
        ]) &&
      warning.background === "rgb(255, 248, 221)" &&
      networkAfter.endAt === "18.20",
    JSON.stringify({ warned, warning, endAt: networkAfter.endAt }),
  );
  await choose("Ruangan", "PSI");

  section("Format jam");
  await choose("Hari", "Jumat");
  const tidied = [];
  for (const [typed, expected] of [
    ["7.00", "07.00"],
    ["07:00", "07.00"],
    ["0700", "07.00"],
    ["730", "07.30"],
  ]) {
    await typeInto(`[aria-label="Jam mulai sesi baru Jumat PSI"]`, typed);
    await evaluate(
      `document.querySelector('[aria-label="Jam mulai sesi baru Jumat PSI"]').blur()`,
    );
    await sleep(150);
    tidied.push({
      typed,
      shown: await evaluate(
        `document.querySelector('[aria-label="Jam mulai sesi baru Jumat PSI"]').value`,
      ),
      expected,
    });
  }
  check(
    "jam 7.00, 07:00, 0700, dan 730 dirapikan menjadi 07.00 atau 07.30",
    tidied.every((item) => item.shown === item.expected),
    JSON.stringify(tidied),
  );
  posts.length = 0;
  await typeInto(`[aria-label="Nomor sesi baru Jumat PSI"]`, String(freeC));
  await typeInto(`[aria-label="Jam mulai sesi baru Jumat PSI"]`, "2230");
  await typeInto(`[aria-label="Jam selesai sesi baru Jumat PSI"]`, "22:40");
  for (const type of ["keyDown", "keyUp"])
    await send("Input.dispatchKeyEvent", {
      type,
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
      ...(type === "keyDown" && { text: "\r" }),
    });
  const added = await waitFor(
    bodyHas(`${label(freeC, "FRIDAY")} berhasil ditambahkan`),
    8000,
  );
  check(
    "  Enter langsung dari kotak jam: dikirim sebagai 22.30–22.40 untuk Jumat PSI dan tersimpan",
    added &&
      posts.length === 1 &&
      posts[0].startAt === "22.30" &&
      posts[0].endAt === "22.40" &&
      posts[0].room === "PSI" &&
      posts[0].day === "FRIDAY",
    JSON.stringify({ added, posts }),
  );

  section("Kunci selama menyimpan");
  await typeInto(`[aria-label="Nomor sesi baru Jumat PSI"]`, String(freeD));
  await typeInto(`[aria-label="Jam mulai sesi baru Jumat PSI"]`, "22.45");
  await typeInto(`[aria-label="Jam selesai sesi baru Jumat PSI"]`, "22.55");
  await network(1500);
  await realClick(button("Tambah Sesi", `document.querySelector("${CARD}")`));
  await sleep(300);
  const addLocked = await evaluate(
    `[...document.querySelectorAll("${CARD} form input")].map((input) => input.matches(":disabled"))`,
  );
  await waitFor(
    bodyHas(`${label(freeD, "FRIDAY")} berhasil ditambahkan`),
    15000,
  );
  await network(0);
  await choose("Hari", "Senin");
  await waitFor(`!!${ubah(renamed)}`, 8000);
  await network(1500);
  await realClick(ubah(renamed));
  await sleep(300);
  await realClick(button("Simpan"));
  await sleep(300);
  const editLocked = await evaluate(`(() => {
    const form = document.querySelector('[aria-label="Jam mulai ${renamed}"]')?.closest("form");
    if (!form) return null;
    return [...form.querySelectorAll("input"), ...[...form.querySelectorAll("button")].filter((b) => b.innerText.trim() === "Batal")].map((el) => el.matches(":disabled"));
  })()`);
  await sleep(4000);
  await network(0);
  check(
    "isian Tambah Sesi (termasuk centang hari) serta isian dan Batal di form Ubah terkunci selama menyimpan",
    addLocked.length === 7 &&
      addLocked.every(Boolean) &&
      !!editLocked &&
      editLocked.length === 4 &&
      editLocked.every(Boolean),
    JSON.stringify({ addLocked, editLocked }),
  );

  section("Pesan dan baris berubah bersamaan");
  const moved = label(freeH);
  await realClick(ubah(renamed));
  await sleep(300);
  await typeInto(`[aria-label="Nomor ${renamed}"]`, String(freeH));
  await network(1500);
  await realClick(button("Simpan"));
  const together = await evaluate(`new Promise((resolve) => {
    const started = Date.now();
    const tick = () => {
      const message = [...document.querySelectorAll("${CARD} [role=status]")].some((el) => el.innerText.includes(${JSON.stringify(`${moved} berhasil diperbarui`)}));
      if (message) return resolve({ row: !!${ubah(moved)}, old: !!${ubah(renamed)}, ms: Date.now() - started });
      if (Date.now() - started > 15000) return resolve(null);
      setTimeout(tick, 20);
    };
    tick();
  })`);
  await network(0);
  check(
    "jaringan lambat: pesan berhasil muncul bersamaan dengan baris yang sudah berganti nomor",
    !!together && together.row && !together.old,
    JSON.stringify(together),
  );

  section("Memuat dan gagal");
  await network(1500);
  await browser.navigate(PAGE, { waitForLoad: false });
  const loading = await waitFor(
    `location.pathname === "${PAGE}" && [...document.querySelectorAll("section p")].filter((p) => p.innerText.trim() === "Loading...").length === 1`,
    20000,
  );
  const emptyWhileLoading = await evaluate(bodyHas(BELUM_ADA));
  await network(0);
  check(
    "saat memuat kartunya menulis Loading..., bukan Belum ada sesi",
    loading && !emptyWhileLoading,
    JSON.stringify({ loading, emptyWhileLoading }),
  );
  mode = "fail";
  await browser.navigate(PAGE);
  const failed = await waitFor(
    bodyHas("Tidak dapat terhubung ke server"),
    20000,
  );
  await sleep(500);
  const emptyWhileFailed = await evaluate(bodyHas(BELUM_ADA));
  mode = "normal";
  const event = await call("POST", "/session", {
    token,
    body: {
      room: "PSI",
      day: "MONDAY",
      number: freeE,
      startAt: "23.00",
      endAt: "23.10",
    },
  });
  const recovered = await waitFor(
    `!${bodyHas("Tidak dapat terhubung ke server")} && !!${ubah(label(freeE))}`,
    10000,
  );
  check(
    "server gagal: tanpa Belum ada sesi; pesan gagal hilang sendiri saat data berhasil dimuat lagi",
    failed && !emptyWhileFailed && event.code === 201 && recovered,
    JSON.stringify({ failed, emptyWhileFailed, event: event.code, recovered }),
  );
  check(
    "halaman tanpa error JavaScript",
    browser.exceptions.length === 0,
    JSON.stringify(browser.exceptions),
  );
  await send("Emulation.clearDeviceMetricsOverride");
});
