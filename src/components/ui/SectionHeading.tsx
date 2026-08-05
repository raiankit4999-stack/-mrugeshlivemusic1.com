"use client";

import { motion } from "framer-motion";
import { blurIn, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" ? "text-center mx-auto" : "text-left", "max-w-2xl", className)}>
      {eyebrow && (
        <motion.p
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-3 text-xs sm:text-sm uppercase tracking-[0.35em] text-gold"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={blurIn}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        custom={1}
        className="font-display text-4xl sm:text-5xl lg:text-6xl text-balance text-ink"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={blurIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          custom={2}
          className="mt-5 text-stone leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
