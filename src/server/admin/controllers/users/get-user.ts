import { fail } from "../../../http/fail-response";
import { ok } from "../../../http/ok-response";
import { getUserById } from "../../../users/services/get-user-by-id";

export async function getUserController(id: string): Promise<Response> {
  const user = await getUserById(id);
  if (!user) return fail("NOT_FOUND", "User not found", { status: 404 });
  return ok(user);
}
