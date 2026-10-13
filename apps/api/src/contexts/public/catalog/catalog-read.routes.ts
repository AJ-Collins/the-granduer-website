import { Hono } from "hono";
import { notFound } from "../../../core/errors/app-error.js";
import { ok } from "../../../core/http/respond.js";
import type { Deps } from "../../../bootstrap/dependencies.js";

export function publicPackageRoutes(deps: Deps) {
  const routes = new Hono();
  routes.get("/", async (c) => ok(c, await deps.listPublishedPackages()));
  routes.get("/:slug", async (c) => {
    try {
      return ok(c, await deps.getPublishedPackage(c.req.param("slug")));
    } catch {
      throw notFound("Package");
    }
  });
  return routes;
}

export function publicEventTypeRoutes(deps: Deps) {
  const routes = new Hono();
  routes.get("/", async (c) => ok(c, await deps.listPublishedEventTypes()));
  routes.get("/:slug", async (c) => {
    try {
      return ok(c, await deps.getPublishedEventType(c.req.param("slug")));
    } catch {
      throw notFound("Event type");
    }
  });
  return routes;
}
