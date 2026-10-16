import { ok } from "../../http/ok-response";
import { getFunnelSummary } from "../services/get-funnel-summary";
import { MOCK_FUNNEL } from "../services/mock-analytics-events";

export async function getFunnelSummaryController(): Promise<Response> {
  const steps = await getFunnelSummary();
  const isMock = steps.every((s) => s.count === 0);
  return ok(isMock ? MOCK_FUNNEL : steps);
}
