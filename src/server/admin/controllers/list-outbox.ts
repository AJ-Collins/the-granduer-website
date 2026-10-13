import { pageMeta, parsePagination } from "../../http/pagination";
import { listOutboxEntries } from "../../notifications/services/list-outbox-entries";

export async function listOutboxController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const { items, total } = await listOutboxEntries(page, pageSize, {
    ...(url.searchParams.get("status") && { status: url.searchParams.get("status") as string }),
    ...(url.searchParams.get("type") && { type: url.searchParams.get("type") as string }),
  });
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
