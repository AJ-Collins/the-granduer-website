import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { upsertTestimonial } from "../../services/testimonials/upsert-testimonial";
import { testimonialBodySchema } from "../../requests/read-testimonial-body";

export async function upsertTestimonialController(req: Request, id: string | null) {
  const parsed = await parseBody(req, testimonialBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await upsertTestimonial(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Testimonial not found", { status: 404 });
  }
}
