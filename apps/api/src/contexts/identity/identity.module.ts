import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { Deps } from "../../bootstrap/dependencies.js";
import { identityRoutes } from "./presentation/http/identity.routes.js";

/**
 * Identity context: the ONLY login/session/password system.
 * admin/ and cms/ reuse these capabilities — they must not build their own.
 */
export function identityModule(deps: Deps, authenticate: MiddlewareHandler) {
  const app = new Hono();
  app.route("/", identityRoutes(deps, authenticate));
  return app;
}
