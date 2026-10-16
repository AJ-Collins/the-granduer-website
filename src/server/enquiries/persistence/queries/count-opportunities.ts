import { db } from "../../../db/client";

export async function countOpportunities() {
  return db.opportunity.count();
}
