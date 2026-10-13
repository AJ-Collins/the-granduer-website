import { db } from "../../db/client";
import { verifyPassword } from "./verify-password";
import { InvalidCredentialsError } from "./invalid-credentials-error";

export type AuthenticatedAccount = {
  id: string;
  email: string;
  roles: string[];
  permissions: string[];
};

export async function authenticateUser(email: string, password: string): Promise<AuthenticatedAccount> {
  const account = await db.account.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: { roles: { include: { role: true } } },
  });
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
