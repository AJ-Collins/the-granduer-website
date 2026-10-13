import { ok } from "../../../http/ok-response";
import { listTestimonials } from "../../services/testimonials/list-testimonials";

export async function listTestimonialsController(publishedOnly: boolean) {
  return ok(await listTestimonials(publishedOnly));
}
