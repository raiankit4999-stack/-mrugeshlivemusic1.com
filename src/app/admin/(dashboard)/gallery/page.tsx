import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import DeleteButton from "@/components/admin/DeleteButton";
import GalleryUploadForm from "./GalleryUploadForm";
import { deleteGalleryImageAction } from "./actions";

export default async function AdminGalleryPage() {
  const images = await safeQuery(
    () => prisma.galleryImage.findMany({ orderBy: { order: "asc" } }),
    []
  );

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Gallery</h1>
      <p className="mt-1 text-sm text-stone">
        Images added here show up on the homepage gallery alongside the existing photos.
      </p>

      <div className="mt-6 rounded-xl border border-border bg-card p-5">
        <GalleryUploadForm />
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((image) => (
          <div key={image.id} className="overflow-hidden rounded-xl border border-border bg-card">
            <div className="relative aspect-square w-full">
              <Image src={image.imageUrl} alt={image.alt} fill className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-2 p-2">
              <p className="truncate text-xs text-stone">{image.category ?? "Gallery"}</p>
              <DeleteButton
                action={deleteGalleryImageAction.bind(null, image.id)}
                confirmMessage="Delete this image?"
              />
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && <p className="mt-8 text-sm text-stone">No images added yet.</p>}
    </div>
  );
}
