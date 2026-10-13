import { createResetToken, hashPassword, hashResetToken, verifyPassword } from "@dgrandeur/auth";
import { badRequest, unauthorized } from "../../../../core/errors/app-error.js";
import type { Notifier } from "../../../../shared/notifications/notifier.js";
import type { AccountRepository } from "../../accounts/account.repository.js";
import type { SessionService } from "../../sessions/session.service.js";

export function makeChangePassword(accounts: AccountRepository, sessions: SessionService) {
  return async function changePassword(accountId: string, current: string, next: string): Promise<void> {
    const account = await accounts.findById(accountId);
    if (!account) throw unauthorized();
    if (!(await verifyPassword(current, account.passwordHash))) {
      throw badRequest("Current password is incorrect");
    }
    await accounts.setPassword(accountId, await hashPassword(next));
    await accounts.bumpTokenVersion(accountId);
    sessions.forget(accountId);
  };
}

export type ChangePassword = ReturnType<typeof makeChangePassword>;

export function makeRequestPasswordReset(accounts: AccountRepository, notifier: Notifier) {
  // Always succeeds (even for unknown emails) to avoid account enumeration.
  return async function requestPasswordReset(email: string): Promise<void> {
    const account = await accounts.findByEmail(email.toLowerCase().trim());
    if (!account) return;
    const reset = createResetToken(60);
    await accounts.storeResetToken(account.id, reset.hash, reset.expiresAt);
    await notifier.sendEmail({
      to: account.email,
      subject: "Reset your D'Grandeur password",
      text: `Use this token within 60 minutes to reset your password: ${reset.token}`,
    });
  };
}

export type RequestPasswordReset = ReturnType<typeof makeRequestPasswordReset>;

export function makeResetPassword(accounts: AccountRepository, sessions: SessionService) {
  return async function resetPassword(token: string, next: string): Promise<void> {
    const account = await accounts.findByResetTokenHash(hashResetToken(token.trim()));
    if (!account) throw badRequest("Reset token is invalid or expired");
    await accounts.setPassword(account.id, await hashPassword(next));
    await accounts.clearResetToken(account.id);
    await accounts.bumpTokenVersion(account.id);
    sessions.forget(account.id);
  };
}

export type ResetPassword = ReturnType<typeof makeResetPassword>;
