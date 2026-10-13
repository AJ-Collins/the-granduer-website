import { db } from "../../../db/client";
import { mayRetry } from "../../services/backoff/may-retry";
import { nextAttemptAt } from "../../services/backoff/next-attempt-at";

export async function markOutboxFailed(id: string, attempts: number, error: string) {
  const message = error.slice(0, 500);
  if (mayRetry(attempts)) {
    await db.notificationOutbox.update({
      where: { id },
      data: { status: "PENDING", attempts, nextAttemptAt: nextAttemptAt(attempts), lastError: message },
    });
  } else {
    await db.notificationOutbox.update({
      where: { id },
      data: { status: "FAILED", attempts, lastError: message },
    });
  }
}
