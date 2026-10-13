import { db } from "../../db/client";
import { REFRESH_TOKEN_TTL_SECONDS } from "./token-ttl";
import { generateRefreshToken } from "./generate-refresh-token";
import { hashRefreshToken } from "./hash-refresh-token";

export type CreatedSession = { sessionId: string; refreshToken: string };

export async function createSession(userId: string): Promise<CreatedSession> {
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
