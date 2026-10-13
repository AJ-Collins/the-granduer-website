import type { Surface } from "./surface";

/**
 * Session APIs are same-host by design (each surface posts to its own
 * /api/auth/*), so no session API is ever "foreign". Kept as a hook so a
 * future surface-scoped session API can fail closed here.
 */
export function sessionApiSurface(_pathname: string): Surface | "shared" {
  return "shared";
}

export function isForeignSessionApi(_pathname: string, _surface: Surface): boolean {
  return false;
}
