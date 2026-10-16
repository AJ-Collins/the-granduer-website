import { db } from "../src/server/db/client";
import { seedAdmin } from "./seed/admin";
import { seedCatalog } from "./seed/catalog";
import { seedContent } from "./seed/content";
import { seedOpportunities } from "./seed/opportunities";
import { seedOutbox } from "./seed/outbox";
import { seedRoles } from "./seed/roles";
import { seedSubmissionRejections, seedSubmissions } from "./seed/submissions";

async function main() {
  await seedRoles();
  await seedAdmin();
  await seedCatalog();
  await seedContent();
  await seedOutbox();
  const enquiryIds = await seedSubmissions();
  await seedSubmissionRejections();
  await seedOpportunities(enquiryIds);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
