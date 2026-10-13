import { verifyPassword } from "@dgrandeur/auth";
import { unauthorized } from "../../../../core/errors/app-error.js";
import type { AccountRepository } from "../../accounts/account.repository.js";
import type { SessionService } from "../../sessions/session.service.js";

export function makeLogin(accounts: AccountRepository, sessions: SessionService) {
  return async function login(email: string, password: string) {
    const account = await accounts.findByEmail(email.toLowerCase().trim());
    if (!account || !(await verifyPassword(password, account.passwordHash))) {
      throw unauthorized("Invalid email or password");
    }
    if (account.status !== "active") throw unauthorized("Account is not active");
    const token = await sessions.issue(account.id, account.roles, account.permissions, account.tokenVersion);
    return {
      token,
      account: { id: account.id, email: account.email, name: account.name, roles: account.roles, permissions: account.permissions },
    };
  };
}

export type Login = ReturnType<typeof makeLogin>;

export function makeLogout(accounts: AccountRepository, sessions: SessionService) {
  return async function logout(accountId: string): Promise<void> {
    await accounts.bumpTokenVersion(accountId);
    sessions.forget(accountId);
  };
}

export type Logout = ReturnType<typeof makeLogout>;
