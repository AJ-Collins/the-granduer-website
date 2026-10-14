import { db } from "../../../db/client";

export async function selectRecentEnquiries() {
  return db.enquiry.findMany({
    take: 5,
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, status: true, createdAt: true, kind: true },
  });
}
