import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getManagedEnquiry } from "../../../enquiries/services/managed/get-managed-enquiry";

export async function getSubmissionController(id: string): Promise<Response> {
  const enquiry = await getManagedEnquiry(id);
  if (!enquiry) return fail("NOT_FOUND", "Submission not found", { status: 404 });
  return ok(enquiry);
}
