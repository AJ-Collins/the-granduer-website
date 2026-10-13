import { getPackageController } from "@/server/catalog/controllers/get-package";

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  return getPackageController(slug, true);
}
