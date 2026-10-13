import { db } from "../../../db/client";

const WITH_ROLES = { roles: { include: { role: true } } } as const;

export async function selectLiveSession(sessionId: string, accountId: string) {
  const [session, account] = await Promise.all([
    db.session.findUnique({ where: { id: sessionId } }),
    db.account.findUnique({ where: { id: accountId }, include: WITH_ROLES }),
  ]);
  if (!session || session.revokedAt || session.expiresAt <= new Date()) return null;
  if (!account || account.status !== "ACTIVE") return null;
  return {
    id: account.id,
    email: account.email,
    roles: account.roles.map((r) => r.role.key),
    permissions: [...new Set(account.roles.flatMap((r) => r.role.permissions))],
    sessionId: session.id,
  };
}
