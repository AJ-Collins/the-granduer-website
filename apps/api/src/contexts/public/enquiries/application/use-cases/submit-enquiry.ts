import { badRequest } from "../../../../../core/errors/app-error.js";
import type { CatalogLookup } from "../../../../../domains/catalog/index.js";
import type { Notifier } from "../../../../../shared/notifications/notifier.js";
import type { Enquiry } from "../../domain/entities/enquiry.js";
import type { EnquiryRepository } from "../../domain/repositories/enquiry.repository.js";
import type { SubmitEnquiryInput } from "../dto/submit-enquiry.dto.js";
import type { EventPublisher } from "../ports/event-publisher.port.js";

export function makeSubmitEnquiry(
  repo: EnquiryRepository,
  events: EventPublisher,
  notifier: Notifier,
  catalog: CatalogLookup,
) {
  return async function submitEnquiry(input: SubmitEnquiryInput): Promise<Enquiry> {
    let eventTypeId: string | undefined;
    let packageId: string | undefined;
    if (input.eventTypeSlug) {
      eventTypeId = (await catalog.publishedEventTypeId(input.eventTypeSlug)) ?? undefined;
      if (!eventTypeId) throw badRequest("Unknown event type");
    }
    if (input.packageSlug) {
      packageId = (await catalog.publishedPackageId(input.packageSlug)) ?? undefined;
      if (!packageId) throw badRequest("Unknown package");
    }
    const enquiry = await repo.save({ ...input, eventTypeId, packageId });
    await events.publish("enquiry.submitted", { id: enquiry.id, kind: enquiry.kind });
    await notifier.sendEmail({
      to: enquiry.email,
      subject: "We received your D'Grandeur enquiry",
      text: `Hi ${enquiry.name}, thanks for your ${enquiry.kind} request. Our team will respond shortly.`,
    });
    return enquiry;
  };
}

export type SubmitEnquiry = ReturnType<typeof makeSubmitEnquiry>;
