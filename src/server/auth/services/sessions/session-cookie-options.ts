import { isProductionCookies, type CookieOptions } from "./cookie-options";

export function sessionCookieOptions(maxAge = 15 * 60): CookieOptions {
  return { httpOnly: true, sameSite: "lax", secure: isProductionCookies(), path: "/", maxAge };
}
