import { selectDashboardCounts } from "../persistence/queries/select-dashboard-counts";

export async function getDashboardStats() {
  return selectDashboardCounts();
}
