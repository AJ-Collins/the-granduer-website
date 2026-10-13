export type EnquiryKindDto = "viewing" | "proposal";
export type EnquiryStatusDto = "new" | "assigned" | "contacted" | "closed";

export interface EnquiryDto {
  id: string;
  kind: EnquiryKindDto;
  name: string;
  email: string;
  phone: string | null;
  message: string | null;
  eventDate: string | null;
  status: EnquiryStatusDto;
  assignedToId: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUserDto {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "suspended" | "deactivated";
  roles: string[];
}

export interface RoleDto {
  id: string;
  key: string;
  label: string;
  permissions: string[];
}

export interface AuditRecordDto {
  id: string;
  actorId: string | null;
  action: string;
  entityType: string;
  entityId: string | null;
  metadata: unknown;
  createdAt: string;
}

export interface AccountDto {
  id: string;
  email: string;
  name: string | null;
  roles: string[];
  permissions: string[];
}

export type PublishStateDto = "draft" | "published" | "archived";
export type PackageTierDto = "essential" | "classic" | "signature" | "bespoke";

export interface PackageDto {
  id: string;
  slug: string;
  name: string;
  tier: PackageTierDto;
  tagline: string | null;
  description: string | null;
  priceCents: number | null;
  currency: string;
  inclusions: unknown;
  status: PublishStateDto;
  sortOrder: number;
}

export interface EventTypeDto {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: PublishStateDto;
  sortOrder: number;
}
