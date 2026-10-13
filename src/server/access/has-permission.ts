import type { SessionUser } from "../auth/services/sessions/session-claims";

export function hasPermission(user: SessionUser, permission: string): boolean {
  if (user.roles.includes("superadmin")) return true;
  return user.permissions.includes(permission);
}
