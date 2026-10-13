import type { Prisma } from "../../../../../prisma/generated/client";
import { db } from "../../../db/client";
import { toListedAccount } from "../rows";

export async function selectUsers(
  page: number,
  pageSize: number,
  filter?: { status?: string; search?: string },
) {
  const where: Prisma.AccountWhereInput = {
    ...(filter?.status && {
      status: filter.status.toUpperCase() as "ACTIVE" | "SUSPENDED" | "DEACTIVATED",
    }),
    ...(filter?.search && {
      OR: [
        { email: { contains: filter.search, mode: "insensitive" as const } },
        { name: { contains: filter.search, mode: "insensitive" as const } },
      ],
    }),
  };
  const [rows, total] = await Promise.all([
    db.account.findMany({
      where,
      include: { roles: { include: { role: true } } },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.account.count({ where }),
  ]);
  return { items: rows.map(toListedAccount), total };
}
