import { db } from "../../../db/client";
import { verifyPassword } from "../../services/passwords/verify-password";
import { InvalidCredentialsError } from "../../services/login/invalid-credentials-error";
import type { LoginAccount } from "../rows";

const WITH_ROLES = { roles: { include: { role: true } } } as const;

export async function selectAccountForLogin(email: string, password: string): Promise<LoginAccount> {
  const account = await db.account.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: WITH_ROLES,
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
