import { listGalleryController } from "@/server/cms/controllers/gallery";

export async function GET() {
  return listGalleryController(true);
}
