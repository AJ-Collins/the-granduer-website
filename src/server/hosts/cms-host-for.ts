import { CMS_HOST } from "./well-known-hosts";

export function cmsHostFor(hostHeader: string): string {
  const port = hostHeader.split(":")[1];
  const base = CMS_HOST === "cms.localhost" ? "cms.localhost" : CMS_HOST;
  return port && base.endsWith(".localhost") ? `${base}:${port}` : base;
}
