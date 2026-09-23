export function coalesce<A extends unknown[]>(
  task: (...args: A) => Promise<unknown>,
): (...args: A) => Promise<void> {
  const pending = new Map<string, { queued: boolean }>();

  return async (...args: A) => {
    const key = JSON.stringify(args);
    const running = pending.get(key);

    if (running) {
      running.queued = true;
      return;
    }

    const entry = { queued: false };
    pending.set(key, entry);

    try {
      do {
        entry.queued = false;
        await task(...args).catch(() => undefined);
      } while (entry.queued);
    } finally {
      pending.delete(key);
    }
  };
}
