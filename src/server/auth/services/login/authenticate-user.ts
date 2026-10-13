import { selectAccountForLogin } from "../../persistence/queries/select-account-for-login";
import type { LoginAccount } from "../../persistence/rows";

export type AuthenticatedAccount = LoginAccount;

export async function authenticateUser(email: string, password: string): Promise<AuthenticatedAccount> {
  return selectAccountForLogin(email, password);
}
