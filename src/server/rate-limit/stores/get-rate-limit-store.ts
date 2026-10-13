import { memoryRateLimitStore } from "./memory-rate-limit-store";
import type { RateLimitStore } from "./rate-limit-store";
import { tryRedisIncrement } from "./redis-rate-limit-store";

/** Redis when REDIS_URL is set (and alive), memory otherwise. Fail-open. */
export const rateLimitStore: RateLimitStore = {
  async increment(key: string, windowMs: number) {
    return (await tryRedisIncrement(key, windowMs)) ?? memoryRateLimitStore.increment(key, windowMs);
  },
};
