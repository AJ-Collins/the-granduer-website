import { isProductionCookies, type CookieOptions } from "./cookie-options";

export function refreshCookieOptions(maxAge = 30 * 24 * 3600): CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: isProductionCookies(), path: "/", maxAge };
}
