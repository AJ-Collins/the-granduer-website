import { db } from "../../../db/client";
import { InvalidResetTokenError } from "../../services/password-reset/invalid-reset-token-error";

/** Consume (single-use) + set password + revoke sessions — one transaction. */
export async function consumeResetToken(input: { tokenHash: string; passwordHash: string }) {
  const row = await db.passwordResetToken.findUnique({
    where: { tokenHash: input.tokenHash },
  });
  if (!row || row.usedAt || row.expiresAt <= new Date()) throw new InvalidResetTokenError();
  await db.$transaction(async (tx) => {
    await tx.account.update({
      where: { id: row.userId },
      data: { passwordHash: input.passwordHash },
    });
    await tx.passwordResetToken.update({ where: { id: row.id }, data: { usedAt: new Date() } });
    await tx.session.updateMany({
      where: { userId: row.userId, revokedAt: null },
      data: { revokedAt: new Date() },
    });
  }, { timeout: 10_000 });
}
