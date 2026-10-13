import { revokeSessionRows } from "../../persistence/queries/revoke-session-rows";

export async function revokeSession(refreshToken: string): Promise<void> {
  await revokeSessionRows(refreshToken);
}
