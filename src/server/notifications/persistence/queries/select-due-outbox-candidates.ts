import { db } from "../../../db/client";
import { stuckSendingBefore } from "../policy/stuck-sending-before";

export async function selectDueOutboxCandidates(limit: number) {
  return db.notificationOutbox.findMany({
    where: {
      OR: [
        { status: "PENDING", nextAttemptAt: { lte: new Date() } },
        { status: "SENDING", updatedAt: { lt: stuckSendingBefore() } },
      ],
    },
    orderBy: { nextAttemptAt: "asc" },
    take: limit,
    select: {
      id: true,
      to: true,
      subject: true,
      text: true,
      html: true,
      attempts: true,
      status: true,
    },
  });
}

export type DueCandidate = Awaited<ReturnType<typeof selectDueOutboxCandidates>>[number];
