import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";

/** Requeue a FAILED entry + audit it — one transaction, never partial. */
export async function retryOutboxEntry(id: string, actorId: string) {
  const row = await db.notificationOutbox.findUnique({ where: { id } });
  if (!row) return null;
  if (row.status !== "FAILED") throw new Error("Only failed entries can be retried");
  return db.$transaction(async (tx) => {
    const updated = await tx.notificationOutbox.update({
      where: { id },
      data: { status: "PENDING", attempts: 0, nextAttemptAt: new Date(), lastError: null },
    });
    await insertAuditEntry(
      {
        actorId,
        action: "admin.outbox-retried",
        entityType: "notification-outbox",
        entityId: id,
        metadata: { to: row.to, type: row.type },
      },
      tx,
    );
    return { ...updated, status: updated.status.toLowerCase() };
  }, { timeout: 10_000 });
}
