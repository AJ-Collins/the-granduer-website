import type { FunnelStep } from "./get-funnel-summary";
import type { SourceRow } from "./get-source-breakdown";

export const MOCK_FUNNEL: FunnelStep[] = [
  { event: "event_page_view", label: "Event page views", count: 1240 },
  { event: "package_view", label: "Package views", count: 860 },
  { event: "proposal_click", label: "Proposal clicks", count: 410 },
  { event: "book_viewing_click", label: "Viewing clicks", count: 380 },
  { event: "proposal_form_submit", label: "Proposal submits", count: 96 },
  { event: "viewing_form_submit", label: "Viewing submits", count: 120 },
  { event: "opportunity", label: "Opportunities", count: 34 },
];

export const MOCK_SOURCES: SourceRow[] = [
  { source: "google", medium: "organic", campaign: "—", events: 980, leads: 88 },
  { source: "instagram", medium: "social", campaign: "summer-26", events: 640, leads: 54 },
  { source: "direct", medium: "—", campaign: "—", events: 410, leads: 47 },
  { source: "referral", medium: "referral", campaign: "—", events: 220, leads: 19 },
];
