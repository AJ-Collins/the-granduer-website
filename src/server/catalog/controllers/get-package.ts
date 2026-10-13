import { fail, ok } from "../../http/api-response";
import { getPackage } from "../services/get-package";

export async function getPackageController(slug: string, publishedOnly: boolean): Promise<Response> {
  const pkg = await getPackage(slug, publishedOnly);
  if (!pkg) return fail("NOT_FOUND", "Package not found", { status: 404 });
  return ok(pkg);
}
