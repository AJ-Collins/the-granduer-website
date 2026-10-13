import type { Enquiry } from "../../domain/entities/enquiry.js";

/** Maps persistence rows to domain objects. */
export function toDomainEnquiry(row: Enquiry): Enquiry {
  return { ...row };
}
