import { selectTestimonials } from "../../persistence/queries/select-testimonials";

export async function listTestimonials(publishedOnly: boolean) {
  return selectTestimonials(publishedOnly);
}
