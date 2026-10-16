import { parsePagination } from "../../../http/pagination";
import { pageMeta } from "../../../http/page-meta";
import { listOpportunities } from "../../services/opportunities/list-opportunities";
import type { OpportunityStage } from "../../services/opportunities/opportunity-stage";
import { OPPORTUNITY_STAGES } from "../../services/opportunities/opportunity-stage";

export async function listOpportunitiesController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const rawStage = url.searchParams.get("stage") ?? undefined;
  const stage = rawStage && (OPPORTUNITY_STAGES as string[]).includes(rawStage)
    ? (rawStage as OpportunityStage)
    : undefined;
  const { items, total } = await listOpportunities(page, pageSize, stage);
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
