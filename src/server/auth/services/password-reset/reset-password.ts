import { consumeResetToken } from "../../persistence/transactions/consume-reset-token";

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  await consumeResetToken(token, newPassword);
}
