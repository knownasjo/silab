import { getRequestToken, refreshOnce } from "../satellite";

const RETRY_BASE_MS = 1_000;
const RETRY_MAX_MS = 30_000;
const IDLE_TIMEOUT_MS = 60_000;
const EXPIRED_TOKEN_MESSAGE = "jwt expired";
const CHANGE_EVENTS = new Set(["ready", "meeting", "attendance"]);

const wait = (ms: number, signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    if (signal.aborted) return resolve();

    const timer = setTimeout(resolve, ms);

    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer);
        resolve();
      },
      { once: true },
    );
  });

async function connect(classId: string, signal: AbortSignal) {
  const open = (token?: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/class/${classId}/events`, {
      headers: {
        Accept: "text/event-stream",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: "no-store",
      signal,
    });

  let response = await open(await getRequestToken());

  if (!response.ok) {
    const message = (await response.json().catch(() => null))?.message;
    const token =
      message === EXPIRED_TOKEN_MESSAGE ? await refreshOnce() : undefined;

    if (token) response = await open(token);
  }

  if (!response.ok || !response.body) {
    throw new Error(`HTTP ${response.status}`);
  }

  return response.body;
}

async function readEvents(
  body: ReadableStream<Uint8Array>,
  onEvent: (type: string) => void,
) {
  const reader = body.pipeThrough(new TextDecoderStream()).getReader();
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  let buffer = "";

  const resetIdleTimer = () => {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => reader.cancel(), IDLE_TIMEOUT_MS);
  };

  try {
    for (resetIdleTimer(); ; resetIdleTimer()) {
      const { value, done } = await reader.read();

      if (done) return;

      buffer += value;

      let boundary: number;
      while ((boundary = buffer.indexOf("\n\n")) !== -1) {
        const type = buffer.slice(0, boundary).match(/^event: ?(.*)$/m)?.[1];
        buffer = buffer.slice(boundary + 2);

        if (type) onEvent(type);
      }
    }
  } finally {
    clearTimeout(idleTimer);
  }
}

export function watchClassEvents(
  classId: string,
  onChange: () => void,
): () => void {
  const controller = new AbortController();
  const { signal } = controller;

  (async () => {
    let failures = 0;

    while (!signal.aborted) {
      try {
        const body = await connect(classId, signal);

        await readEvents(body, (type) => {
          failures = 0;
          if (CHANGE_EVENTS.has(type)) onChange();
        });
      } catch {
        if (signal.aborted) return;
        failures += 1;
      }

      await wait(Math.min(RETRY_BASE_MS * 2 ** failures, RETRY_MAX_MS), signal);
    }
  })();

  return () => controller.abort();
}
