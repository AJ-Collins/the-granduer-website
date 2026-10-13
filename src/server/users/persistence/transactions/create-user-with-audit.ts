import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import { insertAccount, type CreateAccountInput } from "../queries/insert-account";

/** Create + audit in one transaction. actorId omitted for seeding. */
export async function createUserWithAudit(input: CreateAccountInput, actorId?: string) {
  return db.$transaction(async (tx) => {
    const created = await insertAccount(tx, input);
    if (actorId) {
      await insertAuditEntry(
        {
          actorId,
          action: "admin.user-created",
          entityType: "account",
          entityId: created.id,
          metadata: { email: created.email },
        },
        tx,
      );
    }
    return created;
  }, { timeout: 10_000 });
}
