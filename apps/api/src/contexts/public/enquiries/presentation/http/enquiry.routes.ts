import { Hono } from "hono";
import { rateLimit } from "../../../../../core/middleware/rate-limit.js";
import type { Deps } from "../../../../../bootstrap/dependencies.js";
import { makeEnquiryController } from "./enquiry.controller.js";

/** Public intake only — listing/managing enquiries is a CMS workflow. */
export function enquiryRoutes(deps: Deps) {
  const controller = makeEnquiryController(deps.submitEnquiry);
  const routes = new Hono();
  routes.post("/", rateLimit(30), (c) => controller.create(c));
  return routes;
}
