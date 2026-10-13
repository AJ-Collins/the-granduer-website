import { db } from "../../../db/client";
import { insertQueuedNotification } from "../../../notifications/persistence/queries/insert-queued-notification";
import { generateResetToken } from "../../services/tokens/generate-reset-token";
import { hashResetToken } from "../../services/tokens/hash-reset-token";
import { resetPasswordMail } from "../../../email/templates/password-reset";
import { TooManyResetRequestsError } from "../../services/password-reset/too-many-reset-requests-error";

const MAX_LIVE_RESET_TOKENS = 5;

/** Token row + queued mail in one transaction — never a token without its mail. */
export async function requestResetWithMail(accountId: string, email: string) {
  const live = await db.passwordResetToken.count({
    where: { userId: accountId, usedAt: null, createdAt: { gt: new Date(Date.now() - 24 * 3600 * 1000) } },
  });
  if (live >= MAX_LIVE_RESET_TOKENS) throw new TooManyResetRequestsError();
  const token = generateResetToken();
  const mail = resetPasswordMail(token);
  await db.$transaction(async (tx) => {
    await tx.passwordResetToken.create({
      data: {
        userId: accountId,
        tokenHash: hashResetToken(token),
        expiresAt: new Date(Date.now() + 60 * 60 * 1000),
      },
    });
    await insertQueuedNotification(tx, {
      type: "password.reset",
      to: email,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
  }, { timeout: 10_000 });
}
