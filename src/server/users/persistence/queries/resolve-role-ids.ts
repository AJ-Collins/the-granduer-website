import { UnknownRolesError } from "../errors/unknown-roles-error";

type RoleReader = {
  role: {
    findMany(args: { where: { key: { in: string[] } } }): Promise<{ id: string; key: string }[]>;
  };
};

/** Validates keys exist; returns the matched roles. Throws on unknown keys. */
export async function resolveRoleIds(client: RoleReader, roleKeys: string[]) {
  const roles = await client.role.findMany({ where: { key: { in: roleKeys } } });
  const missing = roleKeys.filter((k) => !roles.some((r) => r.key === k));
  if (missing.length > 0) throw new UnknownRolesError(missing);
  return roles;
}
