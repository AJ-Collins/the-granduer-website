import { hashPassword } from "../../../auth/services/passwords/hash-password";
import type { AccountRow } from "../rows";
import { WITH_ROLES } from "../fragments";
import { toListedAccount } from "../mappers/to-listed-account";
import { resolveRoleIds } from "./resolve-role-ids";

type AccountCreator = {
  account: {
    create(args: {
      data: {
        email: string;
        passwordHash: string;
        name: string | null;
        roles: { create: { roleId: string }[] };
      };
      include: { roles: { include: { role: true } } };
    }): Promise<AccountRow>;
  };
  role: Parameters<typeof resolveRoleIds>[0]["role"];
};

export type CreateAccountInput = {
  email: string;
  password: string;
  name?: string;
  roleKeys: string[];
};

export async function insertAccount(client: AccountCreator, input: CreateAccountInput) {
  const roles = await resolveRoleIds(client, input.roleKeys);
  const created = await client.account.create({
    data: {
      email: input.email.toLowerCase().trim(),
      passwordHash: await hashPassword(input.password),
      name: input.name ?? null,
      roles: { create: roles.map((r) => ({ roleId: r.id })) },
    },
    include: WITH_ROLES,
  });
  return toListedAccount(created);
}
