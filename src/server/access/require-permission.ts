import { fail } from "../http/api-response";
import type { SessionUser } from "../auth/services/session-claims";
import { hasPermission } from "./has-permission";

/** Controller-level enforcement: 403 Response when the permission is missing. */
export function requirePermission(
  user: SessionUser,
  permission: string,
): Response | null {
  if (hasPermission(user, permission)) return null;
  return fail("FORBIDDEN", "Missing required permission", { status: 403 });
}
