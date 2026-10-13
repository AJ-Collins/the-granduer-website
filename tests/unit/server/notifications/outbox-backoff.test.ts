import { describe, expect, it } from "vitest";
import {
  backoffMinutes,
  mayRetry,
  nextAttemptAt,
  OUTBOX_MAX_ATTEMPTS,
} from "@/server/notifications/services/outbox-backoff";

describe("outbox retries", () => {
  it("allows exactly 3 attempts", () => {
    expect(OUTBOX_MAX_ATTEMPTS).toBe(3);
    expect(mayRetry(0)).toBe(true);
    expect(mayRetry(2)).toBe(true);
    expect(mayRetry(3)).toBe(false);
  });

  it("backs off exponentially (2^n minutes)", () => {
    expect(backoffMinutes(1)).toBe(2);
    expect(backoffMinutes(2)).toBe(4);
    expect(backoffMinutes(3)).toBe(8);
  });

  it("schedules the next attempt in the future", () => {
    const from = new Date("2026-01-01T00:00:00Z");
    expect(nextAttemptAt(1, from).getTime()).toBe(from.getTime() + 2 * 60_000);
  });
});
