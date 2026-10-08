import { NextResponse } from "next/server";

/** Enquiry intake: confirmation now; ack email + sales record + SLA wired here later. No response-time promise on site. */
export async function POST(req: Request) {
  const { kind, data } = (await req.json().catch(() => ({}))) as { kind?: string; data?: Record<string, unknown> };
  if ((kind !== "viewing" && kind !== "proposal") || !data?.name || !data?.email || !data?.phone) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  // TODO: automated acknowledgement, sales record/notify, internal SLA clock.
  return NextResponse.json({ ok: true });
}
