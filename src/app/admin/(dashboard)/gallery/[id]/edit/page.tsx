import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import GalleryImageForm from "../../GalleryImageForm";
import { updateGalleryImageAction } from "../../actions";

export default async function EditGalleryImagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const image = await prisma.galleryImage.findUnique({ where: { id } });
  if (!image) notFound();

  const boundUpdate = updateGalleryImageAction.bind(null, image.id);

  return (
    <div>
      <h1 className="text-xl font-semibold text-ink">Edit Image</h1>
      <div className="mt-6">
        <GalleryImageForm
          action={boundUpdate}
          defaults={{
            alt: image.alt,
            category: image.category ?? "",
            orientation: image.orientation === "portrait" ? "portrait" : "landscape",
            imageUrl: image.imageUrl,
          }}
        />
      </div>
    </div>
  );
}
