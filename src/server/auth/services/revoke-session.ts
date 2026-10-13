import { db } from "../../db/client";
import { hashRefreshToken } from "./hash-refresh-token";

export async function revokeSession(refreshToken: string): Promise<void> {
  await db.session.updateMany({
    where: { refreshHash: hashRefreshToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
