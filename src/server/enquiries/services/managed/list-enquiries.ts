import { selectEnquiries } from "../../persistence/queries/select-enquiries";

export async function listEnquiries(page: number, pageSize: number, status?: string) {
  return selectEnquiries(page, pageSize, status);
}
