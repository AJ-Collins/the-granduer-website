import type { AccountRow, ListedAccount } from "../rows";

export function toListedAccount(row: AccountRow): ListedAccount {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase() as ListedAccount["status"],
    roles: row.roles.map((x) => x.role.key),
  };
}
