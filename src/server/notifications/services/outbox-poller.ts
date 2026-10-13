import { dispatchDueNotifications } from "./dispatch-due-notifications";

const POLL_MS = 10_000;
const key = "__dgrandeur_outbox_poller__";

/** In-process poller for single-image deploys. N instances share via SKIP LOCKED. */
export function startOutboxPoller(): void {
  const global = globalThis as unknown as Record<string, boolean>;
  if (global[key]) return;
  global[key] = true;
  setInterval(() => {
    dispatchDueNotifications().catch((e) => {
      console.warn("[outbox] dispatch failed, next poll retries", e);
    });
  }, POLL_MS).unref?.();
}
