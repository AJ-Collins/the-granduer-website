import { db } from "@dgrandeur/db";
import type { Enquiry, EnquiryFilter, EnquiryKind, EnquiryStatus } from "../../domain/entities/enquiry.js";
import type { EnquiryRepository } from "../../domain/repositories/enquiry.repository.js";

type Row = {
  id: string;
  kind: "VIEWING" | "PROPOSAL";
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  eventDate: Date | null;
  eventTypeId: string | null;
  packageId: string | null;
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED";
  assignedToId: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function toDomain(row: Row): Enquiry {
  return {
    ...row,
    kind: row.kind.toLowerCase() as EnquiryKind,
    status: row.status.toLowerCase() as EnquiryStatus,
  };
}

export class PrismaEnquiryRepository implements EnquiryRepository {
  async save(input: {
    kind: EnquiryKind; name: string; email: string; phone?: string;
    message?: string; eventDate?: Date; eventTypeId?: string; packageId?: string;
  }): Promise<Enquiry> {
    return toDomain(
      await db.enquiry.create({
        data: {
          kind: input.kind.toUpperCase() as Row["kind"],
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          message: input.message ?? null,
          eventDate: input.eventDate ?? null,
          eventTypeId: input.eventTypeId ?? null,
          packageId: input.packageId ?? null,
        },
      }),
    );
  }

  async findById(id: string): Promise<Enquiry | null> {
    const row = await db.enquiry.findUnique({ where: { id } });
    return row ? toDomain(row) : null;
  }

  async list(page: number, pageSize: number, filter?: EnquiryFilter) {
    const where = filter?.status ? { status: filter.status.toUpperCase() as Row["status"] } : {};
    const [rows, total] = await Promise.all([
      db.enquiry.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.enquiry.count({ where }),
    ]);
    return { items: rows.map(toDomain), total };
  }

  async assign(id: string, assignedToId: string | null): Promise<Enquiry> {
    return toDomain(await db.enquiry.update({ where: { id }, data: { assignedToId } }));
  }

  async setStatus(id: string, status: EnquiryStatus, notes?: string): Promise<Enquiry> {
    return toDomain(
      await db.enquiry.update({
        where: { id },
        data: {
          status: status.toUpperCase() as Row["status"],
          ...(notes !== undefined && { notes }),
        },
      }),
    );
  }
}
