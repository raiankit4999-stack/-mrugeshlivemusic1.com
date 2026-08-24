import galleryImages from "@/data/gallery.json";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export type GalleryItem = {
  id: string;
  src: string;
  alt: string;
  category: string;
  orientation: "portrait" | "landscape";
};

export async function getGalleryImages(): Promise<GalleryItem[]> {
  const dbImages = await safeQuery(
    () =>
      prisma.galleryImage.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    []
  );

  // Once the one-time seed has copied the static images into the database,
  // the database becomes the single source of truth (so admin edits/deletes
  // apply). Before that (or if the database isn't configured, e.g. local
  // dev), fall back to the static file so the site still shows content.
  if (dbImages.length > 0) {
    return dbImages.map((img) => ({
      id: img.id,
      src: img.imageUrl,
      alt: img.alt,
      category: img.category ?? "Gallery",
      orientation: img.orientation === "portrait" ? "portrait" : "landscape",
    }));
  }

  return galleryImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    category: img.category,
    orientation: img.orientation === "portrait" ? "portrait" : "landscape",
  }));
}
