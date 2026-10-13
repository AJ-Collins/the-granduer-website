import { serve } from "@hono/node-server";
import { buildApp } from "./app.js";
import { env } from "./core/config/env.js";
import { logger } from "./core/logging/logger.js";

const app = buildApp();

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  logger.info(`API listening on :${info.port} (${env.NODE_ENV})`);
});
