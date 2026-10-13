import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import { revokeAccountSessions } from "../queries/revoke-account-sessions";
import { updateAccountStatus } from "../queries/update-account-status";
import type { AccountStatus } from "../rows";

/** Status change + session revocation + audit — one transaction, fixed order. */
export async function updateUserStatusWithAudit(id: string, status: AccountStatus, actorId: string) {
  if (id === actorId && status !== "active") {
    throw new Error("You cannot deactivate your own account");
  }
  return db.$transaction(async (tx) => {
    const updated = await updateAccountStatus(tx, id, status);
    await revokeAccountSessions(tx, id);
    await insertAuditEntry(
      {
        actorId,
        action: "admin.user-status-changed",
        entityType: "account",
        entityId: id,
        metadata: { to: status },
      },
      tx,
    );
    return updated;
  }, { timeout: 10_000 });
}
