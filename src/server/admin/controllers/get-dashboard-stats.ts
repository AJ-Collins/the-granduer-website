import { ok } from "../../http/api-response";
import { getDashboardStats } from "../services/get-dashboard-stats";

export async function getDashboardStatsController(): Promise<Response> {
  return ok(await getDashboardStats());
}
