import { updatePackage as updatePackageRow } from "../../persistence/queries/update-package";
import type { PackagePatch } from "../../requests/read-package-patch-body";

export async function updatePackage(id: string, patch: PackagePatch) {
  return updatePackageRow(id, patch);
}
