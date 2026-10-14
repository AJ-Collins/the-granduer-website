import { db } from "../../../db/client";

const WITH_ROLES = { roles: { include: { role: true } } } as const;

export async function selectAccountLoginRow(email: string) {
  return db.account.findUnique({
    where: { email: email.toLowerCase().trim() },
    include: WITH_ROLES,
  });
}
