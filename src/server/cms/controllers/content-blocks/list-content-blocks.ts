import { ok } from "../../../http/ok-response";
import { listContentBlocks } from "../../services/content-blocks/list-content-blocks";

export async function listContentBlocksController(publishedOnly: boolean) {
  return ok(await listContentBlocks(publishedOnly));
}
