import { selectEnquiry } from "../../persistence/queries/select-enquiry";

export async function getManagedEnquiry(id: string) {
  return selectEnquiry(id);
}
