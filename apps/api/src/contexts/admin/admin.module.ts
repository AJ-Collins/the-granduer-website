import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import { ok, paginated } from "../../core/http/respond.js";
import { authorize } from "../../core/middleware/authorize.js";
import { paginationSchema } from "../../shared/pagination/pagination.js";
import type { ListAuditLogs } from "../../shared/audit/audit-log.js";
import type { Deps } from "../../bootstrap/dependencies.js";
import type { ListRoles } from "./roles/roles.js";
import { adminUsersRoutes } from "./users/presentation/http/users.routes.js";

export function adminRolesRoutes(listRoles: ListRoles, authenticate: MiddlewareHandler) {
  const routes = new Hono();
  routes.get("/", authenticate, authorize("admin.access"), async (c) => ok(c, await listRoles()));
  return routes;
}

export function adminAuditRoutes(listAudit: ListAuditLogs, authenticate: MiddlewareHandler) {
  const routes = new Hono();
  routes.get("/", authenticate, authorize("audit.read"), async (c) => {
    const { page, pageSize } = paginationSchema.parse({
      page: c.req.query("page"),
      pageSize: c.req.query("pageSize"),
    });
    const { items, total } = await listAudit(page, pageSize, {
      ...(c.req.query("entityType") && { entityType: c.req.query("entityType") as string }),
      ...(c.req.query("entityId") && { entityId: c.req.query("entityId") as string }),
    });
    return paginated(c, items, page, pageSize, total);
  });
  return routes;
}

export function adminModule(deps: Deps, authenticate: MiddlewareHandler) {
  const app = new Hono();
  app.route("/users", adminUsersRoutes(deps, authenticate));
  app.route("/roles", adminRolesRoutes(deps.listRoles, authenticate));
  app.route("/audit", adminAuditRoutes(deps.listAuditLogs, authenticate));
  // TODO: dashboard, settings.
  return app;
}
