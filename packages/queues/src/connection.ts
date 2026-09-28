import type { ConnectionOptions } from "bullmq";

/**
 * Shared Redis connection options for every BullMQ queue/worker.
 * BullMQ requires `maxRetriesPerRequest: null` and
 * `enableReadyCheck: false`.
 */
export function getRedisConnection(): ConnectionOptions {
  return {
    url: process.env.REDIS_URL ?? "redis://localhost:6379",
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  };
}
