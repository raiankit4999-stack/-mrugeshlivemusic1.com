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

  const unifiedDbImages: GalleryItem[] = dbImages.map((img) => ({
    id: img.id,
    src: img.imageUrl,
    alt: img.alt,
    category: img.category ?? "Gallery",
    orientation: img.orientation === "portrait" ? "portrait" : "landscape",
  }));

  const unifiedStaticImages: GalleryItem[] = galleryImages.map((img) => ({
    id: img.id,
    src: img.src,
    alt: img.alt,
    category: img.category,
    orientation: img.orientation === "portrait" ? "portrait" : "landscape",
  }));

  return [...unifiedDbImages, ...unifiedStaticImages];
}
