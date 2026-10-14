import { db } from "../../../db/client";

export async function revokeSessionRowsByHash(refreshHash: string) {
  await db.session.updateMany({
    where: { refreshHash, revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
