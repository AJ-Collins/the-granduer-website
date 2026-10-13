import { createEnquiry } from "@/server/enquiries/controllers/intake/create-enquiry";

export async function POST(req: Request) {
  return createEnquiry(req);
}
