import { db } from "../src/index.js";
import { hashPassword } from "@dgrandeur/auth";
import { ROLE_PERMISSIONS } from "@dgrandeur/authorization";

const ROLE_LABELS: Record<string, string> = {
  superadmin: "Super Admin",
  admin: "Admin",
  editor: "Editor",
  viewer: "Viewer",
};

async function seedRoles() {
  for (const [key, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    await db.role.upsert({
      where: { key },
      update: { label: ROLE_LABELS[key], permissions },
      create: { key, label: ROLE_LABELS[key], permissions },
    });
  }
  console.log("roles seeded:", Object.keys(ROLE_PERMISSIONS).join(", "));
}

async function seedAdmin() {
  const email = process.env.SEED_ADMIN_EMAIL ?? "admin@dgrandeur.com";
  const password = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMe123!";
  if (!process.env.SEED_ADMIN_PASSWORD) {
    console.warn("WARNING: using default seed admin password — set SEED_ADMIN_PASSWORD.");
  }
  const superadmin = await db.role.findUniqueOrThrow({ where: { key: "superadmin" } });
  await db.account.upsert({
    where: { email },
    update: {},
    create: {
      email,
      passwordHash: await hashPassword(password),
      name: "Site Administrator",
      roles: { create: [{ roleId: superadmin.id }] },
    },
  });
  console.log("admin seeded:", email);
}

async function seedCatalog() {
  const packages = [
    { slug: "essential", name: "Essential", tier: "ESSENTIAL" as const, tagline: "Intimate events, beautifully simple", priceCents: 150000, sortOrder: 1 },
    { slug: "classic", name: "Classic", tier: "CLASSIC" as const, tagline: "Timeless celebration, fully hosted", priceCents: 350000, sortOrder: 2 },
    { slug: "signature", name: "Signature", tier: "SIGNATURE" as const, tagline: "Our grandest in-house production", priceCents: 750000, sortOrder: 3 },
    { slug: "bespoke", name: "Bespoke", tier: "BESPOKE" as const, tagline: "Designed around you, from a blank page", priceCents: null, sortOrder: 4 },
  ];
  for (const p of packages) {
    await db.package.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, status: "PUBLISHED", publishedAt: new Date(), currency: "GBP" },
    });
  }
  const events = [
    { slug: "weddings", name: "Weddings", sortOrder: 1 },
    { slug: "corporate", name: "Corporate Events", sortOrder: 2 },
    { slug: "private-celebrations", name: "Private Celebrations", sortOrder: 3 },
  ];
  for (const e of events) {
    await db.eventType.upsert({
      where: { slug: e.slug },
      update: {},
      create: { ...e, status: "PUBLISHED" },
    });
  }
  console.log("catalog seeded");
}

async function seedContent() {
  const faqs = [
    { question: "Where is D'Grandeur located?", answer: "Details of our venue and how to find us are on the venue page.", category: "Venue", sortOrder: 1 },
    { question: "How do I book a viewing?", answer: "Send a viewing enquiry and our team will arrange a time.", category: "Booking", sortOrder: 2 },
  ];
  for (const f of faqs) {
    const existing = await db.faq.findFirst({ where: { question: f.question } });
    if (!existing) await db.faq.create({ data: { ...f, status: "PUBLISHED" } });
  }
  console.log("content seeded");
}

async function main() {
  await seedRoles();
  await seedAdmin();
  await seedCatalog();
  await seedContent();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
