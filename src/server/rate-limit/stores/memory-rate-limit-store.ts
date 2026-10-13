import type { RateLimitStore } from "./rate-limit-store";

const hits = new Map<string, { count: number; resetAt: number }>();

export const memoryRateLimitStore: RateLimitStore = {
  async increment(key: string, windowMs: number) {
    const now = Date.now();
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      const fresh = { count: 1, resetAt: now + windowMs };
      hits.set(key, fresh);
      return fresh;
    }
    entry.count += 1;
    return entry;
  },
};
