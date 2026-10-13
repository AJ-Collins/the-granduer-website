export type AccountStatus = "active" | "suspended" | "deactivated";

export type ListedAccount = {
  id: string;
  email: string;
  name: string | null;
  status: AccountStatus;
  roles: string[];
};

export type AccountRow = {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  roles: { role: { key: string; permissions: string[] } }[];
};

export function toListedAccount(row: AccountRow): ListedAccount {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase() as AccountStatus,
    roles: row.roles.map((x) => x.role.key),
  };
}

export const WITH_ROLES = { roles: { include: { role: true } } } as const;
