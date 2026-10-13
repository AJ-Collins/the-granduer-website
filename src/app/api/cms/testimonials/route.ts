import { PERMISSIONS } from "@/server/access/permissions";
import { requirePermission } from "@/server/access/require-permission";
import { requireUser } from "@/server/auth/services/sessions/require-user";
import { listTestimonialsController } from "@/server/cms/controllers/testimonials/list-testimonials";
import { upsertTestimonialController } from "@/server/cms/controllers/testimonials/upsert-testimonial";

export async function GET(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.cmsAccess);
  if (denied) return denied;
  return listTestimonialsController(false);
}

export async function POST(req: Request) {
  const user = await requireUser(req);
  if (user instanceof Response) return user;
  const denied = requirePermission(user, PERMISSIONS.contentPublish);
  if (denied) return denied;
  return upsertTestimonialController(req, null);
}
