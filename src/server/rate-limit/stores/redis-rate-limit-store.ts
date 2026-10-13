import { Redis } from "ioredis";
import type { RateLimitStore } from "./rate-limit-store";

let client: Redis | null = null;

function getClient(): Redis | null {
  if (!process.env.REDIS_URL) return null;
  if (!client) {
    client = new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 1, enableOfflineQueue: false });
    client.on("error", () => {});
  }
  return client;
}

/** Atomic Lua INCR+PEXPIRE. Returns null when Redis is unavailable (fail-open). */
export async function tryRedisIncrement(
  key: string,
  windowMs: number,
): Promise<{ count: number; resetAt: number } | null> {
  const redis = getClient();
  if (!redis) return null;
  try {
    const now = Date.now();
    const result = (await redis.eval(
      `local c = redis.call('INCR', KEYS[1])
       if c == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end
       local ttl = redis.call('PTTL', KEYS[1])
       return {c, ttl}`,
      1,
      key,
      String(windowMs),
    )) as [number, number];
    return { count: result[0], resetAt: now + result[1] };
  } catch {
    return null;
  }
}
