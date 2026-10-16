import { ok } from "../../http/ok-response";
import { getSourceBreakdown } from "../services/get-source-breakdown";
import { MOCK_SOURCES } from "../services/mock-analytics-events";

export async function getSourceBreakdownController(): Promise<Response> {
  const rows = await getSourceBreakdown();
  return ok(rows.length > 0 ? rows : MOCK_SOURCES);
}
