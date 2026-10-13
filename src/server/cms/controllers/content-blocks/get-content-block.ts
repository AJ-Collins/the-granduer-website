import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getContentBlock } from "../../services/content-blocks/get-content-block";

export async function getContentBlockController(slug: string, publishedOnly: boolean) {
  const block = await getContentBlock(slug, publishedOnly);
  if (!block) return fail("NOT_FOUND", "Content not found", { status: 404 });
  return ok(block);
}
