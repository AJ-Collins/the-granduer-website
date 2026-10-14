import { db } from "../../../db/client";

export async function selectFaqByQuestion(question: string) {
  return db.faq.findFirst({ where: { question } });
}
