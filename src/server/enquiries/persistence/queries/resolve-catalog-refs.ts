import { UnknownCatalogRefError } from "../errors/unknown-catalog-ref-error";

type CatalogReader = {
  eventType: {
    findFirst(args: {
      where: { slug: string; status: "PUBLISHED" };
      select: { id: true };
    }): Promise<{ id: string } | null>;
  };
  package: {
    findFirst(args: {
      where: { slug: string; status: "PUBLISHED" };
      select: { id: true };
    }): Promise<{ id: string } | null>;
  };
};

/** Slug → id against published rows only. Throws on unknown refs. */
export async function resolveCatalogRefs(
  client: CatalogReader,
  input: { eventTypeSlug?: string; packageSlug?: string },
): Promise<{ eventTypeId: string | null; packageId: string | null }> {
  let eventTypeId: string | null = null;
  let packageId: string | null = null;
  if (input.eventTypeSlug) {
    const event = await client.eventType.findFirst({
      where: { slug: input.eventTypeSlug, status: "PUBLISHED" },
      select: { id: true },
    });
    if (!event) throw new UnknownCatalogRefError("event type");
    eventTypeId = event.id;
  }
  if (input.packageSlug) {
    const pkg = await client.package.findFirst({
      where: { slug: input.packageSlug, status: "PUBLISHED" },
      select: { id: true },
    });
    if (!pkg) throw new UnknownCatalogRefError("package");
    packageId = pkg.id;
  }
  return { eventTypeId, packageId };
}
