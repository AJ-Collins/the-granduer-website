import { siteSettingsSchema } from "@/shared/schemas/site-settings";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { updateSiteSettings } from "../../services/settings/update-site-settings";

export async function updateSiteSettingsController(req: Request, actor: SessionUser): Promise<Response> {
  const parsed = await parseBody(req, siteSettingsSchema);
  if ("response" in parsed) return parsed.response;
  return ok(await updateSiteSettings(parsed.data, actor.id));
}
