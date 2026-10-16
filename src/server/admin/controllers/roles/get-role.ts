import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getRoleById } from "../../../users/services/get-role-by-id";

export async function getRoleController(id: string): Promise<Response> {
  const role = await getRoleById(id);
  if (!role) return fail("NOT_FOUND", "Role not found", { status: 404 });
  return ok(role);
}
