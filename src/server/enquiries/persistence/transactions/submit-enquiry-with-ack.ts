import { db } from "../../../db/client";
import { insertQueuedNotification } from "../../../notifications/persistence/queries/insert-queued-notification";
import { insertEnquiry } from "../queries/insert-enquiry";
import { resolveCatalogRefs } from "../queries/resolve-catalog-refs";
import type { NewEnquiry } from "../rows";

export type SubmitEnquiryRecord = NewEnquiry & {
  eventTypeSlug?: string;
  packageSlug?: string;
  ackSubject: string;
  ackText: string;
  ackHtml: string;
};

/** Resolve → insert → queue, one transaction. Concurrent unpublishes cannot slip in. */
export async function submitEnquiryWithAck(input: SubmitEnquiryRecord) {
  const { eventTypeSlug, packageSlug, ackSubject, ackText, ackHtml, ...enquiry } = input;
  return db.$transaction(async (tx) => {
    const refs = await resolveCatalogRefs(tx, { eventTypeSlug, packageSlug });
    const created = await insertEnquiry(tx, { ...enquiry, ...refs });
    await insertQueuedNotification(tx, {
      type: "enquiry.ack",
      to: input.email,
      subject: ackSubject,
      text: ackText,
      html: ackHtml,
    });
    return created;
  }, { timeout: 10_000 });
}
