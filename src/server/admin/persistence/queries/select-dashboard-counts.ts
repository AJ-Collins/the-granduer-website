import { db } from "../../../db/client";

/** Consistent snapshot: all counts read in one read-only transaction. */
export async function selectDashboardCounts() {
  const [users, enquiriesNew, enquiriesTotal, packages, events] = await db.$transaction([
    db.account.count(),
    db.enquiry.count({ where: { status: "NEW" } }),
    db.enquiry.count(),
    db.package.count({ where: { status: "PUBLISHED" } }),
    db.eventType.count({ where: { status: "PUBLISHED" } }),
  ]);
  return { users, enquiriesNew, enquiriesTotal, publishedPackages: packages, publishedEvents: events };
}
