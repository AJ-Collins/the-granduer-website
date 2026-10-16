import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { createOpportunityController } from "@/server/enquiries/controllers/opportunities/create-opportunity";
import { listOpportunitiesController } from "@/server/enquiries/controllers/opportunities/list-opportunities";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  return listOpportunitiesController(req);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.enquiriesManage);
  if (denied) return denied;
  return createOpportunityController(req, user);
}
