import { db } from "../../../db/client";
import { generateRefreshToken } from "../../services/tokens/generate-refresh-token";
import { hashRefreshToken } from "../../services/tokens/hash-refresh-token";
import { REFRESH_TOKEN_TTL_SECONDS } from "../../services/sessions/refresh-token-ttl";

export async function insertSessionRow(userId: string) {
  const refreshToken = generateRefreshToken();
  const session = await db.session.create({
    data: {
      userId,
      refreshHash: hashRefreshToken(refreshToken),
      expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    },
    select: { id: true },
  });
  return { sessionId: session.id, refreshToken };
}
