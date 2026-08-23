"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { uploadImageIfProvided } from "@/lib/blobUpload";
import { wordsToReadingTime } from "@/lib/posts";

export type PostFormState = { error?: string };

function readPostFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const metaTitle = String(formData.get("metaTitle") ?? "").trim();
  const metaDescription = String(formData.get("metaDescription") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim();
  const bodyMarkdown = String(formData.get("bodyMarkdown") ?? "").trim();
  const coverAlt = String(formData.get("coverAlt") ?? "").trim();
  const tagsRaw = String(formData.get("tags") ?? "");
  const published = formData.get("published") === "on";

  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const slug = slugify(slugInput || title);

  return { title, slug, metaTitle, metaDescription, excerpt, bodyMarkdown, coverAlt, tags, published };
}

function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPostAction(_prev: PostFormState, formData: FormData): Promise<PostFormState> {
  const fields = readPostFields(formData);

  if (!fields.title) return { error: "Title is required." };
  if (!fields.slug) return { error: "Slug could not be generated — check the title or slug field." };
  if (!fields.excerpt) return { error: "Excerpt is required." };
  if (!fields.bodyMarkdown) return { error: "Post content is required." };
  if (!fields.coverAlt) return { error: "Cover image alt text is required for SEO." };

  const existing = await prisma.post.findUnique({ where: { slug: fields.slug } });
  if (existing) return { error: `The slug "${fields.slug}" is already in use. Choose a different one.` };

  let coverImage: string | null;
  try {
    coverImage = await uploadImageIfProvided(formData.get("coverImageFile") as File | null);
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }
  if (!coverImage) return { error: "A cover image is required." };

  await prisma.post.create({
    data: {
      ...fields,
      coverImage,
      readingTime: wordsToReadingTime(fields.bodyMarkdown),
    },
  });

  revalidateBlogPaths(fields.slug);
  redirect("/admin/posts");
}

export async function updatePostAction(
  id: string,
  _prev: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  const fields = readPostFields(formData);

  if (!fields.title) return { error: "Title is required." };
  if (!fields.slug) return { error: "Slug could not be generated — check the title or slug field." };
  if (!fields.excerpt) return { error: "Excerpt is required." };
  if (!fields.bodyMarkdown) return { error: "Post content is required." };
  if (!fields.coverAlt) return { error: "Cover image alt text is required for SEO." };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { error: "Post not found." };

  const slugOwner = await prisma.post.findUnique({ where: { slug: fields.slug } });
  if (slugOwner && slugOwner.id !== id) {
    return { error: `The slug "${fields.slug}" is already in use. Choose a different one.` };
  }

  let coverImage = existing.coverImage;
  try {
    const uploaded = await uploadImageIfProvided(formData.get("coverImageFile") as File | null);
    if (uploaded) coverImage = uploaded;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Image upload failed." };
  }

  await prisma.post.update({
    where: { id },
    data: {
      ...fields,
      coverImage,
      readingTime: wordsToReadingTime(fields.bodyMarkdown),
    },
  });

  revalidateBlogPaths(existing.slug);
  revalidateBlogPaths(fields.slug);
  redirect("/admin/posts");
}

export async function deletePostAction(id: string): Promise<void> {
  const existing = await prisma.post.delete({ where: { id } });
  revalidateBlogPaths(existing.slug);
  revalidatePath("/admin/posts");
}
