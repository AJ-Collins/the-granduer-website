import { db } from "../../../db/client";
import { toEventType } from "../mappers/to-event-type";
import { prismaStatus } from "../prisma-status";
import type { PublishState } from "../rows";

export async function updateEventTypeStatus(id: string, status: PublishState) {
  return toEventType(
    await db.eventType.update({ where: { id }, data: { status: prismaStatus(status) } }),
  );
}
