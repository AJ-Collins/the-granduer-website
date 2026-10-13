import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { parseBody } from "@/server/http/parse-body";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { getOutboxEntryController } from "@/server/admin/controllers/outbox/get-outbox-entry";
import { retryOutboxEntryController } from "@/server/admin/controllers/outbox/retry-outbox-entry";

import { outboxRetrySchema } from "@/server/admin/requests/read-outbox-retry-body";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  const { id } = await ctx.params;
  return getOutboxEntryController(id);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.adminAccess);
  if (denied) return denied;
  const parsed = await parseBody(req, outboxRetrySchema);
  if ("response" in parsed) return parsed.response;
  const { id } = await ctx.params;
  return retryOutboxEntryController(id, user);
}
