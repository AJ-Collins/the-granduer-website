import { db } from "../../db/client";
import type { ContentBody } from "../requests/read-content-body";

export async function getContentBlock(slug: string, publishedOnly: boolean) {
  const row = await db.contentPage.findUnique({ where: { slug } });
  if (!row) return null;
  if (publishedOnly && row.status !== "PUBLISHED") return null;
  return { ...row, status: row.status.toLowerCase() };
}

export async function listContentBlocks(publishedOnly: boolean) {
  const rows = await db.contentPage.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: { slug: "asc" },
  });
  return rows.map((r) => ({ ...r, status: r.status.toLowerCase() }));
}

export async function upsertContentBlock(input: ContentBody) {
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
  return { ...row, status: row.status.toLowerCase() };
}
