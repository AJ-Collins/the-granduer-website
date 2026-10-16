import { countSubmissionRejections } from "../../persistence/queries/count-submission-rejections";

export async function getSubmissionRejectionCount() {
  return countSubmissionRejections();
}
