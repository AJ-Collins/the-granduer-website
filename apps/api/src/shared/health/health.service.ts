import { db } from "@dgrandeur/db";

export type HealthStatus = {
  status: "ok";
  version: string;
  checks: { database: "ok" | "down"; cache: "ok" | "not-configured" };
};

export async function getHealth(): Promise<HealthStatus> {
  let database: "ok" | "down" = "down";
  try {
    await db.$queryRaw`SELECT 1`;
    database = "ok";
  } catch {
    database = "down";
  }
  return { status: "ok", version: "0.0.1", checks: { database, cache: "not-configured" } };
}
