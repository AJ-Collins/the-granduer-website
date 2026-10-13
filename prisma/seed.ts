import { db } from "../src/server/db/client";
import { seedAdmin } from "./seed/admin";
import { seedCatalog } from "./seed/catalog";
import { seedContent } from "./seed/content";
import { seedRoles } from "./seed/roles";

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
