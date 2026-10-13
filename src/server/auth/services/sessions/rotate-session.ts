import { rotateSessionRow } from "../../persistence/transactions/rotate-session-row";
import { StaleRefreshTokenError } from "../../persistence/errors/stale-refresh-token-error";
import { RefreshRejectedError } from "./refresh-rejected-error";

export async function rotateSession(refreshToken: string) {
  try {
    return await rotateSessionRow(refreshToken);
  } catch (e) {
    if (e instanceof StaleRefreshTokenError) throw new RefreshRejectedError();
    throw e;
  }
}
