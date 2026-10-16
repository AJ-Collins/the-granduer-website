import { describe, expect, it } from "vitest";
import { analyticsEventSchema } from "@/server/analytics/requests/read-analytics-event-body";

describe("analytics event schema", () => {
  it("accepts a click event with attribution", () => {
    expect(
      analyticsEventSchema.safeParse({
        eventName: "book_viewing_click",
        path: "/",
        source: "google",
        medium: "organic",
        campaign: "summer-26",
      }).success,
    ).toBe(true);
  });

  it("accepts a minimal view event", () => {
    expect(
      analyticsEventSchema.safeParse({ eventName: "package_view", path: "/packages" }).success,
    ).toBe(true);
  });

  it("rejects unknown event names", () => {
    expect(
      analyticsEventSchema.safeParse({ eventName: "purchase", path: "/" }).success,
    ).toBe(false);
  });

  it("rejects a missing path", () => {
    expect(analyticsEventSchema.safeParse({ eventName: "phone_click" }).success).toBe(false);
  });
});
