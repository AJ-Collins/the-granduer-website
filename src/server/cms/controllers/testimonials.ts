import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { listTestimonials, upsertTestimonial } from "../services/testimonials";
import { testimonialBodySchema } from "../requests/read-testimonial-body";

export async function listTestimonialsController(publishedOnly: boolean) {
  return ok(await listTestimonials(publishedOnly));
}

export async function upsertTestimonialController(req: Request, id: string | null) {
  const parsed = await parseBody(req, testimonialBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await upsertTestimonial(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Testimonial not found", { status: 404 });
  }
}
