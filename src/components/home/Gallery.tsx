"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import galleryImages from "@/data/gallery.json";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/motion";

const PAGE_SIZE = 8;

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const visibleImages = galleryImages.slice(0, visibleCount);

  const close = useCallback(() => setActiveIndex(null), []);
  const showNext = useCallback(
    () => setActiveIndex((prev) => (prev === null ? null : (prev + 1) % galleryImages.length)),
    []
  );
  const showPrev = useCallback(
    () =>
      setActiveIndex((prev) =>
        prev === null ? null : (prev - 1 + galleryImages.length) % galleryImages.length
      ),
    []
  );

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, close, showNext, showPrev]);

  const active = activeIndex !== null ? galleryImages[activeIndex] : null;

  return (
    <section id="gallery" className="relative bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Moments"
          title="Live in Frame"
          description="A glimpse into the energy, colour, and celebration of every Mrugesh Beats performance."
        />

        <div className="mt-16 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {visibleImages.map((image, i) => (
            <motion.button
              key={image.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={i % 4}
              onClick={() => setActiveIndex(i)}
              className="group relative block w-full overflow-hidden rounded-2xl shadow-luxury"
              style={{ breakInside: "avoid" }}
            >
              <div className={image.orientation === "portrait" ? "aspect-[3/4]" : "aspect-[4/3]"}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
                <ZoomIn className="text-[#f0d98c]" size={28} />
              </div>
              <span className="absolute left-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[#f0d98c] backdrop-blur">
                {image.category}
              </span>
            </motion.button>
          ))}
        </div>

        {visibleCount < galleryImages.length && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="rounded-full border border-gold/40 px-8 py-3 text-sm uppercase tracking-widest text-gold transition-colors hover:bg-gold hover:text-ink"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 backdrop-blur-md p-4"
            onClick={close}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-5 top-5 text-white hover:text-gold"
            >
              <X size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-3 sm:left-8 text-white hover:text-gold"
            >
              <ChevronLeft size={36} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-3 sm:right-8 text-white hover:text-gold"
            >
              <ChevronRight size={36} />
            </button>

            <motion.div
              key={active.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
