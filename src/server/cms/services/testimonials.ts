import { db } from "../../db/client";
import type { TestimonialBody } from "../requests/read-testimonial-body";

const ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

export async function listTestimonials(publishedOnly: boolean) {
  const rows = await db.testimonial.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map((r) => ({ ...r, status: r.status.toLowerCase() }));
}

export async function upsertTestimonial(id: string | null, input: TestimonialBody) {
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
  return { ...row, status: row.status.toLowerCase() };
}
