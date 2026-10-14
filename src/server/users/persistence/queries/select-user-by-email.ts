import { db } from "../../../db/client";
import { WITH_ROLES } from "../fragments";

export async function selectUserByEmail(email: string) {
  return db.account.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: WITH_ROLES,
  });
}
