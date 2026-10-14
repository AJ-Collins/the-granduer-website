import { selectAccountWithRoles } from "../../persistence/queries/select-account-with-roles";

export async function getAccountWithRoles(userId: string) {
  return selectAccountWithRoles(userId);
}
