import { db } from "@/server/db/client";
import { getStorage } from "@/server/storage/services/get-storage";

export async function GET(_req: Request, ctx: { params: Promise<{ key: string[] }> }) {
  const { key } = await ctx.params;
  const joined = Array.isArray(key) ? key.join("/") : key;
  const [asset, stored] = await Promise.all([
    db.fileAsset.findUnique({ where: { key: joined } }),
    getStorage().get(joined),
  ]);
  if (!stored) return new Response("Not found", { status: 404 });
  return new Response(Buffer.from(stored.data), {
    headers: {
      "Content-Type": asset?.mimeType ?? stored.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
