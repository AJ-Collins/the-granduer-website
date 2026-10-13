import { db } from "../../db/client";

export async function getDashboardStats() {
  const [users, enquiriesNew, enquiriesTotal, packages, events] = await Promise.all([
    db.account.count(),
    db.enquiry.count({ where: { status: "NEW" } }),
    db.enquiry.count(),
    db.package.count({ where: { status: "PUBLISHED" } }),
    db.eventType.count({ where: { status: "PUBLISHED" } }),
  ]);
  return { users, enquiriesNew, enquiriesTotal, publishedPackages: packages, publishedEvents: events };
}
