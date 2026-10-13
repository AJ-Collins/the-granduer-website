export class InvalidEnquiryTransitionError extends Error {
  readonly status = 400;
  constructor(from: string, to: string) {
    super(`Cannot move enquiry from ${from} to ${to}`);
    this.name = "InvalidEnquiryTransitionError";
  }
}
