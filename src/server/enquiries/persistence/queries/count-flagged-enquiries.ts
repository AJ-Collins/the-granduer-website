import { db } from "../../../db/client";

export async function countFlaggedEnquiries() {
  return db.enquiry.count({ where: { flagged: true } });
}
