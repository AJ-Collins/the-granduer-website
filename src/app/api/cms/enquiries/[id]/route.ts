import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/require-user";
import { getEnquiryController } from "@/server/enquiries/controllers/get-enquiry";
import { assignEnquiryController } from "@/server/enquiries/controllers/assign-enquiry";
import { updateEnquiryStatusController } from "@/server/enquiries/controllers/update-enquiry-status";

export async function GET(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  return getEnquiryController(id);
}

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  const { id } = await ctx.params;
  const url = new URL(req.url);
  if (url.searchParams.get("action") === "assign") return assignEnquiryController(req, id, user);
  return updateEnquiryStatusController(req, id, user);
}
