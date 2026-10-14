import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { setUserRoles } from "../../../users/services/set-user-roles";
import { UnknownRolesError } from "../../../users/persistence/errors/unknown-roles-error";
import { patchUserRolesSchema } from "../../requests/read-patch-user-roles-body";

export async function setUserRolesController(
  req: Request,
  id: string,
  actor: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, patchUserRolesSchema);
  if ("response" in parsed) return parsed.response;
  try {
    return ok(await setUserRoles(id, parsed.data.roleKeys, actor.id));
  } catch (e) {
    if (e instanceof UnknownRolesError) return fail("BAD_REQUEST", e.message, { status: 400 });
    return fail("NOT_FOUND", "User not found", { status: 404 });
  }
}
