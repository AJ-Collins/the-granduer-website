import { ok } from "../../../http/ok-response";
import { getDashboardStats } from "../../services/get-dashboard-stats";

export async function getDashboardStatsController(): Promise<Response> {
  return ok(await getDashboardStats());
}
