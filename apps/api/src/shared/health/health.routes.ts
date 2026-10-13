import { Hono } from "hono";
import { ok } from "../../core/http/respond.js";
import { getHealth } from "./health.service.js";

export const healthRoutes = new Hono().get("/", async (c) => ok(c, await getHealth()));
