import { db } from "../../../db/client";

/**
 * Conditional re-lease for crash recovery: only the single winner proceeds.
 * The WHERE guard (still IN_PROGRESS + lease past as of `now`) makes
 * concurrent recoveries safe — losers see count 0 and get a 409 instead.
 */
export async function refreshReservedRecord(
  id: string,
  fingerprint: string,
  leaseExpiresAt: Date,
  now: Date,
) {
  const refreshed = await db.idempotencyRecord.updateMany({
    where: { id, status: "IN_PROGRESS", leaseExpiresAt: { lte: now } },
    data: { fingerprint, leaseExpiresAt },
  });
  return refreshed.count === 1;
}
