import { db } from "../../../db/client";
import { markRecordCompleted } from "../../../idempotency/persistence/queries/mark-record-completed";
import { insertQueuedNotification } from "../../../notifications/persistence/queries/insert-queued-notification";
import { insertEnquiry } from "../queries/insert-enquiry";
import { resolveCatalogRefs } from "../queries/resolve-catalog-refs";
import type { SubmitEnquiryRecord } from "../rows";

/** Resolve → insert → queue → idempotency-complete, one transaction. */
export async function submitEnquiryWithAck(input: SubmitEnquiryRecord) {
  const { eventTypeSlug, packageSlug, ackSubject, ackText, ackHtml, idempotencyRecordId, ...enquiry } = input;
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
    if (idempotencyRecordId) {
      await markRecordCompleted(tx, idempotencyRecordId, 201, created);
    }
    return created;
  }, { timeout: 10_000 });
}
