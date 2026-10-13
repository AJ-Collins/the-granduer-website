import { selectFaqs } from "../../persistence/queries/select-faqs";

export async function listFaqs(publishedOnly: boolean) {
  return selectFaqs(publishedOnly);
}
