import { selectOpportunity } from "../../persistence/queries/select-opportunity";

export async function getOpportunity(id: string) {
  return selectOpportunity(id);
}
