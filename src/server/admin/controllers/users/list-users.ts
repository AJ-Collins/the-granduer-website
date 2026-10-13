import { parsePagination } from "../../../http/pagination";
import { pageMeta } from "../../../http/page-meta";
import { listUsers } from "../../../users/services/list-users";

export async function listUsersController(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const { page, pageSize } = parsePagination(url);
  const { items, total } = await listUsers(page, pageSize, {
    ...(url.searchParams.get("status") && { status: url.searchParams.get("status") as string }),
    ...(url.searchParams.get("search") && { search: url.searchParams.get("search") as string }),
  });
  return Response.json(
    { success: true, data: items, meta: pageMeta(page, pageSize, total) },
    { status: 200 },
  );
}
