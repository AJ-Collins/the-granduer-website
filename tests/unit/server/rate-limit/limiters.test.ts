import { describe, expect, it } from "vitest";
import { LIMITERS } from "@/server/rate-limit/limiters";

describe("named limiters", () => {
  it("normalises identity keys so case variants share one bucket", () => {
    const key = LIMITERS["auth-login"].key({ ip: "1.2.3.4", email: "Admin@X.com" });
    expect(key).toBe(LIMITERS["auth-login"].key({ ip: "9.9.9.9", email: "admin@x.com" }));
  });

  it("keeps refresh budget separate from login budget", () => {
    expect(LIMITERS["auth-refresh"].limit).toBeGreaterThanOrEqual(LIMITERS["auth-login"].limit);
  });

  it("falls back to IP when no identity is present", () => {
    expect(LIMITERS.api.key({ ip: "1.2.3.4" })).toBe("api:1.2.3.4");
  });
});
