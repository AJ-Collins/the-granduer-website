import { selectPackageBySlug } from "../../persistence/queries/select-package-by-slug";

export async function getPackage(slug: string, publishedOnly: boolean) {
  const pkg = await selectPackageBySlug(slug);
  if (!pkg) return null;
  if (publishedOnly && pkg.status !== "published") return null;
  return pkg;
}
