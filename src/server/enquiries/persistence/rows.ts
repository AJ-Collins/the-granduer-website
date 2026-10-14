export type EnquiryKind = "viewing" | "proposal";

export type NewEnquiry = {
  kind: EnquiryKind;
  name: string;
  email: string;
  phone: string;
  message?: string;
  eventDate?: Date;
  eventTypeId?: string | null;
  packageId?: string | null;
};

export type StoredEnquiryRow = {
  id: string;
  kind: "VIEWING" | "PROPOSAL";
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  eventDate: Date | null;
  eventTypeId: string | null;
  packageId: string | null;
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED";
  assignedToId: string | null;
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type SubmitEnquiryRecord = NewEnquiry & {
  eventTypeSlug?: string;
  packageSlug?: string;
  ackSubject: string;
  ackText: string;
  ackHtml: string;
  idempotencyRecordId?: string;
};
