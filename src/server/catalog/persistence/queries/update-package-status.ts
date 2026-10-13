import { db } from "../../../db/client";
import { toPackage } from "../mappers/to-package";
import { prismaStatus } from "../prisma-status";
import type { PublishState } from "../rows";

export async function updatePackageStatus(id: string, status: PublishState) {
  return toPackage(
    await db.package.update({
      where: { id },
      data: {
        status: prismaStatus(status),
        publishedAt: status === "published" ? new Date() : undefined,
      },
    }),
  );
}
