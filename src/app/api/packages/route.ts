import { listPackagesController } from "@/server/catalog/controllers/packages/list-packages";

export async function GET() {
  return listPackagesController(true);
}
