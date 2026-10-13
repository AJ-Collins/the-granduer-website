import { db } from "../../../db/client";
import { published } from "../rows";

export async function selectGallery(publishedOnly: boolean) {
  const albums = await db.galleryAlbum.findMany({
    ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
    orderBy: [{ sortOrder: "asc" as const }, { title: "asc" as const }],
    include: {
      images: {
        ...(publishedOnly && { where: { status: "PUBLISHED" as const } }),
        orderBy: [{ sortOrder: "asc" as const }, { createdAt: "asc" as const }],
      },
    },
  });
  return albums.map((a) => ({
    ...published(a),
    images: a.images.map(published),
  }));
}
