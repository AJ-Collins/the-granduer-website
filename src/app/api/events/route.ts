import { listEventTypesController } from "@/server/catalog/controllers/events/list-event-types";

export async function GET() {
  return listEventTypesController(true);
}
