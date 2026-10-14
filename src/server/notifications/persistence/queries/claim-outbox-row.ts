import { db } from "../../../db/client";
import { stuckSendingBefore } from "../policy/stuck-sending-before";
import type { ClaimedOutboxRow } from "../types";
import type { DueCandidate } from "./select-due-outbox-candidates";

/**
 * Atomic compare-and-swap: flip one row PENDING→SENDING only if untouched.
 * Returns the row for the single winner — the lock-free claim primitive.
 */
export async function claimOutboxRow(candidate: DueCandidate): Promise<ClaimedOutboxRow | null> {
  const staleBefore = stuckSendingBefore();
  const guard =
    candidate.status === "PENDING"
      ? { id: candidate.id, status: "PENDING" as const }
      : { id: candidate.id, status: "SENDING" as const, updatedAt: { lt: staleBefore } };
  const flipped = await db.notificationOutbox.updateMany({ where: guard, data: { status: "SENDING" } });
  if (flipped.count !== 1) return null;
  return {
    id: candidate.id,
    to: candidate.to,
    subject: candidate.subject,
    text: candidate.text,
    html: candidate.html,
    attempts: candidate.attempts,
  };
}
