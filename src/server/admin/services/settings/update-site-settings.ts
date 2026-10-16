import type { SiteSettingsInput } from "@/shared/schemas/site-settings";
import { updateSiteSettingsWithAudit } from "../../persistence/transactions/update-site-settings-with-audit";

export async function updateSiteSettings(input: SiteSettingsInput, actorId: string) {
  return updateSiteSettingsWithAudit(input, actorId);
}
