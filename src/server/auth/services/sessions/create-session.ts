import { insertSessionRow } from "../../persistence/queries/insert-session-row";

export type CreatedSession = { sessionId: string; refreshToken: string };

export async function createSession(userId: string): Promise<CreatedSession> {
  return insertSessionRow(userId);
}
