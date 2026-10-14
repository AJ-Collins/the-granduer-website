import { resetPasswordMail } from "../../../email/templates/password-reset";
import { requestResetWithMail } from "../../persistence/transactions/request-reset-with-mail";
import { selectAccountByEmail } from "../../persistence/queries/select-account-by-email";
import { generateResetToken } from "../tokens/generate-reset-token";
import { hashResetToken } from "../tokens/hash-reset-token";

/** Anti-enumeration: identical success shape whether or not the email exists. */
export async function requestPasswordReset(email: string): Promise<void> {
  const account = await selectAccountByEmail(email);
  if (!account) return;
  const token = generateResetToken();
  await requestResetWithMail({
    accountId: account.id,
    email: account.email,
    tokenHash: hashResetToken(token),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    mail: resetPasswordMail(token),
  });
}
