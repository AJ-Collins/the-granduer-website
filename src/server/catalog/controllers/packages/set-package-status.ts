import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { setPackageStatus } from "../../services/packages/set-package-status";

import { publishStatusSchema } from "../../requests/read-status-body";

export async function setPackageStatusController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, publishStatusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await setPackageStatus(id, parsed.data.status));
  } catch {
    return fail("NOT_FOUND", "Package not found", { status: 404 });
  }
}
