import { hashRefreshToken } from "../tokens/hash-refresh-token";
import { revokeSessionRowsByHash } from "../../persistence/queries/revoke-session-rows-by-hash";

export async function revokeSession(refreshToken: string): Promise<void> {
  await revokeSessionRowsByHash(hashRefreshToken(refreshToken));
}
