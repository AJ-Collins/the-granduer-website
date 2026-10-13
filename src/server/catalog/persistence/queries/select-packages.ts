import { db } from "../../../db/client";
import { toPackage } from "../mappers/to-package";

const ORDER = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

export async function selectPackages(publishedOnly: boolean) {
  const rows = await db.package.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(toPackage);
}
