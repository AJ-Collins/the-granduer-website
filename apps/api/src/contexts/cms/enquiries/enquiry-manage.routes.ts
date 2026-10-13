import type { Context } from "hono";
import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import { badRequest } from "../../../core/errors/app-error.js";
import { ok, paginated } from "../../../core/http/respond.js";
import type { AuthContext } from "../../../core/middleware/authenticate.js";
import { authorize } from "../../../core/middleware/authorize.js";
import {
  type AssignEnquiry,
  type GetManagedEnquiry,
  type ListManagedEnquiries,
  type UpdateEnquiryStatus,
} from "../../public/enquiries/index.js";
import type { Deps } from "../../../bootstrap/dependencies.js";
import {
  assignEnquirySchema,
  managedEnquiryQuerySchema,
  updateEnquiryStatusSchema,
} from "./enquiry-manage.schemas.js";

function actor(c: Context): string {
  return ((c.get as (k: string) => unknown)("auth") as AuthContext).userId;
}

function makeController(
  list: ListManagedEnquiries,
  get: GetManagedEnquiry,
  assign: AssignEnquiry,
  setStatus: UpdateEnquiryStatus,
) {
  return {
    async index(c: Context) {
      const query = managedEnquiryQuerySchema.parse({
        page: c.req.query("page"),
        pageSize: c.req.query("pageSize"),
        status: c.req.query("status"),
      });
      const { items, total } = await list(query.page, query.pageSize, query.status);
      return paginated(c, items, query.page, query.pageSize, total);
    },
    async show(c: Context) {
      return ok(c, await get(c.req.param("id")));
    },
    async assign(c: Context) {
      const parsed = assignEnquirySchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      return ok(c, await assign(c.req.param("id"), parsed.data.assignedToId, actor(c)));
    },
    async setStatus(c: Context) {
      const parsed = updateEnquiryStatusSchema.safeParse(await c.req.json().catch(() => ({})));
      if (!parsed.success) throw badRequest("Invalid payload", parsed.error.flatten());
      return ok(c, await setStatus(c.req.param("id"), parsed.data.status, actor(c), parsed.data.notes));
    },
  };
}

export function cmsEnquiryRoutes(deps: Deps, authenticate: MiddlewareHandler) {
  const controller = makeController(
    deps.listManagedEnquiries,
    deps.getManagedEnquiry,
    deps.assignEnquiry,
    deps.updateEnquiryStatus,
  );
  const routes = new Hono();
  routes.use("*", authenticate, authorize("cms.access", "enquiries.manage"));
  routes.get("/", (c) => controller.index(c));
  routes.get("/:id", (c) => controller.show(c));
  routes.patch("/:id/assign", (c) => controller.assign(c));
  routes.patch("/:id/status", (c) => controller.setStatus(c));
  return routes;
}
