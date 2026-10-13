import { db } from "@dgrandeur/db";
import type { EventType, Package, PublishState } from "../../domain/entities/catalog.js";
import type {
  CatalogLookup,
  EventTypeInput,
  EventTypeRepository,
  PackageInput,
  PackageRepository,
} from "../../application/ports/catalog.repository.js";

function toPublishState(s: "DRAFT" | "PUBLISHED" | "ARCHIVED"): PublishState {
  return s.toLowerCase() as PublishState;
}
function toPrismaStatus(s: PublishState): "DRAFT" | "PUBLISHED" | "ARCHIVED" {
  return s.toUpperCase() as "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

type PackageRow = {
  id: string; slug: string; name: string;
  tier: "ESSENTIAL" | "CLASSIC" | "SIGNATURE" | "BESPOKE";
  tagline: string | null; description: string | null;
  priceCents: number | null; currency: string; inclusions: unknown;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; sortOrder: number;
};

type EventRow = {
  id: string; slug: string; name: string; description: string | null;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED"; sortOrder: number;
};

function toPackage(row: PackageRow): Package {
  return { ...row, tier: row.tier.toLowerCase() as Package["tier"], status: toPublishState(row.status) };
}
function toEventType(row: EventRow): EventType {
  return { ...row, status: toPublishState(row.status) };
}

export class PrismaPackageRepository implements PackageRepository {
  private order = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

  async listPublished(): Promise<Package[]> {
    return (await db.package.findMany({ where: { status: "PUBLISHED" }, orderBy: this.order })).map(toPackage);
  }
  async listAll(): Promise<Package[]> {
    return (await db.package.findMany({ orderBy: this.order })).map(toPackage);
  }
  async findById(id: string): Promise<Package | null> {
    const row = await db.package.findUnique({ where: { id } });
    return row ? toPackage(row) : null;
  }
  async findBySlug(slug: string): Promise<Package | null> {
    const row = await db.package.findUnique({ where: { slug } });
    return row ? toPackage(row) : null;
  }
  async create(input: PackageInput): Promise<Package> {
    return toPackage(
      await db.package.create({
        data: {
          slug: input.slug,
          name: input.name,
          tier: input.tier.toUpperCase() as PackageRow["tier"],
          tagline: input.tagline ?? null,
          description: input.description ?? null,
          priceCents: input.priceCents ?? null,
          currency: input.currency ?? "GBP",
          inclusions: input.inclusions === undefined ? undefined : (input.inclusions as object),
          sortOrder: input.sortOrder ?? 0,
        },
      }),
    );
  }
  async update(id: string, patch: Partial<PackageInput>): Promise<Package> {
    return toPackage(
      await db.package.update({
        where: { id },
        data: {
          ...(patch.slug !== undefined && { slug: patch.slug }),
          ...(patch.name !== undefined && { name: patch.name }),
          ...(patch.tier !== undefined && { tier: patch.tier.toUpperCase() as PackageRow["tier"] }),
          ...(patch.tagline !== undefined && { tagline: patch.tagline }),
          ...(patch.description !== undefined && { description: patch.description }),
          ...(patch.priceCents !== undefined && { priceCents: patch.priceCents }),
          ...(patch.currency !== undefined && { currency: patch.currency }),
          ...(patch.inclusions !== undefined && { inclusions: patch.inclusions as object }),
          ...(patch.sortOrder !== undefined && { sortOrder: patch.sortOrder }),
        },
      }),
    );
  }
  async setStatus(id: string, status: PublishState): Promise<Package> {
    return toPackage(
      await db.package.update({
        where: { id },
        data: {
          status: toPrismaStatus(status),
          publishedAt: status === "published" ? new Date() : undefined,
        },
      }),
    );
  }
}

export class PrismaEventTypeRepository implements EventTypeRepository {
  private order = [{ sortOrder: "asc" as const }, { name: "asc" as const }];

  async listPublished(): Promise<EventType[]> {
    return (await db.eventType.findMany({ where: { status: "PUBLISHED" }, orderBy: this.order })).map(toEventType);
  }
  async listAll(): Promise<EventType[]> {
    return (await db.eventType.findMany({ orderBy: this.order })).map(toEventType);
  }
  async findById(id: string): Promise<EventType | null> {
    const row = await db.eventType.findUnique({ where: { id } });
    return row ? toEventType(row) : null;
  }
  async findBySlug(slug: string): Promise<EventType | null> {
    const row = await db.eventType.findUnique({ where: { slug } });
    return row ? toEventType(row) : null;
  }
  async create(input: EventTypeInput): Promise<EventType> {
    return toEventType(
      await db.eventType.create({
        data: { ...input, description: input.description ?? null, sortOrder: input.sortOrder ?? 0 },
      }),
    );
  }
  async update(id: string, patch: Partial<EventTypeInput>): Promise<EventType> {
    return toEventType(await db.eventType.update({ where: { id }, data: patch }));
  }
  async setStatus(id: string, status: PublishState): Promise<EventType> {
    return toEventType(await db.eventType.update({ where: { id }, data: { status: toPrismaStatus(status) } }));
  }
}

export class PrismaCatalogLookup implements CatalogLookup {
  async publishedPackageId(slug: string): Promise<string | null> {
    const row = await db.package.findFirst({ where: { slug, status: "PUBLISHED" }, select: { id: true } });
    return row?.id ?? null;
  }
  async publishedEventTypeId(slug: string): Promise<string | null> {
    const row = await db.eventType.findFirst({ where: { slug, status: "PUBLISHED" }, select: { id: true } });
    return row?.id ?? null;
  }
}
