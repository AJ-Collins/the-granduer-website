import type { Surface } from "./surface";
import { ADMIN_HOST, CMS_HOST, WEB_HOSTS } from "./well-known-hosts";

export function surfaceOf(host: string): Surface | null {
  if (host === ADMIN_HOST || host === "admin.localhost") return "admin";
  if (host === CMS_HOST || host === "cms.localhost") return "cms";
  if (WEB_HOSTS.has(host)) return "web";
  return null;
}
