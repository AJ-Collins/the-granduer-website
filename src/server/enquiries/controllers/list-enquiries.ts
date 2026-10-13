import { pageMeta, parsePagination } from "../../http/pagination";
import { listEnquiries } from "../services/list-enquiries";

export async function listEnquiriesController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const status = url.searchParams.get("status") ?? undefined;
  const { items, total } = await listEnquiries(page, pageSize, status);
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
