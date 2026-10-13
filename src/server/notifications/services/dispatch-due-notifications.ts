import { sendMail } from "../../email/services/send-mail";
import { claimDueEntries } from "../persistence/transactions/claim-due-entries";
import { markOutboxFailed } from "../persistence/queries/mark-outbox-failed";
import { markOutboxSent } from "../persistence/queries/mark-outbox-sent";

/**
 * Orchestration only — queries live in persistence/queries, flows in
 * persistence/transactions. Sending stays OUTSIDE any DB transaction.
 */
export async function dispatchDueNotifications(): Promise<{ sent: number; failed: number }> {
  const claimed = await claimDueEntries(25);
  let sent = 0;
  let failed = 0;
  for (const row of claimed) {
    try {
      await sendMail({
        to: row.to,
        subject: row.subject,
        text: row.text,
        ...(row.html && { html: row.html }),
      });
      await markOutboxSent(row.id);
      sent += 1;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Unknown send error";
      await markOutboxFailed(row.id, row.attempts + 1, message);
      failed += 1;
    }
  }
  return { sent, failed };
}
