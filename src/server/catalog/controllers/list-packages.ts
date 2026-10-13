import { ok } from "../../http/api-response";
import { listPackages } from "../services/list-packages";

export async function listPackagesController(publishedOnly: boolean): Promise<Response> {
  return ok(await listPackages(publishedOnly));
}
