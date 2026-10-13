import { insertPackage } from "../../persistence/queries/insert-package";
import type { PackageInput } from "../../requests/read-package-body";

export async function createPackage(input: PackageInput) {
  return insertPackage(input);
}
