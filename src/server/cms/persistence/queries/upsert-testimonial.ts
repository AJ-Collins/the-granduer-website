import { db } from "../../../db/client";
import { published } from "../rows";
import type { TestimonialBody } from "../../requests/read-testimonial-body";

export async function upsertTestimonialRow(id: string | null, input: TestimonialBody) {
  const status = (input.status ?? "draft").toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const data = {
    name: input.name,
    quote: input.quote,
    eventType: input.eventType ?? null,
    status,
    sortOrder: input.sortOrder ?? 0,
  };
  const row = id
    ? await db.testimonial.update({ where: { id }, data })
    : await db.testimonial.create({ data });
  return published(row);
}
