import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { Deps } from "../../../bootstrap/dependencies.js";
import { adminUsersRoutes } from "./presentation/http/users.routes.js";

export function adminUsersModule(deps: Deps, authenticate: MiddlewareHandler) {
  const app = new Hono();
  app.route("/", adminUsersRoutes(deps, authenticate));
  return app;
}
