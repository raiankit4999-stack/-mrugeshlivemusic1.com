import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import VideoEditForm from "../../VideoEditForm";
import { updateVideoAction } from "../../actions";

export default async function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = await prisma.video.findUnique({ where: { id } });
  if (!video) notFound();

  const boundUpdate = updateVideoAction.bind(null, video.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Video</h1>
      <div className="mt-6">
        <VideoEditForm
          action={boundUpdate}
          defaults={{
            title: video.title,
            type: video.type === "mp4" ? "mp4" : "youtube",
            posterUrl: video.posterUrl,
          }}
        />
      </div>
    </div>
  );
}
