import { db } from "../../../db/client";

export async function insertSubmissionRejection(input: {
  kind?: string;
  email?: string;
  reason: string;
}) {
  return db.submissionRejection.create({
    data: {
      ...(input.kind !== undefined && { kind: input.kind }),
      ...(input.email !== undefined && { email: input.email }),
      reason: input.reason,
    },
  });
}
