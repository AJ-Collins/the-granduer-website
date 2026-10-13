import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:4000";

async function passthrough(upstream: Response) {
  return NextResponse.json(await upstream.json().catch(() => ({ ok: false })), {
    status: upstream.status,
  });
}

function unreachable() {
  return NextResponse.json(
    { ok: false, error: { code: "API_UNREACHABLE", message: "Service temporarily unavailable" } },
    { status: 502 },
  );
}

function bearer(req: Request): string | null {
  return req.headers.get("authorization");
}

/** POST {email,password} -> central identity login. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}/api/v1/identity/login`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return unreachable();
  }
  return passthrough(upstream);
}

/** GET -> session check via central identity (forwards Bearer token). */
export async function GET(req: Request) {
  const auth = bearer(req);
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/v1/identity/me`, {
      headers: { authorization: auth },
    });
    return passthrough(upstream);
  } catch {
    return unreachable();
  }
}

/** DELETE -> central identity logout (revokes all tokens for the account). */
export async function DELETE(req: Request) {
  const auth = bearer(req);
  if (!auth) return NextResponse.json({ ok: false }, { status: 401 });
  try {
    const upstream = await fetch(`${API_BASE_URL}/api/v1/identity/logout`, {
      method: "POST",
      headers: { authorization: auth },
    });
    return passthrough(upstream);
  } catch {
    return unreachable();
  }
}
