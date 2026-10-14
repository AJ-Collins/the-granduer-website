import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import { replaceAccountRoleLinks } from "../queries/replace-account-role-links";
import { resolveRoleIds } from "../queries/resolve-role-ids";
import { toListedAccount } from "../mappers/to-listed-account";

/** Role replacement + audit — one transaction. */
export async function replaceUserRolesWithAudit(id: string, roleKeys: string[], actorId: string) {
  return db.$transaction(async (tx) => {
    const roles = await resolveRoleIds(tx, roleKeys);
    await replaceAccountRoleLinks(tx, id, roles.map((r) => r.id));
    const updated = await tx.account.findUniqueOrThrow({
      where: { id },
      include: { roles: { include: { role: true } } },
    });
    await insertAuditEntry(
      {
        actorId,
        action: "admin.user-roles-changed",
        entityType: "account",
        entityId: id,
        metadata: { roles: roleKeys },
      },
      tx,
    );
    return toListedAccount(updated);
  }, { timeout: 10_000 });
}
