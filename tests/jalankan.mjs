import { fileURLToPath } from "node:url";
import { API, ensureReachable, runSuite, WEB } from "./bantuan/browser.mjs";

await runSuite(
  fileURLToPath(new URL(".", import.meta.url)),
  process.argv.slice(2),
  async () => {
    await ensureReachable(`${API}/`, "Backend");
    await ensureReachable(`${WEB}/auth`, "Web");
  },
);
