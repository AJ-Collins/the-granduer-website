import { listFaqsController } from "@/server/cms/controllers/faqs";

export async function GET() {
  return listFaqsController(true);
}
