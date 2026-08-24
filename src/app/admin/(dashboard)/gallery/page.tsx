import Link from "next/link";
import Image from "next/image";
import { Pencil } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/safeQuery";
import { buttonVariants } from "@/components/ui/button";
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
        Every photo shown on the homepage gallery — including the site&apos;s original photos — is
        listed here and can be edited or removed.
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
              <div className="flex shrink-0 items-center gap-1.5">
                <Link
                  href={`/admin/gallery/${image.id}/edit`}
                  className={buttonVariants({ variant: "outline", size: "icon-sm" })}
                  aria-label="Edit"
                >
                  <Pencil size={13} />
                </Link>
                <DeleteButton
                  action={deleteGalleryImageAction.bind(null, image.id)}
                  confirmMessage="Delete this image?"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <p className="mt-8 text-sm text-stone">
          No images yet — they&apos;ll appear here automatically after the next deploy finishes
          importing the site&apos;s existing photos, or add a new one above.
        </p>
      )}
    </div>
  );
}
