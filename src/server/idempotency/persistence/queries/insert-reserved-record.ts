import { db } from "../../../db/client";

export async function insertReservedRecord(input: {
  scope: string;
  actor: string;
  key: string;
  fingerprint: string;
  leaseExpiresAt: Date;
}) {
  return db.idempotencyRecord.create({
    data: { ...input, status: "IN_PROGRESS" },
    select: { id: true },
  });
}
