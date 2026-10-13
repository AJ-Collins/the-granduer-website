import { updatePackageStatus } from "../../persistence/queries/update-package-status";
import type { PublishState } from "../../persistence/rows";

export async function setPackageStatus(id: string, status: PublishState) {
  return updatePackageStatus(id, status);
}
