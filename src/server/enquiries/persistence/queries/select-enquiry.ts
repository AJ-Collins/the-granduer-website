import { db } from "../../../db/client";
import { toEnquiryRecord } from "../mappers/to-enquiry-record";

export async function selectEnquiry(id: string) {
  const row = await db.enquiry.findUnique({ where: { id } });
  return row ? toEnquiryRecord(row) : null;
}
