import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** 307 to same-host /login with ?callbackUrl= (never nested — login is public). */
export function redirectToLogin(
  request: NextRequest,
  hostHeader: string,
  loginPath: string,
): NextResponse {
  const url = request.nextUrl.clone();
  url.host = hostHeader.split(":")[0] ?? url.host;
  url.pathname = loginPath;
  url.searchParams.set("callbackUrl", `${request.nextUrl.pathname}${request.nextUrl.search}`);
  return NextResponse.redirect(url, 307);
}
