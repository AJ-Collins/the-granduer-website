import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger as honoLogger } from "hono/logger";
import { env } from "./core/config/env.js";
import { errorHandler } from "./core/middleware/error-handler.js";
import { requestId } from "./core/middleware/request-id.js";
import { healthRoutes } from "./shared/health/health.routes.js";
import { adminModule } from "./contexts/admin/admin.module.js";
import { cmsModule } from "./contexts/cms/cms.module.js";
import { publicModule } from "./contexts/public/public.module.js";
import { identityModule } from "./contexts/identity/identity.module.js";
import { buildDependencies } from "./bootstrap/dependencies.js";

export function buildApp() {
  const deps = buildDependencies();
  const app = new Hono();

  app.use("*", requestId);
  app.use("*", honoLogger());
  app.use(
    "*",
    cors({ origin: env.CORS_ORIGINS.split(",").map((s: string) => s.trim()), credentials: true }),
  );

  app.route("/health", healthRoutes);
  app.route("/api/v1/public", publicModule(deps, deps.authenticate));
  app.route("/api/v1/cms", cmsModule(deps, deps.authenticate));
  app.route("/api/v1/admin", adminModule(deps, deps.authenticate));
  app.route("/api/v1/identity", identityModule(deps, deps.authenticate));

  app.notFound((c) =>
    c.json({ ok: false, error: { code: "NOT_FOUND", message: "Route not found" } }, 404),
  );
  app.onError(errorHandler);
  return app;
}
