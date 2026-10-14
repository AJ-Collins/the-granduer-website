import { describe, expect, it } from "vitest";
import { fingerprintRequest } from "@/server/idempotency/fingerprint/fingerprint-request";
import { readIdempotencyKey } from "@/server/idempotency/keys/read-idempotency-key";

describe("fingerprint-request", () => {
  const base = { method: "POST", path: "/api/enquiry", actor: "public", body: { a: 1 } };

  it("is stable regardless of key order", () => {
    const one = fingerprintRequest({ ...base, body: { a: 1, b: { c: 2, d: 1 } } });
    const two = fingerprintRequest({ ...base, body: { b: { d: 1, c: 2 }, a: 1 } });
    expect(one).toBe(two);
  });

  it("changes with method, path, actor, or body", () => {
    const one = fingerprintRequest(base);
    expect(fingerprintRequest({ ...base, method: "PUT" })).not.toBe(one);
    expect(fingerprintRequest({ ...base, path: "/api/other" })).not.toBe(one);
    expect(fingerprintRequest({ ...base, actor: "user-1" })).not.toBe(one);
    expect(fingerprintRequest({ ...base, body: { a: 2 } })).not.toBe(one);
  });
});

describe("read-idempotency-key", () => {
  it("accepts a well-formed key", () => {
    const out = readIdempotencyKey(new Request("http://x/", { headers: { "Idempotency-Key": "order-123-payment-1" } }));
    expect(out).toEqual({ key: "order-123-payment-1" });
  });

  it("rejects missing and malformed keys with 400", () => {
    const cases: Array<Record<string, string>> = [
      {},
      { "Idempotency-Key": "" },
      { "Idempotency-Key": "has space" },
      { "Idempotency-Key": "x".repeat(129) },
    ];
    for (const headers of cases) {
      const out = readIdempotencyKey(new Request("http://x/", { headers }));
      expect("response" in out).toBe(true);
      if ("response" in out) expect(out.response.status).toBe(400);
    }
  });
});
