import { db } from "../../db/client";
import { recordAudit } from "../../audit/services/record-audit";
import { assertEnquiryTransition, type EnquiryStatus } from "./enquiry-status";
import { toEnquiry } from "./submit-enquiry";

export async function getEnquiry(id: string) {
  const row = await db.enquiry.findUnique({ where: { id } });
  return row ? toEnquiry(row) : null;
}

export async function assignEnquiry(id: string, assignedToId: string | null, actorId: string) {
  const current = await db.enquiry.findUnique({ where: { id } });
  if (!current) return null;
  const updated = await db.enquiry.update({ where: { id }, data: { assignedToId } });
  await recordAudit({
    actorId,
    action: "enquiry.assigned",
    entityType: "enquiry",
    entityId: id,
    metadata: { from: current.assignedToId, to: assignedToId },
  });
  return toEnquiry(updated);
}

export async function setEnquiryStatus(
  id: string,
  status: EnquiryStatus,
  actorId: string,
  notes?: string,
) {
  const current = await db.enquiry.findUnique({ where: { id } });
  if (!current) return null;
  assertEnquiryTransition(current.status.toLowerCase() as EnquiryStatus, status);
  const updated = await db.enquiry.update({
    where: { id },
    data: {
      status: status.toUpperCase() as "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED",
      ...(notes !== undefined && { notes }),
    },
  });
  await recordAudit({
    actorId,
    action: "enquiry.status-changed",
    entityType: "enquiry",
    entityId: id,
    metadata: { from: current.status.toLowerCase(), to: status },
  });
  return toEnquiry(updated);
}
