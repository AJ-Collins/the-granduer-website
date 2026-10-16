import { enquiryAckMail } from "../../../email/templates/enquiry-ack";
import { submitEnquiryWithAck } from "../../persistence/transactions/submit-enquiry-with-ack";
import { toSubmitEnquiryRecord } from "../../persistence/mappers/to-submit-enquiry-record";
import type { EnquiryBody } from "../../requests/read-enquiry-body";
import { detectSubmissionSpam } from "./detect-submission-spam";

export async function submitEnquiry(input: EnquiryBody, idempotency?: { recordId: string }) {
  const mail = enquiryAckMail(input.data.name, input.kind);
  const flagged = detectSubmissionSpam(input);
  return submitEnquiryWithAck(toSubmitEnquiryRecord(input, mail, idempotency), flagged);
}
