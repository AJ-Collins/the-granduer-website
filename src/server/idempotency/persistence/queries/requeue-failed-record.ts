import { db } from "../../../db/client";

/**
 * Requeue a terminal FAILED row for retry. No lease check: failure is
 * terminal, so any same-fingerprint retry is a deliberate new attempt.
 * Conditional on status so concurrent requeues still elect one winner.
 */
export async function requeueFailedRecord(
  id: string,
  fingerprint: string,
  leaseExpiresAt: Date,
) {
  const requeued = await db.idempotencyRecord.updateMany({
    where: { id, status: "FAILED" },
    data: { status: "IN_PROGRESS", fingerprint, leaseExpiresAt, lastError: null },
  });
  return requeued.count === 1;
}
