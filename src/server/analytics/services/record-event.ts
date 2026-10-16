import { insertAnalyticsEvent } from "../persistence/queries/insert-analytics-event";
import type { AnalyticsEventBody } from "../requests/read-analytics-event-body";

export async function recordEvent(input: AnalyticsEventBody) {
  return insertAnalyticsEvent(input);
}
