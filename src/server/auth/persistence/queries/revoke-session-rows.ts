import { db } from "../../../db/client";
import { hashRefreshToken } from "../../services/tokens/hash-refresh-token";

export async function revokeSessionRows(refreshToken: string) {
  await db.session.updateMany({
    where: { refreshHash: hashRefreshToken(refreshToken), revokedAt: null },
    data: { revokedAt: new Date() },
  });
}
