import { db } from "../../db/client";
import { toPackage } from "./list-packages";
import type { PackagePatch } from "../requests/read-package-body";

export async function updatePackage(id: string, patch: PackagePatch) {
  return toPackage(
    await db.package.update({
      where: { id },
      data: {
        ...(patch.name !== undefined && { name: patch.name }),
        ...(patch.tier !== undefined && {
          tier: patch.tier.toUpperCase() as "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE",
        }),
        ...(patch.tagline !== undefined && { tagline: patch.tagline }),
        ...(patch.description !== undefined && { description: patch.description }),
        ...(patch.priceCents !== undefined && { priceCents: patch.priceCents }),
        ...(patch.currency !== undefined && { currency: patch.currency }),
        ...(patch.inclusions !== undefined && { inclusions: patch.inclusions as object }),
        ...(patch.sortOrder !== undefined && { sortOrder: patch.sortOrder }),
      },
    }),
  );
}
