import { enquiryAckMail } from "../../../email/templates/enquiry-ack";
import { submitEnquiryWithAck } from "../../persistence/transactions/submit-enquiry-with-ack";
import { toSubmitEnquiryRecord } from "../../persistence/mappers/to-submit-enquiry-record";
import type { EnquiryBody } from "../../requests/read-enquiry-body";

export async function submitEnquiry(input: EnquiryBody, idempotency?: { recordId: string }) {
  const mail = enquiryAckMail(input.name, input.kind);
  return submitEnquiryWithAck(toSubmitEnquiryRecord(input, mail, idempotency));
}
