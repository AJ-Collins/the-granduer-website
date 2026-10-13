import { listTestimonialsController } from "@/server/cms/controllers/testimonials/list-testimonials";

export async function GET() {
  return listTestimonialsController(true);
}
