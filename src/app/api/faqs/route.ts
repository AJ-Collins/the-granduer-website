import { listFaqsController } from "@/server/cms/controllers/faqs/list-faqs";

export async function GET() {
  return listFaqsController(true);
}
