import { z } from "zod";
import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { setPackageStatus } from "../services/set-package-status";

const statusSchema = z.object({ status: z.enum(["draft", "published", "archived"]) });

export async function setPackageStatusController(req: Request, id: string): Promise<Response> {
  const parsed = await parseBody(req, statusSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await setPackageStatus(id, parsed.data.status));
  } catch {
    return fail("NOT_FOUND", "Package not found", { status: 404 });
  }
}
