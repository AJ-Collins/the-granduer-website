import { listEventTypesController } from "@/server/catalog/controllers/event-types";

export async function GET() {
  return listEventTypesController(true);
}
