import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getManagedEnquiry } from "../../services/managed/get-managed-enquiry";

export async function getEnquiryController(id: string): Promise<Response> {
  const enquiry = await getManagedEnquiry(id);
  if (!enquiry) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
  return ok(enquiry);
}
