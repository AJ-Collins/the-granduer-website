import { upsertSeedPackage } from "../../src/server/catalog/persistence/queries/upsert-seed-package";
import { upsertSeedEventType } from "../../src/server/catalog/persistence/queries/upsert-seed-event-type";

export async function seedCatalog() {
  const packages = [
    { slug: "essential", name: "Essential", tier: "essential" as const, tagline: "Intimate events, beautifully simple", priceCents: 150000, sortOrder: 1 },
    { slug: "classic", name: "Classic", tier: "classic" as const, tagline: "Timeless celebration, fully hosted", priceCents: 350000, sortOrder: 2 },
    { slug: "signature", name: "Signature", tier: "signature" as const, tagline: "Our grandest in-house production", priceCents: 750000, sortOrder: 3 },
    { slug: "bespoke", name: "Bespoke", tier: "bespoke" as const, tagline: "Designed around you, from a blank page", priceCents: null, sortOrder: 4 },
  ];
  for (const p of packages) await upsertSeedPackage({ ...p, published: true });
  const events = [
    { slug: "weddings", name: "Weddings", sortOrder: 1 },
    { slug: "corporate", name: "Corporate Events", sortOrder: 2 },
    { slug: "private-celebrations", name: "Private Celebrations", sortOrder: 3 },
  ];
  for (const e of events) await upsertSeedEventType({ ...e, published: true });
  console.log("catalog seeded");
}
