import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { getContentBlock, listContentBlocks, upsertContentBlock } from "../services/content-blocks";
import { contentBodySchema } from "../requests/read-content-body";

export async function getContentBlockController(slug: string, publishedOnly: boolean) {
  const block = await getContentBlock(slug, publishedOnly);
  if (!block) return fail("NOT_FOUND", "Content not found", { status: 404 });
  return ok(block);
}

export async function listContentBlocksController(publishedOnly: boolean) {
  return ok(await listContentBlocks(publishedOnly));
}

export async function upsertContentBlockController(req: Request) {
  const parsed = await parseBody(req, contentBodySchema);
  if ("response" in parsed) return parsed.response;
  return ok(await upsertContentBlock(parsed.data));
}
