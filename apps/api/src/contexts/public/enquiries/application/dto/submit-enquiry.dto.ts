import type { EnquiryKind } from "../../domain/entities/enquiry.js";

export type SubmitEnquiryInput = {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  eventDate?: Date;
  eventTypeSlug?: string;
  packageSlug?: string;
};
