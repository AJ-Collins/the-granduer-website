export type EnquiryKind = "viewing" | "proposal";
export type EnquiryStatus = "new" | "assigned" | "contacted" | "closed";

export interface Enquiry {
  id: string;
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  eventDate: Date | null;
  eventTypeId: string | null;
  packageId: string | null;
  status: EnquiryStatus;
  assignedToId: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type EnquiryFilter = {
  status?: EnquiryStatus;
};
