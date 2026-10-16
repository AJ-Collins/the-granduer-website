import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import { toEnquiryRecord } from "../mappers/to-enquiry-record";

export type EnquiryFilters = {
  status?: string;
  kind?: "viewing" | "proposal";
  flagged?: boolean;
};

export async function selectEnquiries(page: number, pageSize: number, filters: EnquiryFilters = {}) {
  const where: Prisma.EnquiryWhereInput = {
    ...(filters.status && {
      status: filters.status.toUpperCase() as "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED",
    }),
    ...(filters.kind && { kind: filters.kind.toUpperCase() as "VIEWING" | "PROPOSAL" }),
    ...(filters.flagged !== undefined && { flagged: filters.flagged }),
  };
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
