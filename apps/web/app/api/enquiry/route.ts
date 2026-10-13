import { NextResponse } from "next/server";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://localhost:4000";

/**
 * Thin proxy — no business logic here. The central API
 * (`POST /api/v1/public/enquiries`) owns validation, persistence and notifications.
 * Keeps the existing `{ kind, data }` shape so current forms keep working.
 */
export async function POST(req: Request) {
  const { kind, data } = (await req.json().catch(() => ({}))) as {
    kind?: string;
    data?: Record<string, unknown>;
  };
  if ((kind !== "viewing" && kind !== "proposal") || !data?.name || !data?.email || !data?.phone) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  let upstream: Response;
  try {
    upstream = await fetch(`${API_BASE_URL}/api/v1/public/enquiries`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        kind,
        name: data.name,
        email: data.email,
        phone: data.phone,
        ...(typeof data.message === "string" && { message: data.message }),
      }),
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: { code: "API_UNREACHABLE", message: "Service temporarily unavailable" } },
      { status: 502 },
    );
  }
  return NextResponse.json(await upstream.json().catch(() => ({ ok: false })), {
    status: upstream.status,
  });
}
