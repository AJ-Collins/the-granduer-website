import { listTestimonialsController } from "@/server/cms/controllers/testimonials";

export async function GET() {
  return listTestimonialsController(true);
}
