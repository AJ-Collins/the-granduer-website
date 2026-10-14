import type { Prisma } from "../../../../../prisma/generated/client";

/** Narrow completer both `db` and interactive `tx` satisfy. */
export type IdempotencyCompleter = {
  idempotencyRecord: {
    update(args: {
      where: { id: string };
      data: { status: "COMPLETED"; responseStatus: number; responseBody: Prisma.InputJsonValue };
    }): Promise<unknown>;
  };
};

export async function markRecordCompleted(
  client: IdempotencyCompleter,
  id: string,
  status: number,
  body: unknown,
) {
  await client.idempotencyRecord.update({
    where: { id },
    data: { status: "COMPLETED", responseStatus: status, responseBody: body as Prisma.InputJsonValue },
  });
}
