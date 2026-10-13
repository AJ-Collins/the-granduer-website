import { listGalleryController } from "@/server/cms/controllers/gallery/list-gallery";

export async function GET() {
  return listGalleryController(true);
}
