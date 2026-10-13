import { db } from "../../../db/client";
import { toListedAccount, WITH_ROLES } from "../rows";

export async function selectUserById(id: string) {
  const row = await db.account.findUnique({ where: { id }, include: WITH_ROLES });
  if (!row) return null;
  return {
    ...toListedAccount(row),
    permissions: [...new Set(row.roles.flatMap((x) => x.role.permissions))],
  };
}
