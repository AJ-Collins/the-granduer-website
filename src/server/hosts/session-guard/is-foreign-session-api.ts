import type { NextRequest } from "next/server";
import type { Surface } from "../routing/surface";

/**
 * Session APIs are same-host by design (each surface posts to its own
 * /api/auth/*), so no session API is ever "foreign". Kept as a hook so a
 * future surface-scoped session API can fail closed here.
 */
export function isForeignSessionApiRequest(_request: NextRequest, _surface: Surface): boolean {
  return false;
}
