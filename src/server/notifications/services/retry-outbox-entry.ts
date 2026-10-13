import { db } from "../../db/client";
import { recordAudit } from "../../audit/services/record-audit";

/** Requeues a FAILED entry: attempts reset, due immediately. FAILED-only. */
export async function retryOutboxEntry(id: string, actorId: string) {
  const row = await db.notificationOutbox.findUnique({ where: { id } });
  if (!row) return null;
  if (row.status !== "FAILED") throw new Error("Only failed entries can be retried");
  const updated = await db.notificationOutbox.update({
    where: { id },
    data: { status: "PENDING", attempts: 0, nextAttemptAt: new Date(), lastError: null },
  });
  await recordAudit({
    actorId,
    action: "admin.outbox-retried",
    entityType: "notification-outbox",
    entityId: id,
    metadata: { to: row.to, type: row.type },
  });
  return { ...updated, status: updated.status.toLowerCase() };
}
