import type { Prisma } from "../../../../../prisma/generated/client";
import type { QueuedNotification } from "../types";

/** Narrow writer both `db` and interactive `tx` satisfy. */
export type OutboxWriter = {
  notificationOutbox: {
    create(args: { data: Prisma.NotificationOutboxCreateInput }): Promise<unknown>;
  };
};

export async function insertQueuedNotification(client: OutboxWriter, input: QueuedNotification) {
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
