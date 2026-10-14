import { InvalidEnquiryTransitionError } from "../errors/invalid-enquiry-transition-error";

export type EnquiryStatus = "new" | "assigned" | "contacted" | "closed";

const TRANSITIONS: Record<EnquiryStatus, EnquiryStatus[]> = {
  new: ["assigned", "closed"],
  assigned: ["contacted", "closed"],
  contacted: ["closed"],
  closed: [],
};

export function assertEnquiryTransition(from: EnquiryStatus, to: EnquiryStatus): void {
  if (!TRANSITIONS[from].includes(to)) throw new InvalidEnquiryTransitionError(from, to);
}
