import { db } from "../../../db/client";

export async function insertSessionRow(
  userId: string,
  input: { refreshHash: string; expiresAt: Date },
) {
  const session = await db.session.create({
    data: { userId, refreshHash: input.refreshHash, expiresAt: input.expiresAt },
    select: { id: true },
  });
  return { sessionId: session.id };
}
