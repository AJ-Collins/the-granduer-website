import { createUserWithAudit } from "../persistence/transactions/create-user-with-audit";
import type { CreateAccountInput } from "../persistence/queries/insert-account";

export async function createUser(input: CreateAccountInput, actorId: string) {
  return createUserWithAudit(input, actorId);
}
