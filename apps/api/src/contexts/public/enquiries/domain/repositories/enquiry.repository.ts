import type { Enquiry, EnquiryFilter } from "../entities/enquiry.js";

/** Persistence port owned by the enquiries domain. Implemented in infrastructure/. */
export interface EnquiryRepository {
  save(input: {
    kind: Enquiry["kind"];
    name: string;
    email: string;
    phone?: string;
    message?: string;
    eventDate?: Date;
    eventTypeId?: string;
    packageId?: string;
  }): Promise<Enquiry>;
  findById(id: string): Promise<Enquiry | null>;
  list(page: number, pageSize: number, filter?: EnquiryFilter): Promise<{ items: Enquiry[]; total: number }>;
  assign(id: string, assignedToId: string | null): Promise<Enquiry>;
  setStatus(id: string, status: Enquiry["status"], notes?: string): Promise<Enquiry>;
}
