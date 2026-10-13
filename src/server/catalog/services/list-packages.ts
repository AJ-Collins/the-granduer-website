import { db } from "../../db/client";
import type { Package } from "./catalog-types";

const ORDER = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

type Row = {
  id: string; slug: string; name: string;
  tier: "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE";
  tagline: string | null; description: string | null;
  priceCents: number | null; currency: string; inclusions: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; sortOrder: number;
};

export function toPackage(row: Row): Package {
  return {
    ...row,
    tier: row.tier.toLowerCase() as Package["tier"],
    status: row.status.toLowerCase() as Package["status"],
  };
}

export async function listPackages(publishedOnly: boolean): Promise<Package[]> {
  const rows = await db.package.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: ORDER,
  });
  return rows.map(toPackage);
}
