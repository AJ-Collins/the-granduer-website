import { db } from "../../../db/client";

export async function countSubmissionRejections() {
  return db.submissionRejection.count();
}
