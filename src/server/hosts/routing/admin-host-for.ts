import { ADMIN_HOST } from "./well-known-hosts";

/** Preserve the request port for localhost dev (admin.localhost:3000). */
export function adminHostFor(hostHeader: string): string {
  const port = hostHeader.split(":")[1];
  const base = ADMIN_HOST === "admin.localhost" ? "admin.localhost" : ADMIN_HOST;
  return port && base.endsWith(".localhost") ? `${base}:${port}` : base;
}
