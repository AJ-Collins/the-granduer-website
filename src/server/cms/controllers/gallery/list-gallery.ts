import { ok } from "../../../http/ok-response";
import { listGallery } from "../../services/gallery/list-gallery";

export async function listGalleryController(publishedOnly: boolean) {
  return ok(await listGallery(publishedOnly));
}
