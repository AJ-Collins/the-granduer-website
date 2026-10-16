import { db } from "../../src/server/db/client";
import { advanceOpportunityStage } from "../../src/server/enquiries/services/opportunities/advance-opportunity-stage";
import { createOpportunity } from "../../src/server/enquiries/services/opportunities/create-opportunity";
import type { OpportunityStage } from "../../src/server/enquiries/services/opportunities/opportunity-stage";

const PIPELINE: { enquiryEmail: string; upto: OpportunityStage; notes: string[] }[] = [
  {
    enquiryEmail: "sophia.laurent@example.com",
    upto: "date_held",
    notes: ["Qualified on viewing visit", "Sent tailored wedding proposal", "Client held 14 June"],
  },
  {
    enquiryEmail: "james.okafor@example.com",
    upto: "proposal_sent",
    notes: ["Qualified on call", "Sent ceremony proposal"],
  },
  {
    enquiryEmail: "amelia.hart@example.com",
    upto: "contract_signed",
    notes: ["Qualified on viewing", "Sent christening proposal", "Date held for March", "Deposit received", "Contract signed"],
  },
  {
    enquiryEmail: "daniel.reyes@example.com",
    upto: "delivered",
    notes: ["Qualified at launch brief", "Sent AV proposal", "Date held", "Deposit received", "Contract signed", "Walkthrough done", "Event delivered"],
  },
  {
    enquiryEmail: "priya.nair@example.com",
    upto: "viewing_scheduled",
    notes: ["Qualified, viewing booked"],
  },
];

const ORDER: OpportunityStage[] = [
  "viewing_scheduled",
  "proposal_sent",
  "date_held",
  "deposit_received",
  "contract_signed",
  "in_planning",
  "delivered",
  "reviewed",
];

export async function seedOpportunities(enquiryIds: string[]) {
  const existing = await db.opportunity.count();
  if (existing > 0) {
    console.log(`opportunities already seeded (${existing}), skipping`);
    return;
  }
  const admin = await db.account.findFirst({ where: { email: { contains: "admin" } } });
  if (!admin) {
    console.log("opportunities skipped: no admin account to act as creator");
    return;
  }
  let ids = enquiryIds;
  if (ids.length === 0) {
    ids = (await db.enquiry.findMany({ select: { id: true } })).map((e) => e.id);
  }
  const byEmail = new Map(
    (await db.enquiry.findMany({ where: { id: { in: ids } }, select: { id: true, email: true } }))
      .map((e) => [e.email, e.id]),
  );
  let count = 0;
  for (const item of PIPELINE) {
    const enquiryId = byEmail.get(item.enquiryEmail);
    if (!enquiryId) continue;
    const created = await createOpportunity(enquiryId, admin.id, item.notes[0]);
    if (!created) continue;
    const target = ORDER.indexOf(item.upto);
    for (let i = 1; i <= target; i++) {
      await advanceOpportunityStage(created.id, ORDER[i], admin.id, item.notes[i]);
    }
    count++;
  }
  console.log(`opportunities seeded (${count})`);
}
