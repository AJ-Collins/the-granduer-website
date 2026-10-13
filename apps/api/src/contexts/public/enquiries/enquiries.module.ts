import { Hono } from "hono";
import type { Deps } from "../../../bootstrap/dependencies.js";
import { enquiryRoutes } from "./presentation/http/enquiry.routes.js";

/** Public enquiries feature module: wires routes only; use-cases live in Deps. */
export function enquiriesModule(deps: Deps) {
  const app = new Hono();
  app.route("/", enquiryRoutes(deps));
  return app;
}
