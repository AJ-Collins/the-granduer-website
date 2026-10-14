import { parsePagination } from "../../../http/pagination";
import { pageMeta } from "../../../http/page-meta";
import { listEnquiries } from "../../../enquiries/services/managed/list-enquiries";

export async function listSubmissionsController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const { items, total } = await listEnquiries(page, pageSize, url.searchParams.get("status") ?? undefined);
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
