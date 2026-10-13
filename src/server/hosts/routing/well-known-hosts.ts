import { apexDomain } from "./apex-domain";

export const ADMIN_HOST = (process.env.ADMIN_HOST ?? `admin.${apexDomain()}`).toLowerCase();
export const CMS_HOST = (process.env.CMS_HOST ?? `cms.${apexDomain()}`).toLowerCase();

export const WEB_HOSTS = new Set(
  (process.env.WEB_HOSTS ?? `${apexDomain()},www.${apexDomain()},localhost,www.localhost`)
    .split(",")
    .map((h) => h.trim().toLowerCase())
    .filter(Boolean),
);
