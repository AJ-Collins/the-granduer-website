import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { updatePackage } from "../../services/packages/update-package";
import { packagePatchSchema } from "../../requests/read-package-patch-body";

export async function updatePackageController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, packagePatchSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await updatePackage(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "Package not found", { status: 404 });
  }
}
