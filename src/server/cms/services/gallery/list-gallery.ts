import { selectGallery } from "../../persistence/queries/select-gallery";

export async function listGallery(publishedOnly: boolean) {
  return selectGallery(publishedOnly);
}
