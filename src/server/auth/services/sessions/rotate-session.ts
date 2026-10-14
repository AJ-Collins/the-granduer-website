import { rotateSessionRow } from "../../persistence/transactions/rotate-session-row";
import { StaleRefreshTokenError } from "../../persistence/errors/stale-refresh-token-error";
import { generateRefreshToken } from "../tokens/generate-refresh-token";
import { hashRefreshToken } from "../tokens/hash-refresh-token";
import { REFRESH_TOKEN_TTL_SECONDS } from "./refresh-token-ttl";
import { RefreshRejectedError } from "./refresh-rejected-error";

export async function rotateSession(refreshToken: string) {
  try {
    const next = generateRefreshToken();
    const { sessionId, userId } = await rotateSessionRow({
      currentHash: hashRefreshToken(refreshToken),
      nextHash: hashRefreshToken(next),
      nextExpiresAt: new Date(Date.now() + REFRESH_TOKEN_TTL_SECONDS * 1000),
    });
    return { sessionId, refreshToken: next, userId };
  } catch (e) {
    if (e instanceof StaleRefreshTokenError) throw new RefreshRejectedError();
    throw e;
  }
}
