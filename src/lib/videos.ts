import staticVideos from "@/data/videos.json";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";

export type VideoItem = {
  id: string;
  title: string;
  type: "mp4" | "youtube";
  src: string;
  poster: string;
};

export async function getVideos(): Promise<VideoItem[]> {
  const dbVideos = await safeQuery(
    () =>
      prisma.video.findMany({
        where: { published: true },
        orderBy: { order: "asc" },
      }),
    []
  );

  // Same fallback pattern as gallery.ts: DB is the source of truth once the
  // one-time seed has run, static file is the fallback until then.
  if (dbVideos.length > 0) {
    return dbVideos.map((video) => ({
      id: video.id,
      title: video.title,
      type: video.type === "mp4" ? "mp4" : "youtube",
      src: video.videoUrl,
      poster: video.posterUrl,
    }));
  }

  return staticVideos.map((video) => ({
    id: video.id,
    title: video.title,
    type: video.type === "mp4" ? "mp4" : "youtube",
    src: video.src,
    poster: video.poster,
  }));
}
