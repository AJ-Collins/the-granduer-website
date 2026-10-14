import type { BarChartItem, CategoryBreakdownItem } from "@/shared/types/analytics";
import { toCmsDashboard } from "../persistence/mappers/to-cms-dashboard";
import { selectCmsDashboardCounts } from "../persistence/queries/select-cms-dashboard-counts";
import { SAMPLE_CMS_DATA } from "./sample-cms-dashboard-data";

export type CmsDashboardData = {
  packagesCount: number;
  eventsCount: number;
  contentPagesCount: number;
  testimonialsCount: number;
  galleryImagesCount: number;
  faqsCount: number;
  tierBreakdown: CategoryBreakdownItem[];
  catalogueDistribution: BarChartItem[];
  isSampleData: boolean;
};

// Falls back to clearly-marked sample data when DB is empty/offline.
export async function getCmsDashboardStats(): Promise<CmsDashboardData> {
  try {
    const counts = await selectCmsDashboardCounts();
    if (counts.packages > 0 || counts.events > 0) {
      return toCmsDashboard(counts, SAMPLE_CMS_DATA.tierBreakdown);
    }
  } catch {
  }
  return SAMPLE_CMS_DATA;
}
