import { selectContentBlock } from "../../persistence/queries/select-content-block";

export async function getContentBlock(slug: string, publishedOnly: boolean) {
  return selectContentBlock(slug, publishedOnly);
}
