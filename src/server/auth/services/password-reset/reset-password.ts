import { consumeResetToken } from "../../persistence/transactions/consume-reset-token";
import { hashPassword } from "../passwords/hash-password";
import { hashResetToken } from "../tokens/hash-reset-token";

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await consumeResetToken({
    tokenHash: hashResetToken(token.trim()),
    passwordHash: await hashPassword(newPassword),
  });
}
