import { fail } from "../../http/fail-response";

const KEY_PATTERN = /^[A-Za-z0-9_-]{1,128}$/;

/** Extracts and validates the Idempotency-Key header. 400 when missing or malformed. */
export function readIdempotencyKey(req: Request): { key: string } | { response: Response } {
  const raw = req.headers.get("Idempotency-Key")?.trim() ?? "";
  if (!KEY_PATTERN.test(raw)) {
    return {
      response: fail("VALIDATION_FAILED", "Missing or invalid Idempotency-Key header", {
        status: 400,
      }),
    };
  }
  return { key: raw };
}
