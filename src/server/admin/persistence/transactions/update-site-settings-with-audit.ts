import { db } from "../../../db/client";
import { insertAuditEntry } from "../../../audit/persistence/queries/insert-audit-entry";
import type { SiteSettingsInput } from "@/shared/schemas/site-settings";
import { upsertSiteSettingsRow } from "../queries/upsert-site-settings";

/** Settings write + audit — one transaction, never a silent change. */
export async function updateSiteSettingsWithAudit(input: SiteSettingsInput, actorId: string) {
  return db.$transaction(async (tx) => {
    await upsertSiteSettingsRow(tx, input);
    await insertAuditEntry(
      {
        actorId,
        action: "admin.site-settings-updated",
        entityType: "site-setting",
        entityId: "site",
        metadata: { phone: input.phone, supportEmail: input.supportEmail },
      },
      tx,
    );
    return input;
  }, { timeout: 10_000 });
}
