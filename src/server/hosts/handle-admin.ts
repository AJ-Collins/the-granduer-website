import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";
import { PUBLIC_ADMIN_PATHS } from "./admin-public-paths";
import { cmsHostFor } from "./cms-host-for";
import { handleSurfaceHost } from "./handle-surface-host";

/** Root-form URLs in browser (/products); /admin-prefixed internal route in App Router. */
export function handleAdminHost(request: NextRequest, hostHeader: string): NextResponse {
  return handleSurfaceHost(request, hostHeader, {
    surface: "admin",
    prefix: "/admin",
    publicPaths: PUBLIC_ADMIN_PATHS,
    loginPath: "/login",
    otherPrefix: "/cms",
    otherHost: cmsHostFor(hostHeader),
  });
}
