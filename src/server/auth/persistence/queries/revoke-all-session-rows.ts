import { db } from "../../../db/client";

export async function revokeAllSessionRows(userId: string) {
  await db.session.updateMany({
    where: { userId, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
