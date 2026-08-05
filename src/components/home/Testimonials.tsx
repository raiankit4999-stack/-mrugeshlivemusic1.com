"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import testimonials from "@/data/testimonials.json";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [next, paused]);

  const testimonial = testimonials[index];

  return (
    <section
      id="testimonials"
      className="relative bg-ink-soft py-28 lg:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Kind Words"
          title="What Clients Are Saying"
          description="Real feedback from weddings, corporate galas, and community celebrations."
        />

        <div className="relative mt-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                if (info.offset.x < -80) next();
                if (info.offset.x > 80) prev();
              }}
              className="glass-gold rounded-3xl p-8 sm:p-12 text-center shadow-luxury cursor-grab active:cursor-grabbing"
            >
              <Quote className="mx-auto mb-6 text-gold" size={36} />
              <p className="font-display text-xl sm:text-2xl leading-relaxed text-ink text-balance">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="mt-8 flex items-center justify-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-gold text-gold" />
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border border-gold/40">
                  <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" sizes="48px" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-ink">{testimonial.name}</p>
                  <p className="text-xs text-stone">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 top-1/2 hidden -translate-x-14 -translate-y-1/2 rounded-full border border-gold/30 p-2 text-gold hover:bg-gold hover:text-ink sm:flex"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 top-1/2 hidden translate-x-14 -translate-y-1/2 rounded-full border border-gold/30 p-2 text-gold hover:bg-gold hover:text-ink sm:flex"
          >
            <ChevronRight size={20} />
          </button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setIndex(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-gold" : "w-1.5 bg-gold/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
