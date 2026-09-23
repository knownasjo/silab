import { getRequestToken, refreshOnce } from "../satellite";

export interface RealtimeEvent {
  type: string;
  data: {
    class_id?: string;
    meeting_id?: string;
    announcement_id?: string;
    action?: string;
  };
}

type RealtimeListener = (event: RealtimeEvent) => void;

const RETRY_BASE_MS = 1_000;
const RETRY_MAX_MS = 30_000;
const IDLE_TIMEOUT_MS = 60_000;
const STOP_DELAY_MS = 5_000;
const EXPIRED_TOKEN_MESSAGE = "jwt expired";

const listeners = new Set<RealtimeListener>();
let connection: AbortController | null = null;
let stopTimer: ReturnType<typeof setTimeout> | undefined;

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

const parseData = (raw: string | undefined): RealtimeEvent["data"] => {
  try {
    const data = JSON.parse(raw ?? "{}");
    return data && typeof data === "object" ? data : {};
  } catch {
    return {};
  }
};

const emit = (event: RealtimeEvent) =>
  listeners.forEach((listener) => queueMicrotask(() => listener(event)));

async function connect(signal: AbortSignal) {
  const open = (token?: string) =>
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/events`, {
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
  onEvent: (event: RealtimeEvent) => void,
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
        const block = buffer.slice(0, boundary);
        buffer = buffer.slice(boundary + 2);

        const type = block.match(/^event: ?(.*)$/m)?.[1];
        const data = block.match(/^data: ?(.*)$/m)?.[1];

        if (type) onEvent({ type, data: parseData(data) });
      }
    }
  } finally {
    clearTimeout(idleTimer);
  }
}

async function run(signal: AbortSignal) {
  let failures = 0;

  while (!signal.aborted) {
    try {
      const body = await connect(signal);

      await readEvents(body, (event) => {
        failures = 0;
        if (event.type !== "ping") emit(event);
      });
    } catch {
      if (signal.aborted) return;
      failures += 1;
    }

    await wait(Math.min(RETRY_BASE_MS * 2 ** failures, RETRY_MAX_MS), signal);
  }
}

export function subscribeRealtime(listener: RealtimeListener): () => void {
  listeners.add(listener);
  clearTimeout(stopTimer);

  if (!connection) {
    connection = new AbortController();
    run(connection.signal);
  }

  return () => {
    listeners.delete(listener);
    if (listeners.size > 0) return;

    clearTimeout(stopTimer);
    stopTimer = setTimeout(() => {
      connection?.abort();
      connection = null;
    }, STOP_DELAY_MS);
  };
}
