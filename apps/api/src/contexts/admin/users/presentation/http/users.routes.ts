import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import { authorize } from "../../../../../core/middleware/authorize.js";
import type { Deps } from "../../../../../bootstrap/dependencies.js";
import { makeAdminUsersController } from "./users.controller.js";

const READ = authorize("admin.access");
const WRITE = authorize("users.manage");

export function adminUsersRoutes(deps: Deps, authenticate: MiddlewareHandler) {
  const controller = makeAdminUsersController(
    deps.getAdminUser,
    deps.listAdminUsers,
    deps.createAdminUser,
    deps.setAdminUserStatus,
    deps.setAdminUserRoles,
  );
  const routes = new Hono();
  routes.get("/", authenticate, READ, (c) => controller.index(c));
  routes.get("/:id", authenticate, READ, (c) => controller.show(c));
  routes.post("/", authenticate, WRITE, (c) => controller.create(c));
  routes.patch("/:id/status", authenticate, WRITE, (c) => controller.setStatus(c));
  routes.put("/:id/roles", authenticate, WRITE, (c) => controller.setRoles(c));
  return routes;
}
