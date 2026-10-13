import { listPackagesController } from "@/server/catalog/controllers/list-packages";

export async function GET() {
  return listPackagesController(true);
}
