import { spawn } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const BACKEND = resolve(ROOT, process.env.SILAB_BACKEND ?? "../silab-backend");

const readEnvFile = (file) => {
  try {
    return Object.fromEntries(
      readFileSync(file, "utf8")
        .split("\n")
        .map((line) => /^\s*([\w.]+)\s*=\s*(.*?)\s*$/.exec(line))
        .filter(Boolean)
        .map(([, key, value]) => [key, value.replace(/^["']|["']$/g, "")]),
    );
  } catch {
    return {};
  }
};

const webApi = readEnvFile(join(ROOT, ".env.local")).NEXT_PUBLIC_BASE_URL;
if (webApi && !process.env.SILAB_API) process.env.SILAB_API = webApi;

if (!existsSync(join(BACKEND, "tests/bantuan/data.mjs"))) {
  console.error(
    `Repo silab-backend tidak ditemukan di ${BACKEND}.\n` +
      "Tes web memakai alat bantu data uji dari repo backend. Letakkan kedua repo bersebelahan, atau atur lokasinya lewat SILAB_BACKEND.",
  );
  process.exit(1);
}

const backend = (file) =>
  import(pathToFileURL(join(BACKEND, "tests/bantuan", file)).href);
export const { db, jwt, snapshotRealData, TestData } =
  await backend("data.mjs");
export const { API, call, check, expect, finish, runSuite, section, sleep } =
  await backend("uji.mjs");

export const WEB = (process.env.SILAB_WEB ?? "http://localhost:3001").replace(
  /\/$/,
  "",
);
const API_PATTERN = `*${new URL(API).host}/*`;
const CHROME =
  process.env.CHROME ??
  (process.platform === "darwin"
    ? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    : "google-chrome");

export const bodyHas = (text) =>
  `document.body.innerText.includes(${JSON.stringify(text)})`;
export const json = (status, body) => ({ status, body });

export const ensureReachable = async (url, hint) => {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(60000) });
    if (res.status < 500) return;
  } catch {}
  console.error(`${hint} tidak bisa dihubungi di ${url}.`);
  process.exit(1);
};

const launchChrome = async () => {
  const profile = mkdtempSync(join(tmpdir(), "silab-uji-chrome-"));
  const chrome = spawn(
    CHROME,
    [
      "--headless=new",
      "--remote-debugging-port=0",
      `--user-data-dir=${profile}`,
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,1000",
      "about:blank",
    ],
    { stdio: "ignore" },
  );
  chrome.on("error", () => {});
  const portFile = join(profile, "DevToolsActivePort");
  for (let i = 0; i < 100; i++) {
    if (existsSync(portFile)) {
      const [port] = readFileSync(portFile, "utf8").split("\n");
      if (port) {
        try {
          const targets = await fetch(
            `http://127.0.0.1:${port}/json/list`,
          ).then((r) => r.json());
          const page = targets.find((t) => t.type === "page");
          if (page) return { chrome, profile, url: page.webSocketDebuggerUrl };
        } catch {}
      }
    }
    await sleep(200);
  }
  chrome.kill();
  rmSync(profile, { recursive: true, force: true });
  throw new Error(
    `Chrome tidak bisa dijalankan dari ${CHROME}. Atur lokasinya lewat CHROME.`,
  );
};

export const openBrowser = async () => {
  const { chrome, profile, url } = await launchChrome();
  const ws = new WebSocket(url);
  await new Promise((done) =>
    ws.addEventListener("open", done, { once: true }),
  );
  let nextId = 0;
  const pending = new Map();
  let interceptor = null;
  const browser = {
    exceptions: [],
    consoleErrors: [],
    downloads: join(profile, "unduhan"),
  };

  const send = (method, params = {}) =>
    new Promise((done, fail) => {
      const id = ++nextId;
      pending.set(id, { done, fail });
      ws.send(JSON.stringify({ id, method, params }));
    });

  const answer = async ({ requestId, request }) => {
    const decision = interceptor?.(request);
    if (!decision) return send("Fetch.continueRequest", { requestId });
    if (decision.fail)
      return send("Fetch.failRequest", {
        requestId,
        errorReason: decision.fail,
      });
    return send("Fetch.fulfillRequest", {
      requestId,
      responseCode: decision.status,
      responseHeaders: [
        { name: "Content-Type", value: "application/json" },
        { name: "Access-Control-Allow-Origin", value: "*" },
      ],
      body: Buffer.from(JSON.stringify(decision.body)).toString("base64"),
    });
  };

  ws.addEventListener("message", ({ data }) => {
    const msg = JSON.parse(data);
    if (msg.id && pending.has(msg.id)) {
      const { done, fail } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) fail(new Error(msg.error.message));
      else done(msg.result);
      return;
    }
    if (msg.method === "Fetch.requestPaused")
      answer(msg.params).catch(() => {});
    if (msg.method === "Runtime.exceptionThrown")
      browser.exceptions.push(
        msg.params.exceptionDetails.exception?.description?.split("\n")[0] ??
          msg.params.exceptionDetails.text,
      );
    if (
      msg.method === "Runtime.consoleAPICalled" &&
      msg.params.type === "error"
    )
      browser.consoleErrors.push(
        msg.params.args
          .map((arg) => arg.value ?? arg.description ?? "")
          .join(" ")
          .slice(0, 300),
      );
  });

  const evaluate = async (expression) => {
    const { result, exceptionDetails } = await send("Runtime.evaluate", {
      expression,
      awaitPromise: true,
      returnByValue: true,
    });
    if (exceptionDetails)
      throw new Error(exceptionDetails.exception?.description ?? "eval gagal");
    return result.value;
  };

  const waitFor = async (expression, timeout = 10000) => {
    const end = Date.now() + timeout;
    while (Date.now() < end) {
      try {
        if (await evaluate(expression)) return true;
      } catch {}
      await sleep(150);
    }
    return false;
  };

  const navigate = async (path) => {
    await send("Page.navigate", {
      url: path.startsWith("http") ? path : `${WEB}${path}`,
    });
    await waitFor(`document.readyState === "complete"`, 30000);
  };

  const realClick = async (elementExpression) => {
    const box = await evaluate(`(() => {
      const el = ${elementExpression};
      if (!el) return null;
      el.scrollIntoView({ block: "center" });
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`);
    if (!box) return false;
    for (const type of ["mouseMoved", "mousePressed", "mouseReleased"])
      await send("Input.dispatchMouseEvent", {
        type,
        x: box.x,
        y: box.y,
        button: "left",
        clickCount: 1,
      });
    return true;
  };

  const pressEscape = async () => {
    for (const type of ["keyDown", "keyUp"])
      await send("Input.dispatchKeyEvent", {
        type,
        key: "Escape",
        code: "Escape",
        windowsVirtualKeyCode: 27,
      });
    await sleep(300);
  };

  const visibleButton = (text) =>
    `[...document.querySelectorAll("button")].find((b) => b.innerText.trim() === ${JSON.stringify(text)} && b.getBoundingClientRect().width > 0)`;

  const fillLogin = (nim, password) =>
    evaluate(`(() => {
      const set = (el, value) => {
        Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, value);
        el.dispatchEvent(new Event("input", { bubbles: true }));
      };
      set(document.querySelector('input[placeholder="NIM / NIY"]'), ${JSON.stringify(nim)});
      set(document.querySelector('input[placeholder="Password"]'), ${JSON.stringify(password)});
      document.querySelector('button[type="submit"]').click();
      return true;
    })()`);

  const openLogin = async () => {
    await navigate("/auth");
    await waitFor(
      `!!document.querySelector('input[placeholder="NIM / NIY"]')`,
      30000,
    );
    await sleep(800);
  };

  const login = async (user, password) => {
    for (let attempt = 0; attempt < 3; attempt++) {
      await openLogin();
      await fillLogin(user.nim, password);
      if (await waitFor(`location.pathname.startsWith("/dashboard")`, 15000))
        return true;
    }
    return false;
  };

  const typeInto = async (selector, text) => {
    await evaluate(
      `(() => { const el = document.querySelector(${JSON.stringify(selector)}); el.focus(); el.select(); })()`,
    );
    await send("Input.insertText", { text });
    await sleep(200);
    return evaluate(
      `document.querySelector(${JSON.stringify(selector)}).value`,
    );
  };

  const cookie = async (name) =>
    (await send("Network.getCookies", { urls: [WEB] })).cookies.find(
      (c) => c.name === name,
    );

  Object.assign(browser, {
    send,
    evaluate,
    waitFor,
    navigate,
    realClick,
    pressEscape,
    visibleButton,
    clickText: (text) => realClick(visibleButton(text)),
    typeInto,
    fillLogin,
    openLogin,
    login,
    cookie,
    setCookie: (name, value) =>
      send("Network.setCookie", { name, value, url: WEB, path: "/" }),
    intercept: async (handler) => {
      interceptor = handler;
      await send("Fetch.enable", {
        patterns: [{ urlPattern: API_PATTERN, requestStage: "Request" }],
      });
    },
    resetErrors: () => {
      browser.exceptions.length = 0;
      browser.consoleErrors.length = 0;
    },
    close: async () => {
      ws.close();
      chrome.kill();
      await sleep(300);
      rmSync(profile, { recursive: true, force: true });
    },
  });

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Network.enable");
  await send("Page.setDownloadBehavior", {
    behavior: "allow",
    downloadPath: browser.downloads,
  });
  return browser;
};

export const runWebTest = async (title, data, body) => {
  console.log(`== ${title}`);
  await ensureReachable(`${API}/`, "Backend");
  await ensureReachable(`${WEB}/auth`, "Web");
  const realBefore = await snapshotRealData();
  let browser;
  try {
    await data.start();
    browser = await openBrowser();
    await body(browser);
  } catch (error) {
    check("tes berjalan sampai selesai", false, error.stack ?? error.message);
  } finally {
    await browser?.close();
    await finish(data, realBefore);
  }
};
