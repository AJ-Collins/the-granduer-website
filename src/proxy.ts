import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { handleAdminHost } from "./server/hosts/handlers/handle-admin";
import { handleCmsHost } from "./server/hosts/handlers/handle-cms";
import { handleWebHost } from "./server/hosts/handlers/handle-web";
import { hasSession } from "./server/hosts/session-guard/has-session";
import { hostOf } from "./server/hosts/routing/host-of";
import { isForeignSessionApiRequest } from "./server/hosts/session-guard/is-foreign-session-api";
import { surfaceOf } from "./server/hosts/routing/surface-of";
import { fail } from "./server/http/fail-response";
import { isPublicApi } from "./server/http/public-api-routes";

function unauthorized(): NextResponse {
  return fail("UNAUTHORIZED", "Not authenticated", { status: 401 }) as unknown as NextResponse;
}

export function proxy(request: NextRequest): NextResponse {
  const hostHeader = request.headers.get("host") ?? request.nextUrl.hostname;
  const surface = surfaceOf(hostOf(hostHeader));

  if (surface === null) {
    return new NextResponse("Unknown host", { status: 404 });
  }

  if (isForeignSessionApiRequest(request, surface)) {
    return new NextResponse(null, { status: 404 });
  }

  if (
    request.nextUrl.pathname.startsWith("/api/") &&
    !isPublicApi(request.nextUrl.pathname, request.method) &&
    !hasSession(request)
  ) {
    return unauthorized();
  }

  switch (surface) {
    case "admin":
      return handleAdminHost(request, hostHeader);
    case "cms":
      return handleCmsHost(request, hostHeader);
    case "web":
      return handleWebHost(request, hostHeader);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
