import { selectEnquirySourceCounts } from "../../enquiries/persistence/queries/select-enquiry-source-counts";
import { selectEventsBySource } from "../persistence/queries/select-events-by-source";

export type SourceRow = {
  source: string;
  medium: string;
  campaign: string;
  events: number;
  leads: number;
};

export async function getSourceBreakdown(): Promise<SourceRow[]> {
  const [events, leads] = await Promise.all([
    selectEventsBySource(),
    selectEnquirySourceCounts().then((rows) => new Map(rows.map((r) => [r.source, r.leads]))),
  ]);
  const merged = new Map<string, SourceRow>();
  for (const e of events) {
    const key = `${e.source}|${e.medium}|${e.campaign}`;
    merged.set(key, { ...e, leads: 0 });
  }
  for (const [source, count] of leads) {
    const key = `${source}|—|—`;
    const existing = merged.get(key);
    if (existing) existing.leads = count;
    else merged.set(key, { source, medium: "—", campaign: "—", events: 0, leads: count });
  }
  return [...merged.values()].sort((a, b) => b.events + b.leads - (a.events + a.leads));
}
