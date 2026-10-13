import { db } from "../../db/client";
import { toPackage } from "./list-packages";
import type { Package } from "./catalog-types";

export async function getPackage(slug: string, publishedOnly: boolean): Promise<Package | null> {
  const row = await db.package.findUnique({ where: { slug } });
  if (!row) return null;
  const pkg = toPackage(row);
  if (publishedOnly && pkg.status !== "published") return null;
  return pkg;
}
