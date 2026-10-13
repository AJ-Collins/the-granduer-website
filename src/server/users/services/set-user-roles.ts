import { replaceUserRolesWithAudit } from "../persistence/transactions/replace-user-roles-with-audit";

export async function setUserRoles(id: string, roleKeys: string[], actorId: string) {
  return replaceUserRolesWithAudit(id, roleKeys, actorId);
}
