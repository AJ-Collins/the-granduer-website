import { insertSessionRow } from "../../persistence/queries/insert-session-row";
import { generateRefreshToken } from "../tokens/generate-refresh-token";
import { hashRefreshToken } from "../tokens/hash-refresh-token";
import { REFRESH_TOKEN_TTL_SECONDS } from "./refresh-token-ttl";

export type CreatedSession = { sessionId: string; refreshToken: string };

export async function createSession(userId: string): Promise<CreatedSession> {
  const refreshToken = generateRefreshToken();
  const { sessionId } = await insertSessionRow(userId, {
    refreshHash: hashRefreshToken(refreshToken),
    expiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
  });
  return { sessionId, refreshToken };
}
