import { enquiryAckMail } from "../../../email/templates/enquiry-ack";
import { submitEnquiryWithAck } from "../../persistence/transactions/submit-enquiry-with-ack";
import { UnknownCatalogRefError } from "../../persistence/errors/unknown-catalog-ref-error";
import type { EnquiryBody } from "../../requests/read-enquiry-body";

export { UnknownCatalogRefError };

export async function submitEnquiry(input: EnquiryBody) {
  const mail = enquiryAckMail(input.name, input.kind);
  return submitEnquiryWithAck({
    kind: input.kind,
    name: input.name,
    email: input.email,
    phone: input.phone,
    ...(input.message !== undefined && { message: input.message }),
    ...(input.eventDate !== undefined && { eventDate: new Date(input.eventDate) }),
    ...(input.eventTypeSlug !== undefined && { eventTypeSlug: input.eventTypeSlug }),
    ...(input.packageSlug !== undefined && { packageSlug: input.packageSlug }),
    ackSubject: mail.subject,
    ackText: mail.text,
    ackHtml: mail.html,
  });
}
