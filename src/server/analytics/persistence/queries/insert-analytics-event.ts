import { db } from "../../../db/client";
import type { AnalyticsEventBody } from "../../requests/read-analytics-event-body";

export async function insertAnalyticsEvent(input: AnalyticsEventBody) {
  return db.analyticsEvent.create({
    data: {
      eventName: input.eventName,
      path: input.path.slice(0, 500),
      ...(input.source !== undefined && { source: input.source }),
      ...(input.medium !== undefined && { medium: input.medium }),
      ...(input.campaign !== undefined && { campaign: input.campaign }),
      ...(input.enquiryId !== undefined && { enquiryId: input.enquiryId }),
    },
  });
}
