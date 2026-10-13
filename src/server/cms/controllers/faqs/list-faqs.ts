import { ok } from "../../../http/ok-response";
import { listFaqs } from "../../services/faqs/list-faqs";

export async function listFaqsController(publishedOnly: boolean) {
  return ok(await listFaqs(publishedOnly));
}
