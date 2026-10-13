export type EnquiryStatus = "new" | "assigned" | "contacted" | "closed";

const TRANSITIONS: Record<EnquiryStatus, EnquiryStatus[]> = {
  new: ["assigned", "closed"],
  assigned: ["contacted", "closed"],
  contacted: ["closed"],
  closed: [],
};

export class InvalidEnquiryTransitionError extends Error {
  readonly status = 400;
  constructor(from: string, to: string) {
    super(`Cannot move enquiry from ${from} to ${to}`);
    this.name = "InvalidEnquiryTransitionError";
  }
}

export function assertEnquiryTransition(from: EnquiryStatus, to: EnquiryStatus): void {
  if (!TRANSITIONS[from].includes(to)) throw new InvalidEnquiryTransitionError(from, to);
}
