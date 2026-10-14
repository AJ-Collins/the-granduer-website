import type { DashboardAnalyticsData } from "@/shared/types/analytics";
import { toEventTypesBreakdown } from "../persistence/mappers/to-event-types-breakdown";
import { toRecentActivity } from "../persistence/mappers/to-recent-activity";
import { toStatusBreakdown } from "../persistence/mappers/to-status-breakdown";
import { selectEnquiryStatusCounts } from "../persistence/queries/select-enquiry-status-counts";
import { selectEventTypeEnquiryCounts } from "../persistence/queries/select-event-type-enquiry-counts";
import { selectRecentEnquiries } from "../persistence/queries/select-recent-enquiries";
import { SAMPLE_ANALYTICS_DATA } from "./sample-dashboard-analytics";

// Falls back to clearly-marked sample data when DB is empty/offline.
export async function getDashboardAnalytics(): Promise<DashboardAnalyticsData> {
  try {
    const { total, statusCounts } = await selectEnquiryStatusCounts();
    if (total > 0) {
      const [eventTypes, recentEnquiries] = await Promise.all([
        selectEventTypeEnquiryCounts(),
        selectRecentEnquiries(),
      ]);
      const statusBreakdown = toStatusBreakdown(statusCounts, total);
      const eventTypesBreakdown = toEventTypesBreakdown(eventTypes);
      const recentActivity = toRecentActivity(recentEnquiries);
      return {
        isSampleData: false,
        enquiriesTrend: SAMPLE_ANALYTICS_DATA.enquiriesTrend,
        statusBreakdown: statusBreakdown.length > 0 ? statusBreakdown : SAMPLE_ANALYTICS_DATA.statusBreakdown,
        eventTypesBreakdown: eventTypesBreakdown.length > 0 ? eventTypesBreakdown : SAMPLE_ANALYTICS_DATA.eventTypesBreakdown,
        recentActivity: recentActivity.length > 0 ? recentActivity : SAMPLE_ANALYTICS_DATA.recentActivity,
      };
    }
  } catch {
  }
  return SAMPLE_ANALYTICS_DATA;
}
