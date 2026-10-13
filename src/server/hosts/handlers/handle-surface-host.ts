import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { hasSession } from "../session-guard/has-session";
import { isLocalMockMode } from "../session-guard/is-local-mock-mode";
import { redirectToHost } from "../redirects/redirect-to-host";
import { redirectToLogin } from "../redirects/redirect-to-login";
import { stripPrefix } from "../routing/strip-prefix";
import type { SurfaceConfig } from "./surface-config";

/** Shared gated-surface logic: canonical redirects, cross-surface bounce, login gate, invisible rewrite. */
export function handleSurfaceHost(
  request: NextRequest,
  hostHeader: string,
  config: SurfaceConfig,
): NextResponse {
  const pathname = request.nextUrl.pathname;
  const stripped = stripPrefix(pathname, config.prefix);
  if (stripped !== null) {
    const url = request.nextUrl.clone();
    url.pathname = stripped;
    return NextResponse.redirect(url, 308);
  }
  if (pathname.startsWith("/api/")) return NextResponse.next();
  if (pathname === config.otherPrefix || pathname.startsWith(`${config.otherPrefix}/`)) {
    return redirectToHost(request, config.otherHost, pathname);
  }
  if (!config.publicPaths.has(pathname) && !hasSession(request) && !isLocalMockMode()) {
    return redirectToLogin(request, hostHeader, config.loginPath);
  }
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? config.prefix : `${config.prefix}${pathname}`;
  const headers = new Headers(request.headers);
  headers.set("x-surface-path", pathname);
  return NextResponse.rewrite(url, { request: { headers } });
}
