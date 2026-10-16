import { countOpportunities } from "../../enquiries/persistence/queries/count-opportunities";
import type { AnalyticsEventName } from "../requests/read-analytics-event-body";
import { selectEventCountsByName } from "../persistence/queries/select-event-counts-by-name";

export type FunnelStep = { event: AnalyticsEventName | "opportunity"; label: string; count: number };

const STEPS: { event: FunnelStep["event"]; label: string }[] = [
  { event: "event_page_view", label: "Event page views" },
  { event: "package_view", label: "Package views" },
  { event: "proposal_click", label: "Proposal clicks" },
  { event: "book_viewing_click", label: "Viewing clicks" },
  { event: "proposal_form_submit", label: "Proposal submits" },
  { event: "viewing_form_submit", label: "Viewing submits" },
];

export async function getFunnelSummary(): Promise<FunnelStep[]> {
  const [counts, opportunities] = await Promise.all([
    selectEventCountsByName().then((rows) => new Map(rows.map((r) => [r.eventName, r.count]))),
    countOpportunities(),
  ]);
  return [
    ...STEPS.map((s) => ({ ...s, count: counts.get(s.event) ?? 0 })),
    { event: "opportunity" as const, label: "Opportunities", count: opportunities },
  ];
}
