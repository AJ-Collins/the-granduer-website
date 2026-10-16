import { db } from "../../src/server/db/client";

type SeedSubmission = {
  kind: "VIEWING" | "PROPOSAL";
  name: string;
  email: string;
  phone: string;
  message: string;
  status: "NEW" | "ASSIGNED" | "CONTACTED" | "CLOSED";
  daysAgo: number;
};

const SUBMISSIONS: SeedSubmission[] = [
  { kind: "VIEWING", name: "Eleanor Vance", email: "eleanor.vance@example.com", phone: "+44 7700 900101", message: "Looking to view the Grand Hall for a June wedding, around 120 guests.", status: "NEW", daysAgo: 1 },
  { kind: "PROPOSAL", name: "Marcus Chen", email: "marcus.chen@example.com", phone: "+44 7700 900102", message: "Corporate gala for 300, need staging and lighting included.", status: "NEW", daysAgo: 2 },
  { kind: "VIEWING", name: "Priya Nair", email: "priya.nair@example.com", phone: "+44 7700 900103", message: "Viewing for a 50th birthday dinner, approx 40 guests.", status: "ASSIGNED", daysAgo: 4 },
  { kind: "PROPOSAL", name: "Goldman Events", email: "events@goldman-example.com", phone: "+44 7700 900104", message: "Annual tech summit afterparty, 500 guests, full buyout?", status: "ASSIGNED", daysAgo: 6 },
  { kind: "VIEWING", name: "Sophia Laurent", email: "sophia.laurent@example.com", phone: "+44 7700 900105", message: "Viewed last week, would like a tailored wedding proposal.", status: "CONTACTED", daysAgo: 9 },
  { kind: "PROPOSAL", name: "James Okafor", email: "james.okafor@example.com", phone: "+44 7700 900106", message: "Traditional engagement ceremony, 200 guests, December.", status: "CONTACTED", daysAgo: 12 },
  { kind: "VIEWING", name: "Amelia Hart", email: "amelia.hart@example.com", phone: "+44 7700 900107", message: "Christening lunch for 60, private dining room preferred.", status: "CLOSED", daysAgo: 20 },
  { kind: "PROPOSAL", name: "Daniel Reyes", email: "daniel.reyes@example.com", phone: "+44 7700 900108", message: "Product launch, 150 guests, need AV and branding walls.", status: "CLOSED", daysAgo: 30 },
];

export async function seedSubmissions() {
  const existing = await db.enquiry.count();
  if (existing > 0) {
    console.log(`submissions already seeded (${existing} enquiries), skipping`);
    return [];
  }
  const now = Date.now();
  const ids: string[] = [];
  for (const [i, s] of SUBMISSIONS.entries()) {
    const created = await db.enquiry.create({
      data: {
        kind: s.kind,
        name: s.name,
        email: s.email,
        phone: s.phone,
        message: s.message,
        status: s.status,
        eventTypeName: s.kind === "VIEWING" ? "Weddings" : "Corporate & Conferences",
        flagged: i === 2,
        consent: true,
        createdAt: new Date(now - s.daysAgo * 86_400_000),
      },
    });
    ids.push(created.id);
  }
  console.log(`submissions seeded (${ids.length} enquiries)`);
  return ids;
}

export async function seedSubmissionRejections() {
  const existing = await db.submissionRejection.count();
  if (existing > 0) {
    console.log(`submission rejections already seeded (${existing}), skipping`);
    return;
  }
  await db.submissionRejection.createMany({
    data: [
      { kind: "viewing", email: "spam-bot@example.com", reason: "rate-limit" },
      { reason: "validation" },
      { kind: "proposal", email: "junk@example.com", reason: "validation" },
    ],
  });
  console.log("submission rejections seeded (3)");
}
