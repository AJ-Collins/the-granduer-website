import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:4000";

function unreachable() {
  return NextResponse.json(
    { ok: false, error: { code: "API_UNREACHABLE", message: "Service temporarily unavailable" } },
    { status: 502 },
  );
}

/** Thin proxy to the central API — user management lives in apps/api admin/users. */
export async function GET(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });
  const query = new URL(req.url).search;
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/v1/admin/users${query}`, {
      headers: { authorization: auth },
    });
    return NextResponse.json(await upstream.json().catch(() => ({ ok: false })), {
      status: upstream.status,
    });
  } catch {
    return unreachable();
  }
}

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
      method: "POST",
      headers: { authorization: auth, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json(await upstream.json().catch(() => ({ ok: false })), {
      status: upstream.status,
    });
  } catch {
    return unreachable();
  }
}
