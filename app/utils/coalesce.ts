export function coalesce<A extends unknown[]>(
  task: (...args: A) => Promise<unknown>,
): (...args: A) => Promise<void> {
  const pending = new Map<string, { queued: boolean; done: Promise<void> }>();

  return (...args: A) => {
    const key = JSON.stringify(args);
    const running = pending.get(key);

    if (running) {
      running.queued = true;
      return running.done;
    }

    const entry = { queued: false, done: Promise.resolve() };
    pending.set(key, entry);

    entry.done = (async () => {
      try {
        do {
          entry.queued = false;
          await task(...args).catch(() => undefined);
        } while (entry.queued);
      } finally {
        pending.delete(key);
      }
    })();

    return entry.done;
  };
}
