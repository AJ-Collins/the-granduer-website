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
  eventTypeName?: string | null;
  preferredDate?: Date;
  altDate?: Date;
  guests?: number;
  eventTime?: string | null;
  packageInterest?: string | null;
  services?: string[];
  budget?: string | null;
  source?: string | null;
  details?: string | null;
  trafficSource?: string;
  medium?: string;
  campaign?: string;
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
  eventTypeName: string | null;
  preferredDate: Date | null;
  altDate: Date | null;
  guests: number | null;
  eventTime: string | null;
  packageInterest: string | null;
  services: string[];
  budget: string | null;
  source: string | null;
  details: string | null;
  trafficSource: string | null;
  medium: string | null;
  campaign: string | null;
  consent: boolean;
  flagged: boolean;
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

export type StoredOpportunityRow = {
  id: string;
  enquiryId: string;
  stage: "VIEWING_SCHEDULED" | "PROPOSAL_SENT" | "DATE_HELD" | "DEPOSIT_RECEIVED" | "CONTRACT_SIGNED" | "IN_PLANNING" | "DELIVERED" | "REVIEWED";
  stageChangedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type StoredStageTransitionRow = {
  id: string;
  opportunityId: string;
  from: StoredOpportunityRow["stage"] | null;
  to: StoredOpportunityRow["stage"];
  notes: string | null;
  actorId: string | null;
  createdAt: Date;
};

export type StoredRejectionRow = {
  id: string;
  kind: string | null;
  email: string | null;
  reason: string;
  createdAt: Date;
};
