import { countFlaggedEnquiries } from "../../persistence/queries/count-flagged-enquiries";

export async function getFlaggedEnquiryCount() {
  return countFlaggedEnquiries();
}
