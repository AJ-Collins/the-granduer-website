import { db } from "../../../db/client";
import { published } from "../mappers/to-published";

const ORDER = [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }];

export async function selectTestimonials(publishedOnly: boolean) {
  const rows = await db.testimonial.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(published);
}
