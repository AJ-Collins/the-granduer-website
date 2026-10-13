import type { AccountStatus } from "../persistence/rows";
import { updateUserStatusWithAudit } from "../persistence/transactions/update-user-status-with-audit";

export async function setUserStatus(id: string, status: AccountStatus, actorId: string) {
  return updateUserStatusWithAudit(id, status, actorId);
}
