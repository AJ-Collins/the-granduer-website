import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { Deps } from "../../bootstrap/dependencies.js";
import { enquiriesModule } from "./enquiries/enquiries.module.js";
import { publicEventTypeRoutes, publicPackageRoutes } from "./catalog/catalog-read.routes.js";

/**
 * Public context: unauthenticated visitor workflows.
 * Reads go through the shared catalog domain (same rules/repos the CMS writes through).
 */
export function publicModule(deps: Deps, _authenticate: MiddlewareHandler) {
  const app = new Hono();
  app.route("/enquiries", enquiriesModule(deps));
  app.route("/packages", publicPackageRoutes(deps));
  app.route("/events", publicEventTypeRoutes(deps));
  // TODO: content pages, gallery, testimonials, faqs published reads.
  return app;
}
