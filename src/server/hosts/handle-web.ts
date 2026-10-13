import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { adminHostFor } from "./admin-host-for";
import { cmsHostFor } from "./cms-host-for";
import { redirectToHost } from "./redirect-to-host";
import { stripPrefix } from "./strip-prefix";

export function handleWebHost(request: NextRequest, hostHeader: string): NextResponse {
  const pathname = request.nextUrl.pathname;
  const adminPath = stripPrefix(pathname, "/admin");
  if (adminPath !== null) {
    return redirectToHost(request, adminHostFor(hostHeader), adminPath);
  }
  const cmsPath = stripPrefix(pathname, "/cms");
  if (cmsPath !== null) {
    return redirectToHost(request, cmsHostFor(hostHeader), cmsPath);
  }
  return NextResponse.next();
}
