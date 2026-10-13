import { upsertTestimonialRow } from "../../persistence/queries/upsert-testimonial";
import type { TestimonialBody } from "../../requests/read-testimonial-body";

export async function upsertTestimonial(id: string | null, input: TestimonialBody) {
  return upsertTestimonialRow(id, input);
}
