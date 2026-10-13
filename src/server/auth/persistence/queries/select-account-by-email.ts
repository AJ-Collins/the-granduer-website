import { db } from "../../../db/client";

export async function selectAccountByEmail(email: string) {
  return db.account.findUnique({
    where: { email: email.toLowerCase().trim() },
    select: { id: true, email: true },
  });
}
