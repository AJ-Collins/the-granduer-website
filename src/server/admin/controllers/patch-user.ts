import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { z } from "zod";
import { setUserStatus } from "../../users/services/set-user-status";
import { setUserRoles } from "../../users/services/set-user-roles";
import { recordAudit } from "../../audit/services/record-audit";
import type { SessionUser } from "../../auth/services/session-claims";
import { UnknownRolesError } from "../../users/services/create-user";

const patchSchema = z.object({
  status: z.enum(["active", "suspended", "deactivated"]).optional(),
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10).optional(),
});

export async function patchUserController(
  req: Request,
  id: string,
  actor: SessionUser,
): Promise<Response> {
  const parsed = await parseBody(req, patchSchema);
  if ("response" in parsed) return parsed.response;
  if (id === actor.id && parsed.data.status && parsed.data.status !== "active") {
    return fail("BAD_REQUEST", "You cannot deactivate your own account", { status: 400 });
  }
  try {
    let result: unknown = null;
    if (parsed.data.status) {
      result = await setUserStatus(id, parsed.data.status);
      await recordAudit({
        actorId: actor.id,
        action: "admin.user-status-changed",
        entityType: "account",
        entityId: id,
        metadata: { to: parsed.data.status },
      });
    }
    if (parsed.data.roleKeys) {
      result = await setUserRoles(id, parsed.data.roleKeys);
      await recordAudit({
        actorId: actor.id,
        action: "admin.user-roles-changed",
        entityType: "account",
        entityId: id,
        metadata: { roles: parsed.data.roleKeys },
      });
    }
    if (!result) return fail("BAD_REQUEST", "Nothing to update", { status: 400 });
    return ok(result);
  } catch (e) {
    if (e instanceof UnknownRolesError) return fail("BAD_REQUEST", e.message, { status: 400 });
    return fail("NOT_FOUND", "User not found", { status: 404 });
  }
}
