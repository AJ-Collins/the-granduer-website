import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import { toPackage } from "../mappers/to-package";
import type { PackageTier } from "../rows";

export type PackageCreateInput = {
  slug: string;
  name: string;
  tier: PackageTier;
  tagline?: string | null;
  description?: string | null;
  priceCents?: number | null;
  currency?: string;
  inclusions?: unknown;
  sortOrder?: number;
};

export async function insertPackage(input: PackageCreateInput) {
  return toPackage(
    await db.package.create({
      data: {
        slug: input.slug,
        name: input.name,
        tier: input.tier.toUpperCase() as "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE",
        tagline: input.tagline ?? null,
        description: input.description ?? null,
        priceCents: input.priceCents ?? null,
        currency: input.currency ?? "GBP",
        inclusions: (input.inclusions ?? undefined) as Prisma.InputJsonValue | undefined,
        sortOrder: input.sortOrder ?? 0,
      },
    }),
  );
}
