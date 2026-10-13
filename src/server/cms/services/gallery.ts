import { db } from "../../db/client";

export async function listGallery(publishedOnly: boolean) {
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
    ...a,
    status: a.status.toLowerCase(),
    images: a.images.map((i) => ({ ...i, status: i.status.toLowerCase() })),
  }));
}
