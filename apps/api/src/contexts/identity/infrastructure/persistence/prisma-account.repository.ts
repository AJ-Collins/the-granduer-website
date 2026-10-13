import { db } from "@dgrandeur/db";
import type { AccountRecord, AccountRepository } from "../../accounts/account.repository.js";
import type { AccountStatus } from "../../accounts/account.js";

function toRecord(row: {
  id: string;
  email: string;
  name: string | null;
  status: "ACTIVE" | "SUSPENDED" | "DEACTIVATED";
  passwordHash: string;
  tokenVersion: number;
  roles: { role: { key: string; permissions: string[] } }[];
}): AccountRecord {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    status: row.status.toLowerCase() as AccountStatus,
    roles: row.roles.map((r) => r.role.key),
    permissions: [...new Set(row.roles.flatMap((r) => r.role.permissions))],
    passwordHash: row.passwordHash,
    tokenVersion: row.tokenVersion,
  };
}

const WITH_ROLES = { roles: { include: { role: true } } } as const;

export class PrismaAccountRepository implements AccountRepository {
  async findByEmail(email: string): Promise<AccountRecord | null> {
    const row = await db.account.findUnique({ where: { email }, include: WITH_ROLES });
    return row ? toRecord(row) : null;
  }

  async findById(id: string): Promise<AccountRecord | null> {
    const row = await db.account.findUnique({ where: { id }, include: WITH_ROLES });
    return row ? toRecord(row) : null;
  }

  async bumpTokenVersion(id: string): Promise<number> {
    const row = await db.account.update({
      where: { id },
      data: { tokenVersion: { increment: 1 } },
      select: { tokenVersion: true },
    });
    return row.tokenVersion;
  }

  async setPassword(id: string, passwordHash: string): Promise<void> {
    await db.account.update({ where: { id }, data: { passwordHash } });
  }

  async storeResetToken(id: string, resetTokenHash: string, resetExpiresAt: Date): Promise<void> {
    await db.account.update({ where: { id }, data: { resetTokenHash, resetExpiresAt } });
  }

  async findByResetTokenHash(resetTokenHash: string): Promise<AccountRecord | null> {
    const row = await db.account.findFirst({
      where: { resetTokenHash, resetExpiresAt: { gt: new Date() } },
      include: WITH_ROLES,
    });
    return row ? toRecord(row) : null;
  }

  async clearResetToken(id: string): Promise<void> {
    await db.account.update({
      where: { id },
      data: { resetTokenHash: null, resetExpiresAt: null },
    });
  }
}
