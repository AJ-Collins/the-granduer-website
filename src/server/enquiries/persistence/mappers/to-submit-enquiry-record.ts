import type { EnquiryBody } from "../../requests/read-enquiry-body";

export function toSubmitEnquiryRecord(
  input: EnquiryBody,
  mail: { subject: string; text: string; html: string },
  idempotency?: { recordId: string },
) {
  return {
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
    ...(idempotency && { idempotencyRecordId: idempotency.recordId }),
  };
}
