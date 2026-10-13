import type { Prisma } from "../../../../prisma/generated/client";

export type QueuedNotification = {
  type: string;
  to: string;
  subject: string;
  text: string;
  html?: string;
};

type OutboxWriter = {
  notificationOutbox: {
    create(args: { data: Prisma.NotificationOutboxCreateInput }): Promise<unknown>;
  };
};

/**
 * Inserts a PENDING row through the given writer (db or transaction client).
 * Call inside the same $transaction as the domain write — enquiry created +
 * mail queued atomically, so a crash can never lose the ack.
 */
export async function enqueueNotification(client: OutboxWriter, input: QueuedNotification) {
  await client.notificationOutbox.create({
    data: {
      type: input.type,
      to: input.to,
      subject: input.subject,
      text: input.text,
      html: input.html ?? null,
    },
  });
}
