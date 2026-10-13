import { fail } from "../http/fail-response";
import { rateLimitStore } from "./stores/get-rate-limit-store";
import { LIMITERS, type LimiterContext, type LimiterName } from "./limiters";
import { limiterContext } from "./limiter-context";

export type RateLimitOutcome = {
  blocked: Response | null;
  headers: Record<string, string>;
};

/** One-line enforcement in controllers. Preflights (OPTIONS) are exempt. */
export async function enforceRateLimit(
  req: Request,
  names: LimiterName[],
  extra?: Partial<LimiterContext>,
): Promise<RateLimitOutcome> {
  if (req.method === "OPTIONS") return { blocked: null, headers: {} };
  const ctx = limiterContext(req, extra);
  let headers: Record<string, string> = {};
  for (const name of names) {
    const limiter = LIMITERS[name];
    const { count, resetAt } = await rateLimitStore.increment(limiter.key(ctx), limiter.windowMs);
    const remaining = Math.max(0, limiter.limit - count);
    headers = {
      "X-RateLimit-Limit": String(limiter.limit),
      "X-RateLimit-Remaining": String(remaining),
      "X-RateLimit-Reset": String(Math.ceil(resetAt / 1000)),
    };
    if (count > limiter.limit) {
      const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - Date.now()) / 1000));
      return {
        blocked: fail("RATE_LIMITED", "Too many requests", {
          status: 429,
          retryAfterSeconds,
        }),
        headers: { ...headers, "Retry-After": String(retryAfterSeconds) },
      };
    }
  }
  return { blocked: null, headers };
}
