import { db } from "../../../db/client";
import { StaleRefreshTokenError } from "../errors/stale-refresh-token-error";

/** Revoke-old + insert-next atomically. */
export async function rotateSessionRow(input: {
  currentHash: string;
  nextHash: string;
  nextExpiresAt: Date;
}) {
  const existing = await db.session.findUnique({ where: { refreshHash: input.currentHash } });
  if (!existing) throw new StaleRefreshTokenError();
  if (existing.revokedAt || existing.expiresAt <= new Date()) {
    await db.session.updateMany({
      where: { userId: existing.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw new StaleRefreshTokenError();
  }
  const created = await db.$transaction(async (tx) => {
    const revoked = await tx.session.updateMany({
      where: { id: existing.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    if (revoked.count !== 1) throw new StaleRefreshTokenError();
    return tx.session.create({
      data: {
        userId: existing.userId,
        refreshHash: input.nextHash,
        expiresAt: input.nextExpiresAt,
      },
      select: { id: true },
    });
  }, { timeout: 10_000 });
  return { sessionId: created.id, userId: existing.userId };
}
