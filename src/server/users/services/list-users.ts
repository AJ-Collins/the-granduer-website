import { db } from "../../db/client";

export type ListedUser = {
  id: string;
  email: string;
  name: string | null;
  status: string;
  roles: string[];
};

export async function listUsers(
  page: number,
  pageSize: number,
  filter?: { status?: string; search?: string },
): Promise<{ items: ListedUser[]; total: number }> {
  const where = {
    ...(filter?.status && { status: filter.status.toUpperCase() as "ACTIVE" | "SUSPENDED" | "DEACTIVATED" }),
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
  return {
    items: rows.map((r) => ({
      id: r.id,
      email: r.email,
      name: r.name,
      status: r.status.toLowerCase(),
      roles: r.roles.map((x) => x.role.key),
    })),
    total,
  };
}
