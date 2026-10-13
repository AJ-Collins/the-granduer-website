import { createEnquiry } from "@/server/enquiries/controllers/create-enquiry";

export async function POST(req: Request) {
  return createEnquiry(req);
}
