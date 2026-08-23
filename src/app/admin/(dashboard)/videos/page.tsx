import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import DeleteButton from "@/components/admin/DeleteButton";
import VideoUploadForm from "./VideoUploadForm";
import { deleteVideoAction } from "./actions";

export default async function AdminVideosPage() {
  const videos = await safeQuery(
    () => prisma.video.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Videos</h1>
      <p className="mt-1 text-sm text-stone">
        Videos added here show up in the homepage video section alongside the existing ones.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <VideoUploadForm />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {videos.map((video) => (
          <div key={video.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-video w-full">
              <Image src={video.posterUrl} alt={video.title} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-2 p-2">
              <p className="truncate text-xs text-stone">{video.title}</p>
              <DeleteButton action={deleteVideoAction.bind(null, video.id)} confirmMessage={`Delete "${video.title}"?`} />
            </div>
          </div>
        ))}
      </div>
      {videos.length === 0 && <p className="mt-8 text-sm text-stone">No videos added yet.</p>}
    </div>
  );
}
