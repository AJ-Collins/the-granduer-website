import { ok } from "../../../http/ok-response";
import { listPackages } from "../../services/packages/list-packages";

export async function listPackagesController(publishedOnly: boolean): Promise<Response> {
  return ok(await listPackages(publishedOnly));
}
