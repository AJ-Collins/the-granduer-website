import type { NextRequest } from "next/server";

/** Optimistic edge check: presence of the access cookie. Routes verify for real. */
export function hasSession(request: NextRequest): boolean {
  return request.cookies.has("dgrandeur_session");
}
