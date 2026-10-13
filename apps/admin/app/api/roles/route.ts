import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:4000";

/** Thin proxy to the central API — role definitions live in apps/api admin/roles. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/v1/admin/roles`, {
      headers: { authorization: auth },
    });
    return NextResponse.json(await upstream.json().catch(() => ({ ok: false })), {
      status: upstream.status,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "API_UNREACHABLE", message: "Service temporarily unavailable" } },
      { status: 502 },
    );
  }
}
