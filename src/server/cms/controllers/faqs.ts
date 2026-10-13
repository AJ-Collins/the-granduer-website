import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { listFaqs, upsertFaq } from "../services/faqs";
import { faqBodySchema } from "../requests/read-faq-body";

export async function listFaqsController(publishedOnly: boolean) {
  return ok(await listFaqs(publishedOnly));
}

export async function upsertFaqController(req: Request, id: string | null) {
  const parsed = await parseBody(req, faqBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await upsertFaq(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "FAQ not found", { status: 404 });
  }
}
