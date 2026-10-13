import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";
import { adminHostFor } from "./admin-host-for";
import { PUBLIC_CMS_PATHS } from "./cms-public-paths";
import { handleSurfaceHost } from "./handle-surface-host";

export function handleCmsHost(request: NextRequest, hostHeader: string): NextResponse {
  return handleSurfaceHost(request, hostHeader, {
    surface: "cms",
    prefix: "/cms",
    publicPaths: PUBLIC_CMS_PATHS,
    loginPath: "/login",
    otherPrefix: "/admin",
    otherHost: adminHostFor(hostHeader),
  });
}
