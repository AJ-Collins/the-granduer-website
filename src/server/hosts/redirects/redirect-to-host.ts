import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** Visible cross-host redirect preserving path + query. */
export function redirectToHost(request: NextRequest, host: string, pathname: string): NextResponse {
  const url = request.nextUrl.clone();
  url.host = host;
  url.pathname = pathname;
  return NextResponse.redirect(url, 308);
}
