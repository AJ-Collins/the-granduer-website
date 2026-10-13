import { z } from "zod";
import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { parseBody } from "@/server/http/parse-body";
import { requireUser } from "@/server/auth/services/require-user";
import { getOutboxEntryController } from "@/server/admin/controllers/get-outbox-entry";
import { retryOutboxEntryController } from "@/server/admin/controllers/retry-outbox-entry";

const patchSchema = z.object({ action: z.literal("retry") });

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
  const parsed = await parseBody(req, patchSchema);
  if ("response" in parsed) return parsed.response;
  const { id } = await ctx.params;
  return retryOutboxEntryController(id, user);
}
