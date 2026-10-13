import type { Package, StoredPackageRow } from "../rows";

export function toPackage(row: StoredPackageRow): Package {
  return {
    ...row,
    tier: row.tier.toLowerCase() as Package["tier"],
    status: row.status.toLowerCase() as Package["status"],
  };
}
