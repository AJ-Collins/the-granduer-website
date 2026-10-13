import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { upsertFaq } from "../../services/faqs/upsert-faq";
import { faqBodySchema } from "../../requests/read-faq-body";

export async function upsertFaqController(req: Request, id: string | null) {
  const parsed = await parseBody(req, faqBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await upsertFaq(id, parsed.data));
  } catch {
    return fail("NOT_FOUND", "FAQ not found", { status: 404 });
  }
}
