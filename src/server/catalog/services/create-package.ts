import { db } from "../../db/client";
import { toPackage } from "./list-packages";
import type { PackageInput } from "../requests/read-package-body";

export async function createPackage(input: PackageInput) {
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
        inclusions: (input.inclusions ?? undefined) as object | undefined,
        sortOrder: input.sortOrder ?? 0,
      },
    }),
  );
}
