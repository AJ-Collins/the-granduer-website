import type { MiddlewareHandler } from "hono";

/** Minimal in-memory fixed-window rate limiter (per-IP). Replace with Redis for multi-instance deploys. */
const hits = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(max = 60, windowMs = 60_000): MiddlewareHandler {
  return async (c, next) => {
    const ip = c.req.header("x-forwarded-for") ?? "local";
    const now = Date.now();
    const entry = hits.get(ip);
    if (!entry || entry.resetAt <= now) {
      hits.set(ip, { count: 1, resetAt: now + windowMs });
    } else if (entry.count >= max) {
      return c.json({ ok: false, error: { code: "RATE_LIMITED", message: "Too many requests" } }, 429);
    } else {
      entry.count += 1;
    }
    await next();
  };
}
