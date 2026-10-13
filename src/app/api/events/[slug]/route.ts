import { getEventTypeController } from "@/server/catalog/controllers/event-types";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  return getEventTypeController(slug, true);
}
