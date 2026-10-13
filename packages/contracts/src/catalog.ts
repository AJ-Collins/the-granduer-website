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
