import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { Deps } from "../../../../bootstrap/dependencies.js";
import { rateLimit } from "../../../../core/middleware/rate-limit.js";
import { makeIdentityController } from "./identity.controller.js";

export function identityRoutes(deps: Deps, authenticate: MiddlewareHandler) {
  const controller = makeIdentityController(
    deps.accountRepository,
    deps.login,
    deps.logoutUser,
    deps.changePassword,
    deps.requestPasswordReset,
    deps.resetPassword,
  );
  const routes = new Hono();
  routes.post("/login", rateLimit(10), (c) => controller.login(c));
  routes.post("/request-password-reset", rateLimit(5), (c) => controller.requestReset(c));
  routes.post("/reset-password", rateLimit(5), (c) => controller.resetPassword(c));
  routes.post("/logout", authenticate, (c) => controller.logout(c));
  routes.get("/me", authenticate, (c) => controller.me(c));
  routes.post("/change-password", authenticate, (c) => controller.changePassword(c));
  return routes;
}
