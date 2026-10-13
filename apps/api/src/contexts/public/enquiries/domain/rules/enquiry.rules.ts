import type { EnquiryStatus } from "../entities/enquiry.js";

const TRANSITIONS: Record<EnquiryStatus, EnquiryStatus[]> = {
  new: ["assigned", "closed"],
  assigned: ["contacted", "closed"],
  contacted: ["closed"],
  closed: [],
};

export function canTransition(from: EnquiryStatus, to: EnquiryStatus): boolean {
  return TRANSITIONS[from].includes(to);
}

export function assertTransition(from: EnquiryStatus, to: EnquiryStatus): void {
  if (!canTransition(from, to)) {
    throw new Error(`Invalid enquiry status transition: ${from} -> ${to}`);
  }
}
