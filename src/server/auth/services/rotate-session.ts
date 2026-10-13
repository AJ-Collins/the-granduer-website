import { db } from "../../db/client";
import { generateRefreshToken } from "./generate-refresh-token";
import { hashRefreshToken } from "./hash-refresh-token";
import { RefreshRejectedError } from "./refresh-rejected-error";
import { REFRESH_TOKEN_TTL_SECONDS } from "./token-ttl";

/**
 * Sliding-window rotation. Presenting an unknown/revoked/expired token
 * revokes ALL of the user's sessions (reuse/theft detection) and rejects.
 */
export async function rotateSession(refreshToken: string) {
  const hash = hashRefreshToken(refreshToken);
  const existing = await db.session.findUnique({ where: { refreshHash: hash } });
  if (!existing) throw new RefreshRejectedError();
  if (existing.revokedAt || existing.expiresAt <= new Date()) {
    await db.session.updateMany({
      where: { userId: existing.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
    throw new RefreshRejectedError();
  }
  const next = generateRefreshToken();
  const created = await db.$transaction(async (tx) => {
    await tx.session.update({ where: { id: existing.id }, data: { revokedAt: new Date() } });
    return tx.session.create({
      data: {
        userId: existing.userId,
        refreshHash: hashRefreshToken(next),
        expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
      },
      select: { id: true },
    });
  });
  return { sessionId: created.id, refreshToken: next, userId: existing.userId };
}
