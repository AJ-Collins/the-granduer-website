import { notFound } from "../../../../core/errors/app-error.js";
import { assertPublishable } from "../../domain/rules/catalog.rules.js";
import type {
  EventTypeInput,
  EventTypeRepository,
  PackageInput,
  PackageRepository,
} from "../ports/catalog.repository.js";

// Public reads — published only, no auth needed (routes stay public).
export function makeListPublishedPackages(repo: PackageRepository) {
  return () => repo.listPublished();
}
export function makeGetPublishedPackage(repo: PackageRepository) {
  return async (slug: string) => {
    const pkg = await repo.findBySlug(slug);
    if (!pkg || pkg.status !== "published") throw notFound("Package");
    return pkg;
  };
}
export function makeListPublishedEventTypes(repo: EventTypeRepository) {
  return () => repo.listPublished();
}
export function makeGetPublishedEventType(repo: EventTypeRepository) {
  return async (slug: string) => {
    const event = await repo.findBySlug(slug);
    if (!event || event.status !== "published") throw notFound("Event type");
    return event;
  };
}

// CMS writes — routes enforce cms.access + catalog.manage.
export function makeCreatePackage(repo: PackageRepository) {
  return async (input: PackageInput) => {
    assertPublishable({ name: input.name, slug: input.slug, priceCents: input.priceCents });
    return repo.create(input);
  };
}
export function makeUpdatePackage(repo: PackageRepository) {
  return async (id: string, patch: Partial<PackageInput>) => {
    const current = await repo.update(id, patch);
    if (!current) throw notFound("Package");
    return current;
  };
}
export function makeSetPackageStatus(repo: PackageRepository) {
  return async (id: string, status: "published" | "draft" | "archived") => {
    const updated = await repo.setStatus(id, status);
    if (!updated) throw notFound("Package");
    return updated;
  };
}
export function makeCreateEventType(repo: EventTypeRepository) {
  return async (input: EventTypeInput) => {
    assertPublishable({ name: input.name, slug: input.slug });
    return repo.create(input);
  };
}
export function makeUpdateEventType(repo: EventTypeRepository) {
  return async (id: string, patch: Partial<EventTypeInput>) => {
    const updated = await repo.update(id, patch);
    if (!updated) throw notFound("Event type");
    return updated;
  };
}
export function makeSetEventTypeStatus(repo: EventTypeRepository) {
  return async (id: string, status: "published" | "draft" | "archived") => {
    const updated = await repo.setStatus(id, status);
    if (!updated) throw notFound("Event type");
    return updated;
  };
}
