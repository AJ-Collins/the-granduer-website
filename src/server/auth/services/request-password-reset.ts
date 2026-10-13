import { db } from "../../db/client";
import { sendMail } from "../../email/services/send-mail";
import { generateResetToken, hashResetToken } from "./hash-reset-token";
import { TooManyResetRequestsError } from "./too-many-reset-requests-error";

const MAX_LIVE_TOKENS = 5;

/** Anti-enumeration: identical success shape whether or not the email exists. */
export async function requestPasswordReset(email: string): Promise<void> {
  const account = await db.account.findUnique({ where: { email: email.toLowerCase().trim() } });
  if (!account) return;
  const since = new Date(Date.now() - 24 * 3600 * 1000);
  const live = await db.passwordResetToken.count({
    where: { userId: account.id, usedAt: null, createdAt: { gt: since } },
  });
  if (live >= MAX_LIVE_TOKENS) throw new TooManyResetRequestsError();
  const token = generateResetToken();
  await db.passwordResetToken.create({
    data: {
      userId: account.id,
      tokenHash: hashResetToken(token),
      expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    },
  });
  await sendMail({
    to: account.email,
    subject: "Reset your D'Grandeur password",
    text: `Use this token within 60 minutes to reset your password: ${token}`,
  });
}
