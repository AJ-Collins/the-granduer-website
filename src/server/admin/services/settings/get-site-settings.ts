import { toSiteSettings } from "../../persistence/mappers/to-site-settings";
import { selectSiteSettings } from "../../persistence/queries/select-site-settings";

export async function getSiteSettings() {
  return toSiteSettings(await selectSiteSettings());
}
