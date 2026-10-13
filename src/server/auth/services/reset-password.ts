import { db } from "../../db/client";
import { hashPassword } from "./hash-password";
import { hashResetToken } from "./hash-reset-token";
import { InvalidResetTokenError } from "./invalid-reset-token-error";
import { revokeAllSessions } from "./revoke-all-sessions";

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const row = await db.passwordResetToken.findUnique({
    where: { tokenHash: hashResetToken(token.trim()) },
  });
  if (!row || row.usedAt || row.expiresAt <= new Date()) throw new InvalidResetTokenError();
  await db.$transaction([
    db.account.update({
      where: { id: row.userId },
      data: { passwordHash: await hashPassword(newPassword) },
    }),
    db.passwordResetToken.update({ where: { id: row.id }, data: { usedAt: new Date() } }),
  ]);
  await revokeAllSessions(row.userId);
}
