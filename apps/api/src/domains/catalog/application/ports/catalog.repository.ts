import type { EventType, Package, PackageTier, PublishState } from "../../domain/entities/catalog.js";

export type PackageInput = {
  slug: string;
  name: string;
  tier: PackageTier;
  tagline?: string | null;
  description?: string | null;
  priceCents?: number | null;
  currency?: string;
  inclusions?: unknown;
  sortOrder?: number;
};

export interface PackageRepository {
  listPublished(): Promise<Package[]>;
  listAll(): Promise<Package[]>;
  findById(id: string): Promise<Package | null>;
  findBySlug(slug: string): Promise<Package | null>;
  create(input: PackageInput): Promise<Package>;
  update(id: string, patch: Partial<PackageInput>): Promise<Package>;
  setStatus(id: string, status: PublishState): Promise<Package>;
}

export type EventTypeInput = {
  slug: string;
  name: string;
  description?: string | null;
  sortOrder?: number;
};

export interface EventTypeRepository {
  listPublished(): Promise<EventType[]>;
  listAll(): Promise<EventType[]>;
  findById(id: string): Promise<EventType | null>;
  findBySlug(slug: string): Promise<EventType | null>;
  create(input: EventTypeInput): Promise<EventType>;
  update(id: string, patch: Partial<EventTypeInput>): Promise<EventType>;
  setStatus(id: string, status: PublishState): Promise<EventType>;
}

/** Slim lookup used by the enquiries submit use-case (slug -> id, published only). */
export interface CatalogLookup {
  publishedPackageId(slug: string): Promise<string | null>;
  publishedEventTypeId(slug: string): Promise<string | null>;
}
