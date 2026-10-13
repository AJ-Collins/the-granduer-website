// Public boundary for the enquiries feature. Other contexts may import
// ONLY from this file — never from domain/application/infrastructure/presentation.
export type { Enquiry, EnquiryKind, EnquiryStatus } from "./domain/entities/enquiry.js";
export type { EnquiryRepository } from "./domain/repositories/enquiry.repository.js";
export type { SubmitEnquiryInput } from "./application/dto/submit-enquiry.dto.js";
export type {
  AssignEnquiry,
  GetManagedEnquiry,
  ListManagedEnquiries,
  UpdateEnquiryStatus,
} from "./application/use-cases/manage-enquiries.js";
export { enquiriesModule } from "./enquiries.module.js";
