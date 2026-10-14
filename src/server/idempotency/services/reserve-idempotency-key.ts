import { KeyConflictError } from "../errors/key-conflict-error";
import { KeyInProgressError } from "../errors/key-in-progress-error";
import { insertReservedRecord } from "../persistence/queries/insert-reserved-record";
import { refreshReservedRecord } from "../persistence/queries/refresh-reserved-record";
import { requeueFailedRecord } from "../persistence/queries/requeue-failed-record";
import { selectIdempotencyRecord } from "../persistence/queries/select-record";
import type { ReserveInput, ReserveResult } from "../persistence/types";
import { IDEMPOTENCY_LEASE_MS } from "./idempotency-lease";

function isUniqueViolation(e: unknown): boolean {
  return e instanceof Error && "code" in e && (e as { code: string }).code === "P2002";
}

function retryAfterSeconds(leaseExpiresAt: Date, now: Date): number {
  return Math.max(1, Math.ceil((leaseExpiresAt.getTime() - now.getTime()) / 1000));
}

/**
 * Shared reservation: try to own (scope, actor, key), else decide from the
 * stored row. Throws KeyConflictError on payload mismatch and
 * KeyInProgressError while an identical attempt holds a live lease.
 * Crash recovery: an expired lease with a matching fingerprint is
 * re-owned by exactly one caller (conditional refresh).
 */
export async function reserveIdempotencyKey(
  input: ReserveInput,
  now: Date = new Date(),
): Promise<ReserveResult> {
  try {
    const created = await insertReservedRecord({
      ...input,
      leaseExpiresAt: new Date(now.getTime() + IDEMPOTENCY_LEASE_MS),
    });
    return { kind: "reserved", recordId: created.id };
  } catch (e) {
    if (!isUniqueViolation(e)) throw e;
  }
  const existing = await selectIdempotencyRecord(input.scope, input.actor, input.key);
  if (!existing) {
    throw new KeyInProgressError(Math.ceil(IDEMPOTENCY_LEASE_MS / 1000));
  }
  if (existing.fingerprint !== input.fingerprint) {
    throw new KeyConflictError();
  }
  if (existing.status === "COMPLETED") {
    return { kind: "replayed", status: existing.responseStatus ?? 200, body: existing.responseBody };
  }
  if (existing.status === "FAILED") {
    const requeued = await requeueFailedRecord(
      existing.id,
      input.fingerprint,
      new Date(now.getTime() + IDEMPOTENCY_LEASE_MS),
    );
    if (!requeued) {
      throw new KeyInProgressError(retryAfterSeconds(existing.leaseExpiresAt, now));
    }
    return { kind: "reserved", recordId: existing.id };
  }
  if (existing.leaseExpiresAt.getTime() <= now.getTime()) {
    const reowned = await refreshReservedRecord(
      existing.id,
      input.fingerprint,
      new Date(now.getTime() + IDEMPOTENCY_LEASE_MS),
      now,
    );
    if (!reowned) {
      throw new KeyInProgressError(retryAfterSeconds(existing.leaseExpiresAt, now));
    }
    return { kind: "reserved", recordId: existing.id };
  }
  throw new KeyInProgressError(retryAfterSeconds(existing.leaseExpiresAt, now));
}
