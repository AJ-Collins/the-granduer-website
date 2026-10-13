import { ok } from "../../http/api-response";
import { listGallery } from "../services/gallery";

export async function listGalleryController(publishedOnly: boolean) {
  return ok(await listGallery(publishedOnly));
}
