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

  const unifiedDbVideos: VideoItem[] = dbVideos.map((video) => ({
    id: video.id,
    title: video.title,
    type: video.type === "mp4" ? "mp4" : "youtube",
    src: video.videoUrl,
    poster: video.posterUrl,
  }));

  const unifiedStaticVideos: VideoItem[] = staticVideos.map((video) => ({
    id: video.id,
    title: video.title,
    type: video.type === "mp4" ? "mp4" : "youtube",
    src: video.src,
    poster: video.poster,
  }));

  return [...unifiedDbVideos, ...unifiedStaticVideos];
}
