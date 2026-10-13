import { fail, ok } from "../../http/api-response";
import { getEnquiry } from "../services/manage-enquiries";

export async function getEnquiryController(id: string): Promise<Response> {
  const enquiry = await getEnquiry(id);
  if (!enquiry) return fail("NOT_FOUND", "Enquiry not found", { status: 404 });
  return ok(enquiry);
}
