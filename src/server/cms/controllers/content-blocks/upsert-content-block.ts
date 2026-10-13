import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { upsertContentBlock } from "../../services/content-blocks/upsert-content-block";
import { contentBodySchema } from "../../requests/read-content-body";

export async function upsertContentBlockController(req: Request) {
  const parsed = await parseBody(req, contentBodySchema);
  if ("response" in parsed) return parsed.response;
  return ok(await upsertContentBlock(parsed.data));
}
