import { db } from "../../db/client";
import { sendMail } from "../../email/services/send-mail";
import { mayRetry, nextAttemptAt, stuckSendingBefore } from "./outbox-backoff";

const BATCH_SIZE = 25;

type ClaimedRow = {
  id: string;
  to: string;
  subject: string;
  text: string;
  html: string | null;
  attempts: number;
};

/**
 * Claims due rows (SKIP LOCKED — N pollers share safely), sends each, marks
 * SENT or requeues with backoff; FAILED after OUTBOX_MAX_ATTEMPTS.
 * A crash between send and mark can duplicate a mail — acceptable for
 * ack/reset content; rows stuck SENDING are reclaimed after 5 minutes.
 */
export async function dispatchDueNotifications(): Promise<{ sent: number; failed: number }> {
  const claimed = await db.$queryRaw<ClaimedRow[]>`
    UPDATE "NotificationOutbox"
    SET status = 'SENDING', "updatedAt" = now()
    WHERE id IN (
      SELECT id FROM "NotificationOutbox"
      WHERE (status = 'PENDING' AND "nextAttemptAt" <= now())
         OR (status = 'SENDING' AND "updatedAt" < ${stuckSendingBefore()}::timestamptz)
      ORDER BY "nextAttemptAt"
      LIMIT ${BATCH_SIZE}
      FOR UPDATE SKIP LOCKED
    )
    RETURNING id, "to", subject, text, html, attempts`;
  let sent = 0;
  let failed = 0;
  for (const row of claimed) {
    try {
      await sendMail({ to: row.to, subject: row.subject, text: row.text, ...(row.html && { html: row.html }) });
      await db.notificationOutbox.update({
        where: { id: row.id },
        data: { status: "SENT", sentAt: new Date(), lastError: null },
      });
      sent += 1;
    } catch (e) {
      const attempts = row.attempts + 1;
      const message = e instanceof Error ? e.message.slice(0, 500) : "Unknown send error";
      await db.notificationOutbox.update({
        where: { id: row.id },
        data: mayRetry(attempts)
          ? { status: "PENDING", attempts, nextAttemptAt: nextAttemptAt(attempts), lastError: message }
          : { status: "FAILED", attempts, lastError: message },
      });
      failed += 1;
    }
  }
  return { sent, failed };
}
