import { ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { createPackage } from "../services/create-package";
import { packageBodySchema } from "../requests/read-package-body";

export async function createPackageController(req: Request): Promise<Response> {
  const parsed = await parseBody(req, packageBodySchema);
  if ("response" in parsed) return parsed.response;
  return ok(await createPackage(parsed.data), { status: 201 });
}
