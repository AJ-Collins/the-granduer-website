import { revokeAllSessionRows } from "../../persistence/queries/revoke-all-session-rows";

export async function revokeAllSessions(userId: string): Promise<void> {
  await revokeAllSessionRows(userId);
}
