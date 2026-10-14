import { afterEach, describe, expect, it } from "vitest";
import { db } from "@/server/db/client";
import { createEnquiry } from "@/server/enquiries/controllers/intake/create-enquiry";
import { KeyConflictError } from "@/server/idempotency/errors/key-conflict-error";
import { KeyInProgressError } from "@/server/idempotency/errors/key-in-progress-error";
import { fingerprintRequest } from "@/server/idempotency/fingerprint/fingerprint-request";
import { markRecordCompleted } from "@/server/idempotency/persistence/queries/mark-record-completed";
import { markRecordFailed } from "@/server/idempotency/persistence/queries/mark-record-failed";
import { IDEMPOTENCY_LEASE_MS } from "@/server/idempotency/services/idempotency-lease";
import { reserveIdempotencyKey } from "@/server/idempotency/services/reserve-idempotency-key";

const SCOPE = "test";
let n = 0;
const key = () => `test-key-${Date.now()}-${n++}`;
const fp = (body: unknown, actor = "test") =>
  fingerprintRequest({ method: "POST", path: "/t", actor, body });

afterEach(async () => {
  await db.notificationOutbox.deleteMany({ where: { to: { startsWith: "idem-" } } });
  await db.enquiry.deleteMany({ where: { email: { startsWith: "idem-" } } });
  await db.idempotencyRecord.deleteMany({
    where: {
      OR: [{ scope: SCOPE }, { AND: [{ scope: "enquiry:create" }, { key: { startsWith: "test-" } }] }],
    },
  });
});

describe("reserve → complete → replay", () => {
  it("returns the original response instead of re-executing", async () => {
    const k = key();
    const f = fp({ a: 1 });
    const first = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f });
    expect(first.kind).toBe("reserved");
    if (first.kind !== "reserved") return;
    await markRecordCompleted(db, first.recordId, 201, { ok: 1 });
    const second = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f });
    expect(second).toEqual({ kind: "replayed", status: 201, body: { ok: 1 } });
  });

  it("rejects the same key with a different payload (409)", async () => {
    const k = key();
    await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: fp({ a: 1 }) });
    await expect(
      reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: fp({ a: 2 }) }),
    ).rejects.toBeInstanceOf(KeyConflictError);
  });

  it("allows exactly one winner among simultaneous identical requests", async () => {
    const k = key();
    const f = fp({ a: 1 });
    const results = await Promise.allSettled(
      Array.from({ length: 10 }, () =>
        reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f }),
      ),
    );
    const won = results.filter((r) => r.status === "fulfilled");
    const lost = results.filter((r) => r.status === "rejected");
    expect(won).toHaveLength(1);
    expect(lost).toHaveLength(9);
    for (const r of lost) {
      expect((r as PromiseRejectedResult).reason).toBeInstanceOf(KeyInProgressError);
    }
  });

  it("recovers a crashed attempt after the lease expires, once", async () => {
    const k = key();
    const f = fp({ a: 1 });
    const t0 = new Date("2026-01-01T00:00:00Z");
    const first = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f }, t0);
    expect(first.kind).toBe("reserved");
    const later = new Date(t0.getTime() + IDEMPOTENCY_LEASE_MS + 1000);
    const races = await Promise.allSettled([
      reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f }, later),
      reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f }, later),
    ]);
    expect(races.filter((r) => r.status === "fulfilled")).toHaveLength(1);
    expect(races.filter((r) => r.status === "rejected")).toHaveLength(1);
  });

  it("retries a failed key with the same payload", async () => {
    const k = key();
    const f = fp({ a: 1 });
    const first = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f });
    expect(first.kind).toBe("reserved");
    if (first.kind !== "reserved") return;
    await markRecordFailed(first.recordId, "boom");
    const second = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: k, fingerprint: f });
    expect(second.kind).toBe("reserved");
  });

  it("treats different keys with identical payloads as separate operations", async () => {
    const f = fp({ a: 1 });
    const one = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: key(), fingerprint: f });
    const two = await reserveIdempotencyKey({ scope: SCOPE, actor: "test", key: key(), fingerprint: f });
    expect(one.kind).toBe("reserved");
    expect(two.kind).toBe("reserved");
  });

  it("never discloses another actor's result", async () => {
    const k = key();
    const f = fingerprintRequest({ method: "POST", path: "/t", actor: "a", body: { a: 1 } });
    const a = await reserveIdempotencyKey({ scope: SCOPE, actor: "a", key: k, fingerprint: f });
    expect(a.kind).toBe("reserved");
    if (a.kind !== "reserved") return;
    await markRecordCompleted(db, a.recordId, 201, { secret: "a-data" });
    const b = await reserveIdempotencyKey({ scope: SCOPE, actor: "b", key: k, fingerprint: f });
    expect(b.kind).toBe("reserved");
    if (b.kind === "reserved" && a.kind === "reserved") {
      expect(b.recordId).not.toBe(a.recordId);
    }
  });
});

describe("POST /api/enquiry end to end", () => {
  const body = { kind: "viewing", name: "Idem Test", email: "idem-x@example.com", phone: "+254700000000" };
  const post = (k: string, b: unknown = body) =>
    createEnquiry(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": k },
        body: JSON.stringify(b),
      }),
    );

  it("executes once across retries: identical bytes, one enquiry, one queued mail", async () => {
    const k = key();
    const first = await post(k);
    const second = await post(k);
    expect(first.status).toBe(201);
    expect(second.status).toBe(201);
    expect(await second.json()).toEqual(await first.clone().json());
    expect(await db.enquiry.count({ where: { email: body.email } })).toBe(1);
    expect(await db.notificationOutbox.count({ where: { to: body.email } })).toBe(1);
    await post(k, { ...body, name: "Changed" }).then(async (r) => {
      expect(r.status).toBe(409);
      expect((await r.json() as { error: { code: string } }).error.code).toBe("IDEMPOTENCY_CONFLICT");
    });
    expect(await db.enquiry.count({ where: { email: body.email } })).toBe(1);
  });

  it("requires the key", async () => {
    const res = await createEnquiry(
      new Request("http://localhost/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
    );
    expect(res.status).toBe(400);
  });
});
