import { db } from "../../../db/client";
import { published } from "../rows";

export async function selectContentBlock(slug: string, publishedOnly: boolean) {
  const row = await db.contentPage.findUnique({ where: { slug } });
  if (!row) return null;
  if (publishedOnly && row.status !== "PUBLISHED") return null;
  return published(row);
}
