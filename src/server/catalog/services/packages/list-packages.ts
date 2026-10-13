import { selectPackages } from "../../persistence/queries/select-packages";
import type { Package } from "../../persistence/rows";

export async function listPackages(publishedOnly: boolean): Promise<Package[]> {
  return selectPackages(publishedOnly);
}
