"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";

export type GalleryFormState = { error?: string };

export async function addGalleryImageAction(
  _prev: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  const alt = String(formData.get("alt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const orientation = formData.get("orientation") === "portrait" ? "portrait" : "landscape";

  if (!alt) return { error: "Alt text is required for SEO." };

  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
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

export async function updateGalleryImageAction(
  id: string,
  _prev: GalleryFormState,
  formData: FormData
): Promise<GalleryFormState> {
  const alt = String(formData.get("alt") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const orientation = formData.get("orientation") === "portrait" ? "portrait" : "landscape";

  if (!alt) return { error: "Alt text is required for SEO." };

  const existing = await prisma.galleryImage.findUnique({ where: { id } });
  if (!existing) return { error: "Image not found." };

  const uploaded = String(formData.get("imageUrl") ?? "").trim();
  const imageUrl = uploaded || existing.imageUrl;

  await prisma.galleryImage.update({
    where: { id },
    data: { imageUrl, alt, category: category || null, orientation },
  });

  revalidatePath("/");
  revalidatePath("/admin/gallery");
  redirect("/admin/gallery");
}

export async function deleteGalleryImageAction(id: string): Promise<void> {
  await prisma.galleryImage.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/gallery");
}
