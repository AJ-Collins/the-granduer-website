export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startOutboxPoller } = await import("./server/notifications/services/outbox-poller");
    startOutboxPoller();
  }
}
