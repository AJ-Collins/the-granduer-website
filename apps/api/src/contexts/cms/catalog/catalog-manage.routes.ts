import type { MiddlewareHandler } from "hono";
import { Hono } from "hono";
import { badRequest, notFound } from "../../../core/errors/app-error.js";
import { created, ok } from "../../../core/http/respond.js";
import { authorize } from "../../../core/middleware/authorize.js";
import type {
  EventTypeRepository,
  PackageRepository,
} from "../../../domains/catalog/index.js";
import type { Deps } from "../../../bootstrap/dependencies.js";
import {
  eventTypeInputSchema,
  eventTypePatchSchema,
  packageInputSchema,
  packagePatchSchema,
  statusSchema,
} from "./catalog-manage.schemas.js";

const READ = authorize("cms.access");
const WRITE = authorize("catalog.manage");

export function cmsPackageRoutes(
  deps: Deps,
  authenticate: MiddlewareHandler,
  repo: PackageRepository,
) {
  const routes = new Hono();
  routes.use("*", authenticate);
  routes.get("/", READ, async (c) => ok(c, await repo.listAll()));
  routes.get("/:id", READ, async (c) => {
    const found = await repo.findById(c.req.param("id"));
    if (!found) throw notFound("Package");
    return ok(c, found);
  });
  routes.post("/", WRITE, async (c) => {
    const parsed = packageInputSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid package payload", parsed.error.flatten());
    return created(c, await deps.createPackage(parsed.data));
  });
  routes.patch("/:id", WRITE, async (c) => {
    const parsed = packagePatchSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid package payload", parsed.error.flatten());
    try {
      return ok(c, await deps.updatePackage(c.req.param("id"), parsed.data));
    } catch {
      throw notFound("Package");
    }
  });
  routes.post("/:id/status", WRITE, async (c) => {
    const parsed = statusSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid status payload", parsed.error.flatten());
    try {
      return ok(c, await deps.setPackageStatus(c.req.param("id"), parsed.data.status));
    } catch {
      throw notFound("Package");
    }
  });
  return routes;
}

export function cmsEventTypeRoutes(
  deps: Deps,
  authenticate: MiddlewareHandler,
  repo: EventTypeRepository,
) {
  const routes = new Hono();
  routes.use("*", authenticate);
  routes.get("/", READ, async (c) => ok(c, await repo.listAll()));
  routes.get("/:id", READ, async (c) => {
    const found = await repo.findById(c.req.param("id"));
    if (!found) throw notFound("Event type");
    return ok(c, found);
  });
  routes.post("/", WRITE, async (c) => {
    const parsed = eventTypeInputSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid event payload", parsed.error.flatten());
    return created(c, await deps.createEventType(parsed.data));
  });
  routes.patch("/:id", WRITE, async (c) => {
    const parsed = eventTypePatchSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid event payload", parsed.error.flatten());
    try {
      return ok(c, await deps.updateEventType(c.req.param("id"), parsed.data));
    } catch {
      throw notFound("Event type");
    }
  });
  routes.post("/:id/status", WRITE, async (c) => {
    const parsed = statusSchema.safeParse(await c.req.json().catch(() => ({})));
    if (!parsed.success) throw badRequest("Invalid status payload", parsed.error.flatten());
    try {
      return ok(c, await deps.setEventTypeStatus(c.req.param("id"), parsed.data.status));
    } catch {
      throw notFound("Event type");
    }
  });
  return routes;
}
