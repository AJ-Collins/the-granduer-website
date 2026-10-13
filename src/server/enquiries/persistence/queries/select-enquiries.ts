import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import { toEnquiryRecord } from "../rows";

export async function selectEnquiries(page: number, pageSize: number, status?: string) {
  const where: Prisma.EnquiryWhereInput = status
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
  return { items: rows.map(toEnquiryRecord), total };
}
