"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { uploadImageIfProvided } from "@/lib/blobUpload";

export type GalleryFormState = { error?: string };

export async function addGalleryImageAction(
  _prev: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  const alt = String(formData.get("alt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const orientation = formData.get("orientation") === "portrait" ? "portrait" : "landscape";

  if (!alt) return { error: "Alt text is required for SEO." };

  let imageUrl: string | null;
  try {
    imageUrl = await uploadImageIfProvided(formData.get("imageFile") as File | null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }
  if (!imageUrl) return { error: "Please choose an image to upload." };

  const last = await prisma.galleryImage.findFirst({ orderBy: { order: "desc" } });

  await prisma.galleryImage.create({
    data: {
      imageUrl,
      alt,
      category: category || null,
      orientation,
      order: (last?.order ?? 0) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/gallery");
  return {};
}

export async function deleteGalleryImageAction(id: string): Promise<void> {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
