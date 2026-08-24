// Idempotent seed: copies the site's original static gallery/video/testimonial
// content into the database (once) so it becomes manageable from /admin
// alongside anything added later. Safe to run on every deploy — it only
// inserts when a table is still empty.
import { PrismaClient } from "@prisma/client";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, "..", "src", "data");

function readJson(file) {
  return JSON.parse(readFileSync(path.join(dataDir, file), "utf8"));
}

const prisma = new PrismaClient();

async function seedGallery() {
  const count = await prisma.galleryImage.count();
  if (count > 0) return { skipped: true, count };

  const images = readJson("gallery.json");
  await prisma.galleryImage.createMany({
    data: images.map((img, i) => ({
      imageUrl: img.src,
      alt: img.alt,
      category: img.category ?? null,
      orientation: img.orientation === "portrait" ? "portrait" : "landscape",
      order: i,
    })),
  });
  return { skipped: false, count: images.length };
}

async function seedVideos() {
  const count = await prisma.video.count();
  if (count > 0) return { skipped: true, count };

  const videos = readJson("videos.json");
  await prisma.video.createMany({
    data: videos.map((v, i) => ({
      title: v.title,
      videoUrl: v.src,
      posterUrl: v.poster,
      type: v.type === "mp4" ? "mp4" : "youtube",
      order: i,
    })),
  });
  return { skipped: false, count: videos.length };
}

async function seedTestimonials() {
  const count = await prisma.testimonial.count();
  if (count > 0) return { skipped: true, count };

  const testimonials = readJson("testimonials.json");
  await prisma.testimonial.createMany({
    data: testimonials.map((t, i) => ({
      name: t.name,
      role: t.role ?? null,
      quote: t.quote,
      rating: t.rating ?? 5,
      order: i,
    })),
  });
  return { skipped: false, count: testimonials.length };
}

async function main() {
  const [gallery, videos, testimonials] = await Promise.all([
    seedGallery(),
    seedVideos(),
    seedTestimonials(),
  ]);
  console.log("Seed result:", { gallery, videos, testimonials });
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
