import { db } from "../../db/client";
import { sendMail } from "../../email/services/send-mail";
import type { EnquiryBody } from "../requests/read-enquiry-body";

export class UnknownCatalogRefError extends Error {
  readonly status = 400;
  constructor(ref: string) {
    super(`Unknown ${ref}`);
    this.name = "UnknownCatalogRefError";
  }
}

export async function submitEnquiry(input: EnquiryBody) {
  let eventTypeId: string | null = null;
  let packageId: string | null = null;
  if (input.eventTypeSlug) {
    const event = await db.eventType.findFirst({
      where: { slug: input.eventTypeSlug, status: "PUBLISHED" },
      select: { id: true },
    });
    if (!event) throw new UnknownCatalogRefError("event type");
    eventTypeId = event.id;
  }
  if (input.packageSlug) {
    const pkg = await db.package.findFirst({
      where: { slug: input.packageSlug, status: "PUBLISHED" },
      select: { id: true },
    });
    if (!pkg) throw new UnknownCatalogRefError("package");
    packageId = pkg.id;
  }
  const row = await db.enquiry.create({
    data: {
      kind: input.kind.toUpperCase() as "VIEWING" | "PROPOSAL",
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message ?? null,
      eventDate: input.eventDate ? new Date(input.eventDate) : null,
      eventTypeId,
      packageId,
    },
  });
  await sendMail({
    to: row.email,
    subject: "We received your D'Grandeur enquiry",
    text: `Hi ${row.name}, thanks for your ${input.kind} request. Our team will respond shortly.`,
  });
  return toEnquiry(row);
}

type Row = {
  id: string; kind: "VIEWING" | "PROPOSAL"; name: string; email: string;
  phone: string | null; message: string | null; eventDate: Date | null;
  eventTypeId: string | null; packageId: string | null;
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED";
  assignedToId: string | null; notes: string | null;
  createdAt: Date; updatedAt: Date;
};

export function toEnquiry(row: Row) {
  return {
    ...row,
    kind: row.kind.toLowerCase(),
    status: row.status.toLowerCase(),
  };
}
