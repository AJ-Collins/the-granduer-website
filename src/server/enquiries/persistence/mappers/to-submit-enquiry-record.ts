import type { ProposalInput } from "@/shared/schemas/proposal";
import type { ViewingInput } from "@/shared/schemas/viewing";
import type { EnquiryBody } from "../../requests/read-enquiry-body";

const PACKAGE_SLUGS = ["essential", "classic", "signature", "bespoke"] as const;

function parseDate(value: string): Date | undefined {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

export function toSubmitEnquiryRecord(
  input: EnquiryBody,
  mail: { subject: string; text: string; html: string },
  idempotency?: { recordId: string },
) {
  const base = {
    name: input.data.name,
    email: input.data.email,
    phone: input.data.phone,
    ackSubject: mail.subject,
    ackText: mail.text,
    ackHtml: mail.html,
    ...(input.source !== undefined && { trafficSource: input.source }),
    ...(input.medium !== undefined && { medium: input.medium }),
    ...(input.campaign !== undefined && { campaign: input.campaign }),
    ...(idempotency && { idempotencyRecordId: idempotency.recordId }),
  };
  if (input.kind === "viewing") {
    const data: ViewingInput = input.data;
    return {
      ...base,
      kind: input.kind,
      ...(data.message !== undefined && { message: data.message }),
      eventTypeName: data.eventType,
      preferredDate: new Date(`${data.preferredDate}T00:00:00`),
      ...(data.altDate !== undefined && { altDate: new Date(`${data.altDate}T00:00:00`) }),
      ...(data.eventDate !== undefined && { details: data.eventDate }),
      ...(data.guests !== undefined && { guests: data.guests }),
    };
  }
  const data: ProposalInput = input.data;
  const slug = data.package.toLowerCase();
  const parsedEventDate = parseDate(data.eventDate);
  const packageSlug = (PACKAGE_SLUGS as readonly string[]).includes(slug) ? slug : undefined;
  return {
    ...base,
    kind: input.kind,
    eventTypeName: data.eventType,
    ...(parsedEventDate && { eventDate: parsedEventDate }),
    ...(data.eventTime !== undefined && { eventTime: data.eventTime }),
    guests: data.guests,
    packageInterest: data.package,
    ...(packageSlug !== undefined && { packageSlug }),
    services: data.services,
    ...(data.budget !== undefined && { budget: data.budget }),
    ...(data.source !== undefined && { source: data.source }),
    ...(data.details !== undefined && { details: data.details, message: data.details }),
    ...(!parsedEventDate && { details: [data.details, `Event date: ${data.eventDate}`].filter(Boolean).join("\n") }),
  };
}
