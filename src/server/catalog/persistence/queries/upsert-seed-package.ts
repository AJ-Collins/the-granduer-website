import { db } from "../../../db/client";
import type { PackageCreateInput } from "./insert-package";

export async function upsertSeedPackage(input: PackageCreateInput & { published: boolean }) {
  const status = input.published ? "PUBLISHED" : ("DRAFT" as const);
  await db.package.upsert({
    where: { slug: input.slug },
    update: {},
    create: {
      slug: input.slug,
      name: input.name,
      tier: input.tier.toUpperCase() as "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE",
      tagline: input.tagline ?? null,
      description: input.description ?? null,
      priceCents: input.priceCents ?? null,
      currency: "GBP",
      status,
      publishedAt: input.published ? new Date() : null,
      sortOrder: input.sortOrder ?? 0,
    },
  });
}
