export type EnquiryKindDto = "viewing" | "proposal";
export type EnquiryStatusDto = "new" | "assigned" | "contacted" | "closed";

export interface SubmitEnquiryRequest {
  kind: EnquiryKindDto;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  eventDate?: string;
  eventTypeSlug?: string;
  packageSlug?: string;
}

export interface EnquiryDto extends SubmitEnquiryRequest {
  id: string;
  status: EnquiryStatusDto;
  assignedToId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Paginated<T> {
  data: T[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}

export interface ApiEnvelope<T> {
  ok: true;
  data: T;
}
