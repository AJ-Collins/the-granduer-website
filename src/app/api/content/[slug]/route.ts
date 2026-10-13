import { getContentBlockController } from "@/server/cms/controllers/content-blocks/get-content-block";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  return getContentBlockController(slug, true);
}
