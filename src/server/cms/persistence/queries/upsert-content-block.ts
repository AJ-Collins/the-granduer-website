import { db } from "../../../db/client";
import { published } from "../rows";
import type { ContentBody } from "../../requests/read-content-body";

export async function upsertContentBlockRow(input: ContentBody) {
  const status = (input.status ?? "draft").toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const row = await db.contentPage.upsert({
    where: { slug: input.slug },
    update: {
      title: input.title,
      body: (input.body ?? undefined) as object | undefined,
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : undefined,
    },
    create: {
      slug: input.slug,
      title: input.title,
      body: (input.body ?? undefined) as object | undefined,
      seoTitle: input.seoTitle ?? null,
      seoDescription: input.seoDescription ?? null,
      status,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });
  return published(row);
}
