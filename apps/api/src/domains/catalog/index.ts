// Shared catalog boundary: cms/ publishes through it, public/ reads through it.
// Both contexts import ONLY from this file — one domain, no duplicated repositories.
export type { EventType, Package, PackageTier, PublishState } from "./domain/entities/catalog.js";
export type {
  CatalogLookup,
  EventTypeInput,
  EventTypeRepository,
  PackageInput,
  PackageRepository,
} from "./application/ports/catalog.repository.js";
export {
  PrismaCatalogLookup,
  PrismaEventTypeRepository,
  PrismaPackageRepository,
} from "./infrastructure/persistence/prisma-catalog.repository.js";
