import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { KeyConflictError } from "../../../idempotency/errors/key-conflict-error";
import { KeyInProgressError } from "../../../idempotency/errors/key-in-progress-error";
import { fingerprintRequest } from "../../../idempotency/fingerprint/fingerprint-request";
import { readIdempotencyKey } from "../../../idempotency/keys/read-idempotency-key";
import { failIdempotencyKey } from "../../../idempotency/services/fail-idempotency-key";
import { reserveIdempotencyKey } from "../../../idempotency/services/reserve-idempotency-key";
import { enforceRateLimit } from "../../../rate-limit/enforce-rate-limit";
import { enquiryBodySchema } from "../../requests/read-enquiry-body";
import { submitEnquiry } from "../../services/intake/submit-enquiry";
import { recordSubmissionRejection } from "../../services/intake/record-submission-rejection";
import { UnknownCatalogRefError } from "../../persistence/errors/unknown-catalog-ref-error";

const SCOPE = "enquiry:create";
const ACTOR = "public";

export async function createEnquiry(req: Request): Promise<Response> {
  const parsed = await parseBody(req, enquiryBodySchema);
  if ("response" in parsed) {
    await recordSubmissionRejection({ reason: "validation" });
    return parsed.response;
  }
  const keyed = readIdempotencyKey(req);
  if ("response" in keyed) return keyed.response;
  const limit = await enforceRateLimit(req, ["enquiry-ip"], { email: parsed.data.data.email });
  if (limit.blocked) {
    await recordSubmissionRejection({
      kind: parsed.data.kind,
      email: parsed.data.data.email,
      reason: "rate-limit",
    });
    return limit.blocked;
  }
  const fingerprint = fingerprintRequest({
    method: req.method,
    path: new URL(req.url).pathname,
    actor: ACTOR,
    body: parsed.data,
  });
  let reservation;
  try {
    reservation = await reserveIdempotencyKey({
      scope: SCOPE,
      actor: ACTOR,
      key: keyed.key,
      fingerprint,
    });
  } catch (e) {
    if (e instanceof KeyConflictError) {
      return fail("IDEMPOTENCY_CONFLICT", e.message, { status: e.status });
    }
    if (e instanceof KeyInProgressError) {
      return fail("IDEMPOTENCY_IN_PROGRESS", e.message, {
        status: e.status,
        retryAfterSeconds: e.retryAfterSeconds,
      });
    }
    throw e;
  }
  if (reservation.kind === "replayed") {
    return ok(reservation.body, { status: reservation.status });
  }
  try {
    return ok(await submitEnquiry(parsed.data, { recordId: reservation.recordId }), { status: 201 });
  } catch (e) {
    if (e instanceof UnknownCatalogRefError) {
      await failIdempotencyKey(reservation.recordId, e.message);
      return fail("BAD_REQUEST", e.message, { status: e.status });
    }
    throw e;
  }
}
