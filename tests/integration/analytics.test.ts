import { afterEach, describe, expect, it } from "vitest";
import { db } from "@/server/db/client";
import { recordEvent } from "@/server/analytics/services/record-event";
import { getFunnelSummary } from "@/server/analytics/services/get-funnel-summary";
import { getSourceBreakdown } from "@/server/analytics/services/get-source-breakdown";

afterEach(async () => {
  await db.analyticsEvent.deleteMany({ where: { path: { startsWith: "/analytics-test" } } });
});

describe("analytics capture and aggregation", () => {
  it("records events and aggregates funnel counts", async () => {
    await recordEvent({ eventName: "package_view", path: "/analytics-test", source: "google" });
    await recordEvent({ eventName: "package_view", path: "/analytics-test", source: "google" });
    await recordEvent({ eventName: "book_viewing_click", path: "/analytics-test" });
    const funnel = await getFunnelSummary();
    const views = funnel.find((s) => s.event === "package_view");
    expect(views?.count).toBeGreaterThanOrEqual(2);
  });

  it("breaks down sources with lead counts", async () => {
    await recordEvent({ eventName: "package_view", path: "/analytics-test", source: "dealflow" });
    const rows = await getSourceBreakdown();
    const row = rows.find((r) => r.source === "dealflow");
    expect(row).toBeDefined();
    expect(row?.events).toBeGreaterThanOrEqual(1);
  });
});
