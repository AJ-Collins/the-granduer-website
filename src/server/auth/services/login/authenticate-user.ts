import { verifyPassword } from "../passwords/verify-password";
import { InvalidCredentialsError } from "./invalid-credentials-error";
import { selectAccountLoginRow } from "../../persistence/queries/select-account-login-row";
import type { LoginAccount } from "../../persistence/rows";

export type AuthenticatedAccount = LoginAccount;

export async function authenticateUser(email: string, password: string): Promise<AuthenticatedAccount> {
  const account = await selectAccountLoginRow(email);
  if (!account || !(await verifyPassword(password, account.passwordHash))) {
    throw new InvalidCredentialsError();
  }
  if (account.status !== "ACTIVE") throw new InvalidCredentialsError();
  return {
    id: account.id,
    email: account.email,
    roles: account.roles.map((r) => r.role.key),
    permissions: [...new Set(account.roles.flatMap((r) => r.role.permissions))],
  };
}
