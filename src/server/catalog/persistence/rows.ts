export type PublishState = "draft" | "published" | "archived";
export type PackageTier = "essential" | "classic" | "signature" | "bespoke";

export type Package = {
  id: string;
  slug: string;
  name: string;
  tier: PackageTier;
  tagline: string | null;
  description: string | null;
  priceCents: number | null;
  currency: string;
  inclusions: unknown;
  status: PublishState;
  sortOrder: number;
};

export type EventType = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: PublishState;
  sortOrder: number;
};

export type StoredPackageRow = {
  id: string;
  slug: string;
  name: string;
  tier: "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE";
  tagline: string | null;
  description: string | null;
  priceCents: number | null;
  currency: string;
  inclusions: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
};

export type StoredEventRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  sortOrder: number;
};
