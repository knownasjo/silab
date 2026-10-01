import {
  bodyHas,
  call,
  check,
  db,
  json,
  runWebTest,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("64");

const cardsScript = `[...document.querySelectorAll("main div.rounded-3xl")]
  .filter((card) => card.querySelector("p")?.nextElementSibling)
  .map((card) => ({
    number: card.firstElementChild.innerText.replace(/\\s+/g, " ").trim(),
    title: card.lastElementChild.firstElementChild.innerText.trim(),
  }))`;

const layoutScript = `(() => {
  const cards = [...document.querySelectorAll("main div.rounded-3xl")].filter(
    (card) => card.querySelector("p")?.nextElementSibling,
  );
  const inside = (outer, inner) =>
    inner.left >= outer.left - 1 && inner.right <= outer.right + 1 &&
    inner.top >= outer.top - 1 && inner.bottom <= outer.bottom + 1;
  const problems = [];
  const rects = cards.map((card) => card.getBoundingClientRect());
  cards.forEach((card, i) => {
    const number = card.firstElementChild;
    const range = document.createRange();
    range.selectNodeContents(number);
    const height = number.getBoundingClientRect().height;
    if (height > 1.6 * parseFloat(getComputedStyle(number).fontSize)) problems.push("angka kartu " + (i + 1) + " lebih dari satu baris");
    const text = range.getBoundingClientRect();
    if (!inside(rects[i], text)) problems.push("angka kartu " + (i + 1) + " keluar kartu");
    for (const p of card.querySelectorAll("p")) {
      const r = document.createRange();
      r.selectNodeContents(p);
      if (!inside(rects[i], r.getBoundingClientRect()))
        problems.push("tulisan '" + p.innerText.trim().slice(0, 20) + "' keluar kartu " + (i + 1));
    }
    rects.forEach((other, j) => {
      if (j > i && !(other.left >= rects[i].right || other.right <= rects[i].left || other.top >= rects[i].bottom || other.bottom <= rects[i].top))
        problems.push("kartu " + (i + 1) + " menimpa kartu " + (j + 1));
    });
  });
  const title = [...document.querySelectorAll("main p")].find((p) => p.innerText.startsWith("Selamat datang"));
  const below = [...document.querySelectorAll("main p")].find((p) => p.innerText.startsWith("Periode aktif"));
  const subtitle = title.nextElementSibling.getBoundingClientRect();
  if (subtitle.bottom > below.getBoundingClientRect().top)
    problems.push("judul sambutan menimpa tulisan Periode aktif");
  const main = document.querySelector("main");
  if (main.scrollWidth > main.clientWidth) problems.push("halaman bisa digeser ke samping");
  return { count: cards.length, problems };
})()`;

await runWebTest("Dashboard", data, async (browser) => {
  const { evaluate, waitFor, send } = browser;

  const subjectA = await data.subject("Uji Dashboard A");
  const subjectB = await data.subject("Uji Dashboard B");
  await data.subject("Uji Dashboard C");
  const classA1 = await data.classOf(subjectA, "A", "MONDAY", 1);
  const classA2 = await data.classOf(subjectA, "B", "TUESDAY", 1);
  const classB1 = await data.classOf(subjectB, "A", "WEDNESDAY", 1);
  const assistant = await data.student("Asisten Dashboard");
  for (const cls of [classA1, classA2, classB1])
    await db.trn_class_collaborator.create({
      data: { userId: assistant.id, classId: cls.id },
    });
  const [s1, s2] = await data.students(2);
  await data.activate(s1, subjectA, true);
  await data.activate(s1, subjectB, false);
  const pending = await data.activate(s2, subjectA, false);

  const token = (
    await call("POST", "/auth/login", {
      body: { nim: data.laboran.nim, password: data.password },
    })
  ).json.data.accessToken;
  const count = async (path) =>
    (await call("GET", path, { token })).json.data.length;
  const expected = async () => {
    const activations = (await call("GET", "/activation", { token })).json.data;
    const paid = activations.filter((activation) => activation.status).length;
    return [
      { number: `${await count("/subject")}`, title: "Jumlah Praktikum" },
      { number: `${await count("/class")}`, title: "Jumlah Kelas" },
      {
        number: `${paid} / ${activations.length}`,
        title: "Jumlah Mahasiswa",
      },
      {
        number: `${activations.length - paid} / ${activations.length}`,
        title: "Jumlah Mahasiswa",
      },
    ];
  };
  const cardsMatch = (cards) =>
    `JSON.stringify(${cardsScript}) === ${JSON.stringify(JSON.stringify(cards))}`;

  let fake = false;
  let activationRequests = 0;
  let subjectRequests = 0;
  await browser.intercept((request) => {
    if (request.method !== "GET") return;
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "");
    if (path === "/activation") activationRequests++;
    if (path === "/subject") subjectRequests++;
    if (!fake) return;
    const list = (length, item = () => ({})) =>
      json(200, {
        status: true,
        message: "Berhasil",
        data: Array.from({ length }, (_, i) => ({ id: `${i}`, ...item(i) })),
      });
    if (path === "/activation") {
      const status = url.searchParams.get("status");
      if (status === "true") return list(312, () => ({ status: true }));
      if (status === "false") return list(168, () => ({ status: false }));
      return list(480, (i) => ({ status: i < 312 }));
    }
    if (path === "/subject") return list(14);
    if (path === "/class") return list(48);
  });

  check("login laboran", await browser.login(data.laboran, data.password));
  await waitFor(bodyHas(data.laboran.fullname), 15000);
  await sleep(1500);

  activationRequests = 0;
  subjectRequests = 0;
  await browser.navigate("/dashboard");
  const before = await expected();
  check(
    "laboran: 4 kartu, ada Jumlah Kelas, angka sama dengan data server",
    await waitFor(cardsMatch(before), 15000),
    JSON.stringify({
      tampil: await evaluate(cardsScript),
      seharusnya: before,
    }),
  );
  await sleep(1000);
  check(
    "  sekali memuat hanya meminta daftar pendaftaran satu kali",
    subjectRequests > 0 && activationRequests === subjectRequests,
    `${activationRequests} permintaan pendaftaran untuk ${subjectRequests} kali memuat`,
  );

  await sleep(1500);
  const paidNow = await call("PUT", `/activation/${pending.id}`, {
    token,
    body: { status: true },
  });
  const after = await expected();
  check(
    "pembayaran dikonfirmasi di tempat lain: angka kartu berubah tanpa dimuat ulang",
    paidNow.code === 200 && (await waitFor(cardsMatch(after), 15000)),
    JSON.stringify({ tampil: await evaluate(cardsScript), seharusnya: after }),
  );

  fake = true;
  for (const [width, height] of [
    [1440, 900],
    [1366, 768],
    [1280, 720],
    [1024, 768],
  ]) {
    await send("Emulation.setDeviceMetricsOverride", {
      width,
      height,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await browser.navigate("/dashboard");
    await waitFor(bodyHas("312"), 15000);
    await sleep(800);
    const layout = await evaluate(layoutScript);
    check(
      `angka 312 / 480 di layar ${width}×${height}: satu baris, semua tulisan di dalam kartu`,
      layout.count === 4 && layout.problems.length === 0,
      JSON.stringify(layout),
    );
  }
  fake = false;
  await send("Emulation.clearDeviceMetricsOverride");

  await browser.navigate("/dashboard");
  await waitFor(browser.visibleButton("Sign Out"), 15000);
  await browser.clickText("Sign Out");
  await waitFor(browser.visibleButton("Keluar"), 5000);
  const dialog = await evaluate(`(() => {
    const find = (text) => [...document.querySelectorAll("button")].find((b) => b.innerText.trim() === text && b.getBoundingClientRect().width > 0);
    const cancel = find("Batal");
    const leave = find("Keluar");
    return {
      leaveColor: getComputedStyle(leave).backgroundColor,
      cancelColor: getComputedStyle(cancel).backgroundColor,
      leaveIsRight: leave.getBoundingClientRect().left > cancel.getBoundingClientRect().right,
    };
  })()`);
  check(
    "pop-up Sign Out: Keluar tombol merah di kanan, Batal tidak merah",
    dialog.leaveColor === "rgb(241, 65, 108)" &&
      dialog.cancelColor === "rgba(0, 0, 0, 0)" &&
      dialog.leaveIsRight,
    JSON.stringify(dialog),
  );
  await browser.clickText("Batal");
  await sleep(800);
  check(
    "  Batal menutup pop-up tanpa keluar",
    !(await evaluate(browser.visibleButton("Keluar"))) &&
      (await evaluate("location.pathname")) === "/dashboard",
  );

  await browser.clickText("Sign Out");
  await waitFor(browser.visibleButton("Keluar"), 5000);
  await browser.clickText("Keluar");
  await waitFor(`location.pathname === "/auth"`, 15000);

  check("login asisten", await browser.login(assistant, data.password));
  await browser.navigate("/dashboard");
  const assistantCards = [
    { number: "2", title: "Jumlah Praktikum" },
    { number: "3", title: "Jumlah Kelas Praktikum" },
  ];
  check(
    "asisten: Jumlah Praktikum hanya mata kuliah dari kelas yang ia pegang",
    await waitFor(cardsMatch(assistantCards), 15000),
    JSON.stringify(await evaluate(cardsScript)),
  );
});
