import type { Permission } from "./permissions";

export function hasPermission(granted: Permission[], required: Permission): boolean {
  return granted.includes(required);
}

export function requirePermission(granted: Permission[], required: Permission): void {
  if (!hasPermission(granted, required)) {
    throw new Error("Forbidden");
  }
}
