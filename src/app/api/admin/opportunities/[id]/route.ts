import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { advanceOpportunityStageController } from "@/server/enquiries/controllers/opportunities/advance-opportunity-stage";
import { getOpportunityController } from "@/server/enquiries/controllers/opportunities/get-opportunity";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  return getOpportunityController(id);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  return advanceOpportunityStageController(req, id, user);
}
