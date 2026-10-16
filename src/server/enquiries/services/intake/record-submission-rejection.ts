import { insertSubmissionRejection } from "../../persistence/queries/insert-submission-rejection";

export async function recordSubmissionRejection(input: {
  kind?: string;
  email?: string;
  reason: string;
}) {
  return insertSubmissionRejection(input);
}
