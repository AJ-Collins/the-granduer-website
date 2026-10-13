import { pageMeta, parsePagination } from "../../http/pagination";
import { listAuditLogs } from "../../audit/services/list-audit-logs";

export async function listAuditLogsController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const { items, total } = await listAuditLogs(page, pageSize, {
    ...(url.searchParams.get("entityType") && { entityType: url.searchParams.get("entityType") as string }),
    ...(url.searchParams.get("entityId") && { entityId: url.searchParams.get("entityId") as string }),
  });
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
