import {
  check,
  db,
  json,
  runWebTest,
  section,
  sleep,
  TestData,
} from "./bantuan/browser.mjs";

const data = new TestData("54");
const BUSY = "Server sedang sibuk, silakan coba lagi sebentar lagi.";
const MESSAGES = [
  "Data akun gagal dimuat",
  "Daftar dosen gagal dimuat",
  "Tidak dapat terhubung ke server",
  "Server sedang sibuk",
];
const WITHOUT_DATA = [
  "/dashboard/pengumuman/add-pengumuman",
  "/dashboard/profil",
];

await runWebTest(
  "Semua halaman saat server mati atau sibuk",
  data,
  async (browser) => {
    const subject = await data.subject("Uji Server Mati");
    const cls = await data.classOf(subject, "A", "MONDAY", 1);
    const announcement = await db.mst_announcement.create({
      data: {
        type: "BASIC",
        title: "Uji Server Mati",
        body: "sementara",
        author: data.laboran.id,
      },
    });
    const pages = [
      "/dashboard",
      "/dashboard/praktikum",
      `/dashboard/praktikum/${cls.id}`,
      `/dashboard/praktikum/recap-attendances?classId=${cls.id}`,
      "/dashboard/praktikum/tambah-praktikum",
      "/dashboard/master-data/pembayaran",
      "/dashboard/master-data/jam-sesi",
      "/dashboard/master-data/add-subject",
      "/dashboard/pengumuman/list-pengumuman",
      `/dashboard/pengumuman/${announcement.id}`,
      "/dashboard/pengumuman/add-pengumuman",
      "/dashboard/profil",
    ];
    let mode = "normal";
    await browser.intercept((request) => {
      if (mode === "normal" || request.method === "OPTIONS") return;
      const path = new URL(request.url).pathname;
      if (mode === "busy")
        return path === "/auth/me" || path === "/events"
          ? undefined
          : json(503, { status: false, message: BUSY });
      return { fail: "ConnectionRefused" };
    });

    check("login laboran", await browser.login(data.laboran, data.password));
    for (const page of pages) {
      await browser.navigate(page);
      await sleep(3000);
    }

    const inspect = async (page, current) => {
      mode = "normal";
      await browser.navigate("/dashboard/segera-hadir");
      await sleep(500);
      browser.resetErrors();
      mode = current;
      await browser.navigate(page);
      await sleep(7000);
      const view = await browser.evaluate(`(() => {
      const text = document.body.innerText;
      return {
        path: location.pathname,
        crashed: text.includes("Application error") || [...document.querySelectorAll("nextjs-portal")].some((p) => /Runtime Error|Unhandled/.test(p.shadowRoot?.textContent ?? "")),
        loading: /Loading\\.\\.\\./.test(text),
        messages: ${JSON.stringify(MESSAGES)}.filter((m) => text.includes(m)),
      };
    })()`);
      return { ...view, exceptions: [...new Set(browser.exceptions)] };
    };

    for (const [label, current, expected] of [
      [
        "Server mati total (tidak bisa dihubungi)",
        "down",
        "Tidak dapat terhubung ke server",
      ],
      [
        "Server sibuk (503), data akun tetap termuat",
        "busy",
        "Server sedang sibuk",
      ],
    ]) {
      section(label);
      for (const page of pages) {
        const view = await inspect(page, current);
        const withMessage = current === "down" || !WITHOUT_DATA.includes(page);
        check(
          `${page.replace(/[0-9a-f-]{36}/, ":id")}: tidak rusak${withMessage ? `, pesan "${expected}" tampil` : ""}`,
          !view.crashed &&
            !view.loading &&
            view.exceptions.length === 0 &&
            view.path === page.split("?")[0] &&
            (!withMessage || view.messages.includes(expected)),
          JSON.stringify(view),
        );
      }
    }
  },
);
