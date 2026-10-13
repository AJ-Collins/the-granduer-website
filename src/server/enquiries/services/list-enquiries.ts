import { db } from "../../db/client";
import { toEnquiry } from "./submit-enquiry";

export async function listEnquiries(page: number, pageSize: number, status?: string) {
  const where = status
    ? { status: status.toUpperCase() as "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED" }
    : {};
  const [rows, total] = await Promise.all([
    db.enquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.enquiry.count({ where }),
  ]);
  return { items: rows.map(toEnquiry), total };
}
