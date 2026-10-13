import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { updatePackage } from "../services/update-package";
import { packagePatchSchema } from "../requests/read-package-body";

export async function updatePackageController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, packagePatchSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await updatePackage(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Package not found", { status: 404 });
  }
}
