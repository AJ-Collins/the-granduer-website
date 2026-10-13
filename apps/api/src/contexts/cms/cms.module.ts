import { Hono } from "hono";
import type { MiddlewareHandler } from "hono";
import type { Deps } from "../../bootstrap/dependencies.js";
import { cmsEnquiryRoutes } from "./enquiries/enquiry-manage.routes.js";
import { cmsEventTypeRoutes, cmsPackageRoutes } from "./catalog/catalog-manage.routes.js";

/**
 * CMS context: content publishing workflows (protected).
 * Writes go through the shared catalog domain and the enquiries domain —
 * this context owns routes + permission checks, not business logic.
 */
export function cmsModule(deps: Deps, authenticate: MiddlewareHandler) {
  const app = new Hono();
  app.route("/packages", cmsPackageRoutes(deps, authenticate, deps.packageRepository));
  app.route("/events", cmsEventTypeRoutes(deps, authenticate, deps.eventTypeRepository));
  app.route("/enquiries", cmsEnquiryRoutes(deps, authenticate));
  // TODO: content pages, gallery, testimonials, faqs publishing routes.
  return app;
}
