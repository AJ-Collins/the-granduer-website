import { db } from "../../../db/client";
import { generateRefreshToken } from "../../services/tokens/generate-refresh-token";
import { hashRefreshToken } from "../../services/tokens/hash-refresh-token";
import { REFRESH_TOKEN_TTL_SECONDS } from "../../services/sessions/refresh-token-ttl";

import { StaleRefreshTokenError } from "../errors/stale-refresh-token-error";
/** Revoke-old + insert-next atomically; concurrent refreshes cannot both win. */
export async function rotateSessionRow(refreshToken: string) {
  const hash = hashRefreshToken(refreshToken);
  const existing = await db.session.findUnique({ where: { refreshHash: hash } });
  if (!existing) throw new StaleRefreshTokenError();
  if (existing.revokedAt || existing.expiresAt <= new Date()) {
    await db.session.updateMany({
      where: { userId: existing.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw new StaleRefreshTokenError();
  }
  const next = generateRefreshToken();
  const created = await db.$transaction(async (tx) => {
    const revoked = await tx.session.updateMany({
      where: { id: existing.id, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    if (revoked.count !== 1) throw new StaleRefreshTokenError();
    return tx.session.create({
      data: {
        userId: existing.userId,
        refreshHash: hashRefreshToken(next),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
      },
      select: { id: true },
    });
  }, { timeout: 10_000 });
  return { sessionId: created.id, refreshToken: next, userId: existing.userId };
}
