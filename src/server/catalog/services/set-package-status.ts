import { db } from "../../db/client";
import { toPackage } from "./list-packages";
import type { PublishState } from "./catalog-types";

export async function setPackageStatus(id: string, status: PublishState) {
  return toPackage(
    await db.package.update({
      where: { id },
      data: {
        status: status.toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        publishedAt: status === "published" ? new Date() : undefined,
      },
    }),
  );
}
