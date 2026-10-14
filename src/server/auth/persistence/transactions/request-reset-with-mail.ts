import { db } from "../../../db/client";
import { insertQueuedNotification } from "../../../notifications/persistence/queries/insert-queued-notification";
import { TooManyResetRequestsError } from "../../services/password-reset/too-many-reset-requests-error";

const MAX_LIVE_RESET_TOKENS = 5;

/** Token row + queued mail in one transaction. */
export async function requestResetWithMail(input: {
  accountId: string;
  email: string;
  tokenHash: string;
  expiresAt: Date;
  mail: { subject: string; text: string; html: string };
}) {
  const live = await db.passwordResetToken.count({
    where: { userId: input.accountId, usedAt: null, createdAt: { gt: new Date(Date.now() - 24 * 3600 * 1000) } },
  });
  if (live >= MAX_LIVE_RESET_TOKENS) throw new TooManyResetRequestsError();
  await db.$transaction(async (tx) => {
    await tx.passwordResetToken.create({
      data: { userId: input.accountId, tokenHash: input.tokenHash, expiresAt: input.expiresAt },
    });
    await insertQueuedNotification(tx, {
      type: "password.reset",
      to: input.email,
      subject: input.mail.subject,
      text: input.mail.text,
      html: input.mail.html,
    });
  }, { timeout: 10_000 });
}
