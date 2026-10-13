import { db } from "../../../db/client";
import { toPackage } from "../mappers/to-package";

export async function selectPackageBySlug(slug: string) {
  const row = await db.package.findUnique({ where: { slug } });
  return row ? toPackage(row) : null;
}
