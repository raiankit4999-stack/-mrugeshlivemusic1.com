"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { toYouTubeEmbedUrl } from "@/lib/youtube";

export type VideoFormState = { error?: string };

export async function addVideoAction(_prev: VideoFormState, formData: FormData): Promise<VideoFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const sourceType = formData.get("sourceType") === "upload" ? "mp4" : "youtube";
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();

  if (!title) return { error: "Title is required." };

  const posterUrl = String(formData.get("posterUrl") ?? "").trim();
  if (!posterUrl) return { error: "A poster (thumbnail) image is required." };

  let videoUrl: string;
  if (sourceType === "youtube") {
    const embed = toYouTubeEmbedUrl(youtubeUrl);
    if (!embed) return { error: "That doesn't look like a valid YouTube link." };
    videoUrl = embed;
  } else {
    const uploaded = String(formData.get("videoUrl") ?? "").trim();
    if (!uploaded) return { error: "Please choose a video file to upload." };
    videoUrl = uploaded;
  }

  const last = await prisma.video.findFirst({ orderBy: { order: "desc" } });

  await prisma.video.create({
    data: {
      title,
      videoUrl,
      posterUrl,
      type: sourceType,
      order: (last?.order ?? 0) + 1,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/videos");
  return {};
}

export async function updateVideoAction(
  id: string,
  _prev: VideoFormState,
  formData: FormData
): Promise<VideoFormState> {
  const title = String(formData.get("title") ?? "").trim();
  const youtubeUrl = String(formData.get("youtubeUrl") ?? "").trim();

  if (!title) return { error: "Title is required." };

  const existing = await prisma.video.findUnique({ where: { id } });
  if (!existing) return { error: "Video not found." };

  const uploadedPoster = String(formData.get("posterUrl") ?? "").trim();
  const posterUrl = uploadedPoster || existing.posterUrl;

  let videoUrl = existing.videoUrl;
  if (existing.type === "youtube" && youtubeUrl) {
    const embed = toYouTubeEmbedUrl(youtubeUrl);
    if (!embed) return { error: "That doesn't look like a valid YouTube link." };
    videoUrl = embed;
  } else if (existing.type === "mp4") {
    const uploadedVideo = String(formData.get("videoUrl") ?? "").trim();
    if (uploadedVideo) videoUrl = uploadedVideo;
  }

  await prisma.video.update({
    where: { id },
    data: { title, posterUrl, videoUrl },
  });

  revalidatePath("/");
  revalidatePath("/admin/videos");
  redirect("/admin/videos");
}

export async function deleteVideoAction(id: string): Promise<void> {
  await prisma.video.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/videos");
}
