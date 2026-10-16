import { enforceRateLimit } from "@/server/rate-limit/enforce-rate-limit";
import { recordEventController } from "@/server/analytics/controllers/record-event";

export async function POST(req: Request) {
  const limit = await enforceRateLimit(req, ["analytics"]);
  if (limit.blocked) return limit.blocked;
  return recordEventController(req);
}
