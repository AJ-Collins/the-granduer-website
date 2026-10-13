import type { NextRequest } from "next/server";
import { isForeignSessionApi } from "./session-api-surface";
import type { Surface } from "./surface";

export function isForeignSessionApiRequest(request: NextRequest, surface: Surface): boolean {
  return isForeignSessionApi(request.nextUrl.pathname, surface);
}
