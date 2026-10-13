import { selectContentBlocks } from "../../persistence/queries/select-content-blocks";

export async function listContentBlocks(publishedOnly: boolean) {
  return selectContentBlocks(publishedOnly);
}
