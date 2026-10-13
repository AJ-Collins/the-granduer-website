import { fail, ok } from "../../http/api-response";
import { parseBody } from "../../http/parse-body";
import { z } from "zod";
import { createUser, UnknownRolesError } from "../../users/services/create-user";
import { recordAudit } from "../../audit/services/record-audit";
import type { SessionUser } from "../../auth/services/session-claims";

const createBodySchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(12).max(128),
  name: z.string().max(120).optional(),
  roleKeys: z.array(z.string().min(1).max(64)).min(1).max(10),
});

export async function createUserController(req: Request, actor: SessionUser): Promise<Response> {
  const parsed = await parseBody(req, createBodySchema);
  if ("response" in parsed) return parsed.response;
  try {
    const created = await createUser(parsed.data);
    await recordAudit({
      actorId: actor.id,
      action: "admin.user-created",
      entityType: "account",
      entityId: created.id,
      metadata: { email: created.email },
    });
    return ok(created, { status: 201 });
  } catch (e) {
    if (e instanceof UnknownRolesError) return fail("BAD_REQUEST", e.message, { status: 400 });
    if (e instanceof Error && "code" in e && (e as { code: string }).code === "P2002") {
      return fail("CONFLICT", "An account with this email already exists", { status: 409 });
    }
    throw e;
  }
}
