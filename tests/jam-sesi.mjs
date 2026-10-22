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
const WEEKDAY_CARD = 'section[aria-label="Jam sesi Senin–Kamis"]';
const FRIDAY_CARD = 'section[aria-label="Jam sesi Jumat"]';
const BELUM_ADA = "Belum ada sesi.";

await runWebTest("Jam Sesi", data, async (browser) => {
  const { evaluate, waitFor, send, realClick, typeInto } = browser;

  const sessions = await data.sessions();
  const first = await db.mst_session.create({
    data: {
      periodId: data.period.id,
      day_group: "WEEKDAY",
      number: data.sessionFrom + 7,
      startAt: "06.00",
      endAt: "06.40",
      created_by: data.laboran.id,
    },
  });
  const subject = await data.subject("Uji Jam Sesi Basis Data");
  await data.classOf(subject, "A", "MONDAY", 1);
  const gone = await data.classOf(subject, "B", "TUESDAY", 2);
  await db.mst_class.update({
    where: { id: gone.id },
    data: { deleted_at: new Date() },
  });
  const freeNumbers = async (day_group) => {
    const used = new Set(
      (
        await db.mst_session.findMany({
          where: { periodId: data.period.id, day_group },
          select: { number: true },
        })
      ).map((session) => session.number),
    );
    return Array.from({ length: 20 }, (_, i) => 20 - i).filter(
      (number) => !used.has(number),
    );
  };
  const [weekdayFree] = await freeNumbers("WEEKDAY");
  const [fridayFree, fridayFree2, fridayFree3] = await freeNumbers("FRIDAY");
  const label = (session, group = "Senin–Kamis") =>
    `Sesi ${session.number ?? session} ${group}`;

  let mode = "normal";
  const posts = [];
  await browser.intercept((request) => {
    const path = new URL(request.url).pathname.replace(/\/$/, "");
    if (request.method === "POST" && path === "/session")
      posts.push(JSON.parse(request.postData ?? "{}"));
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
  const open = async () => {
    await browser.navigate(PAGE);
    const ok = await waitFor(
      `!!document.querySelector('[aria-label="Ubah ${label(sessions[5])}"]')`,
      20000,
    );
    await sleep(600);
    return ok;
  };
  const button = (text, scope = "document") =>
    `[...${scope}.querySelectorAll("button")].find((b) => b.innerText.trim() === ${JSON.stringify(text)} && b.getBoundingClientRect().width > 0)`;
  const messages = (card) =>
    evaluate(
      `[...document.querySelectorAll('${card} [role="status"], ${card} [role="alert"]')].map((e) => e.innerText.trim())`,
    );

  check("login laboran", await browser.login(data.laboran, data.password));

  section("Tampilan");
  await size(1366, 768);
  check("halaman Jam Sesi terbuka", await open());
  const layout = () =>
    evaluate(`(() => {
      const card = document.querySelector('${WEEKDAY_CARD}');
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
        outside: [...card.querySelectorAll("button")].filter((b) => b.getBoundingClientRect().right > box.right + 1).length,
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

  section("Sesi yang kelasnya sudah dihapus");
  const goneRow = await evaluate(
    `[...document.querySelectorAll('${WEEKDAY_CARD} div.grid')].find((row) => row.innerText.startsWith("${label(sessions[1])}".replace(" Senin–Kamis", "")))?.innerText.replace(/\\n/g, " | ")`,
  );
  await realClick(
    `document.querySelector('[aria-label="Hapus ${label(sessions[1])}"]')`,
  );
  await sleep(300);
  await realClick(button("Ya, hapus"));
  const removed = await waitFor(
    `!document.querySelector('[aria-label="Ubah ${label(sessions[1])}"]')`,
    8000,
  );
  await waitFor(
    `!!document.querySelector('${WEEKDAY_CARD} [role="status"]')?.innerText.includes("berhasil dihapus")`,
    8000,
  );
  const top = await evaluate(`(() => {
    const card = document.querySelector('${WEEKDAY_CARD}');
    const status = card.querySelector('[role="status"]');
    return { text: status?.innerText.trim(), afterTitle: status?.previousElementSibling?.innerText.trim() === "Senin–Kamis" };
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
  await realClick(
    `document.querySelector('[aria-label="Ubah ${label(first)}"]')`,
  );
  await sleep(300);
  await typeInto(`[aria-label="Nomor ${label(first)}"]`, String(weekdayFree));
  await typeInto(`[aria-label="Jam mulai ${label(first)}"]`, "17.50");
  await typeInto(`[aria-label="Jam selesai ${label(first)}"]`, "18.10");
  await realClick(button("Simpan"));
  await waitFor(
    `!!document.querySelector('${WEEKDAY_CARD} [role="alert"]')`,
    8000,
  );
  const clash = await evaluate(`(() => {
    const form = document.querySelector('[aria-label="Jam mulai ${label(first)}"]')?.closest("form");
    const alert = form?.querySelector('[role="alert"]');
    const r = alert?.getBoundingClientRect();
    return { text: alert?.innerText.trim(), visible: !!r && r.top >= 0 && r.bottom <= innerHeight };
  })()`);
  check(
    "jam yang bertabrakan saat mengubah sesi paling atas: pesan merah di bawah form itu dan terlihat di layar",
    !!clash.text?.startsWith("Jam sesi bertabrakan dengan Sesi ") &&
      clash.visible,
    JSON.stringify(clash),
  );
  await typeInto(`[aria-label="Jam mulai ${label(first)}"]`, "06.00");
  await typeInto(`[aria-label="Jam selesai ${label(first)}"]`, "06.30");
  await realClick(button("Simpan"));
  const renamed = `Sesi ${weekdayFree} Senin–Kamis`;
  await waitFor(
    `!!document.querySelector('[aria-label="Ubah ${renamed}"]')`,
    8000,
  );
  await sleep(300);
  const saved = await evaluate(`(() => {
    const row = document.querySelector('[aria-label="Ubah ${renamed}"]').closest("div.grid").parentElement;
    const status = row.querySelector('[role="status"]');
    const r = status?.getBoundingClientRect();
    return { text: status?.innerText.trim(), visible: !!r && r.top >= 0 && r.bottom <= innerHeight };
  })()`);
  check(
    "  berhasil: pesan hijau di bawah baris itu",
    saved.text === `${renamed} berhasil diperbarui` && saved.visible,
    JSON.stringify(saved),
  );

  section("Format jam");
  const tidied = [];
  for (const [typed, expected] of [
    ["7.00", "07.00"],
    ["07:00", "07.00"],
    ["0700", "07.00"],
    ["730", "07.30"],
  ]) {
    await typeInto(`[aria-label="Jam mulai sesi baru Jumat"]`, typed);
    await evaluate(
      `document.querySelector('[aria-label="Jam mulai sesi baru Jumat"]').blur()`,
    );
    await sleep(150);
    tidied.push({
      typed,
      shown: await evaluate(
        `document.querySelector('[aria-label="Jam mulai sesi baru Jumat"]').value`,
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
  await typeInto(`[aria-label="Nomor sesi baru Jumat"]`, String(fridayFree));
  await typeInto(`[aria-label="Jam mulai sesi baru Jumat"]`, "2230");
  await typeInto(`[aria-label="Jam selesai sesi baru Jumat"]`, "22:40");
  for (const type of ["keyDown", "keyUp"])
    await send("Input.dispatchKeyEvent", {
      type,
      key: "Enter",
      code: "Enter",
      windowsVirtualKeyCode: 13,
      ...(type === "keyDown" && { text: "\r" }),
    });
  const added = await waitFor(
    bodyHas(`Sesi ${fridayFree} Jumat berhasil ditambahkan`),
    8000,
  );
  check(
    "  Enter langsung dari kotak jam: dikirim sebagai 22.30–22.40 dan tersimpan",
    added &&
      posts.length === 1 &&
      posts[0].startAt === "22.30" &&
      posts[0].endAt === "22.40",
    JSON.stringify({ added, posts }),
  );

  section("Kunci selama menyimpan");
  await typeInto(`[aria-label="Nomor sesi baru Jumat"]`, String(fridayFree2));
  await typeInto(`[aria-label="Jam mulai sesi baru Jumat"]`, "22.45");
  await typeInto(`[aria-label="Jam selesai sesi baru Jumat"]`, "22.55");
  await network(1500);
  await realClick(
    button("Tambah Sesi", `document.querySelector('${FRIDAY_CARD}')`),
  );
  await sleep(300);
  const addLocked = await evaluate(
    `[...document.querySelectorAll('${FRIDAY_CARD} form input')].map((input) => input.matches(":disabled"))`,
  );
  await waitFor(
    bodyHas(`Sesi ${fridayFree2} Jumat berhasil ditambahkan`),
    15000,
  );
  await realClick(`document.querySelector('[aria-label="Ubah ${renamed}"]')`);
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
    "isian Tambah Sesi serta isian dan Batal di form Ubah terkunci selama menyimpan",
    addLocked.length === 3 &&
      addLocked.every(Boolean) &&
      !!editLocked &&
      editLocked.length === 4 &&
      editLocked.every(Boolean),
    JSON.stringify({ addLocked, editLocked }),
  );

  section("Memuat dan gagal");
  await network(1500);
  await browser.navigate(PAGE, { waitForLoad: false });
  const loading = await waitFor(
    `location.pathname === "${PAGE}" && [...document.querySelectorAll("section p")].filter((p) => p.innerText.trim() === "Loading...").length === 2`,
    20000,
  );
  const emptyWhileLoading = await evaluate(bodyHas(BELUM_ADA));
  await network(0);
  check(
    "saat memuat kedua kartu menulis Loading..., bukan Belum ada sesi",
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
      day_group: "FRIDAY",
      number: fridayFree3,
      startAt: "23.00",
      endAt: "23.10",
    },
  });
  const recovered = await waitFor(
    `!${bodyHas("Tidak dapat terhubung ke server")} && !!document.querySelector('[aria-label="Ubah Sesi ${fridayFree3} Jumat"]')`,
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
