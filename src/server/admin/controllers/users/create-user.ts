import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import { createUser } from "../../../users/services/create-user";
import { UnknownRolesError } from "../../../users/persistence/errors/unknown-roles-error";
import { createUserBodySchema } from "../../requests/read-create-user-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";

export async function createUserController(req: Request, actor: SessionUser): Promise<Response> {
  const parsed = await parseBody(req, createUserBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    // Audit is recorded in the same transaction inside the repository.
    return ok(await createUser(parsed.data, actor.id), { status: 201 });
  } catch (e) {
    if (e instanceof UnknownRolesError) return fail("BAD_REQUEST", e.message, { status: 400 });
    if (e instanceof Error && "code" in e && (e as { code: string }).code === "P2002") {
      return fail("CONFLICT", "An account with this email already exists", { status: 409 });
    }
    throw e;
  }
}
