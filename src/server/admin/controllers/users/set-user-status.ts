import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { parseBody } from "../../../http/parse-body";
import type { SessionUser } from "../../../auth/services/sessions/session-claims";
import { setUserStatus } from "../../../users/services/set-user-status";
import { patchUserStatusSchema } from "../../requests/read-patch-user-status-body";

export async function setUserStatusController(
  req: Request,
  id: string,
  actor: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, patchUserStatusSchema);
  if ("response" in parsed) return parsed.response;
  if (id === actor.id && parsed.data.status !== "active") {
    return fail("BAD_REQUEST", "You cannot deactivate your own account", { status: 400 });
  }
  try {
    return ok(await setUserStatus(id, parsed.data.status, actor.id));
  } catch (e) {
    if (e instanceof Error && e.message === "You cannot deactivate your own account") {
      return fail("BAD_REQUEST", e.message, { status: 400 });
    }
    return fail("NOT_FOUND", "User not found", { status: 404 });
  }
}
