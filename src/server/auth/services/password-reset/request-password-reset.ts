import { requestResetWithMail } from "../../persistence/transactions/request-reset-with-mail";
import { selectAccountByEmail } from "../../persistence/queries/select-account-by-email";

/** Anti-enumeration: identical success shape whether or not the email exists. */
export async function requestPasswordReset(email: string): Promise<void> {
  const account = await selectAccountByEmail(email);
  if (!account) return;
  await requestResetWithMail(account.id, account.email);
}
