import { db } from "../../../db/client";
import { published } from "../mappers/to-published";

export async function selectContentBlocks(publishedOnly: boolean) {
  const rows = await db.contentPage.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: { slug: "asc" },
  });
  return rows.map(published);
}
