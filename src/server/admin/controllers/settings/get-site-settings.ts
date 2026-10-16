import { ok } from "../../../http/ok-response";
import { getSiteSettings } from "../../services/settings/get-site-settings";

export async function getSiteSettingsController(): Promise<Response> {
  return ok(await getSiteSettings());
}
