import { badRequest } from "../../../../../core/errors/app-error.js";
import type { AuditWriter } from "../../../../../shared/audit/audit-log.js";
import { assertTransition } from "../../domain/rules/enquiry.rules.js";
import type { Enquiry, EnquiryStatus } from "../../domain/entities/enquiry.js";
import { enquiryNotFound } from "../../domain/errors/enquiry.errors.js";
import type { EnquiryRepository } from "../../domain/repositories/enquiry.repository.js";

/**
 * CMS-side management use-cases. They live with the enquiries domain (one
 * owner) and are exposed through cms/ routes — not duplicated there.
 */
export function makeAssignEnquiry(repo: EnquiryRepository, audit: AuditWriter) {
  return async function assignEnquiry(
    id: string,
    assignedToId: string | null,
    actorId: string,
  ): Promise<Enquiry> {
    const current = await repo.findById(id);
    if (!current) throw enquiryNotFound(id);
    const updated = await repo.assign(id, assignedToId);
    await audit.record({
      actorId,
      action: "enquiry.assigned",
      entityType: "enquiry",
      entityId: id,
      metadata: { from: current.assignedToId, to: assignedToId },
    });
    return updated;
  };
}

export type AssignEnquiry = ReturnType<typeof makeAssignEnquiry>;

export function makeUpdateEnquiryStatus(repo: EnquiryRepository, audit: AuditWriter) {
  return async function updateEnquiryStatus(
    id: string,
    status: EnquiryStatus,
    actorId: string,
    notes?: string,
  ): Promise<Enquiry> {
    const current = await repo.findById(id);
    if (!current) throw enquiryNotFound(id);
    try {
      assertTransition(current.status, status);
    } catch {
      throw badRequest(`Cannot move enquiry from ${current.status} to ${status}`);
    }
    const updated = await repo.setStatus(id, status, notes);
    await audit.record({
      actorId,
      action: "enquiry.status-changed",
      entityType: "enquiry",
      entityId: id,
      metadata: { from: current.status, to: status },
    });
    return updated;
  };
}

export type UpdateEnquiryStatus = ReturnType<typeof makeUpdateEnquiryStatus>;

export function makeListManagedEnquiries(repo: EnquiryRepository) {
  return async function listManagedEnquiries(page: number, pageSize: number, status?: EnquiryStatus) {
    return repo.list(page, pageSize, status ? { status } : undefined);
  };
}

export type ListManagedEnquiries = ReturnType<typeof makeListManagedEnquiries>;

export function makeGetManagedEnquiry(repo: EnquiryRepository) {
  return async function getManagedEnquiry(id: string): Promise<Enquiry> {
    const enquiry = await repo.findById(id);
    if (!enquiry) throw enquiryNotFound(id);
    return enquiry;
  };
}

export type GetManagedEnquiry = ReturnType<typeof makeGetManagedEnquiry>;
