"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, blurIn, viewportOnce } from "@/lib/motion";

const BADGES = ["Wedding Specialist", "Bhakti Singer", "Garba Performer", "Corporate Performer"];

export default function About() {
  return (
    <section id="about" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 lg:grid-cols-2 lg:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-3xl border border-gold/25" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl shadow-luxury">
            <Image
              src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=900&q=80"
              alt="Mrugesh Shukla, professional Gujarati live musician"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:flex h-28 w-28 items-center justify-center rounded-full glass-gold shadow-gold-glow">
            <span className="font-display text-3xl text-gradient-gold">15+</span>
          </div>
        </motion.div>

        <div>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mb-3 text-xs sm:text-sm uppercase tracking-[0.35em] text-gold"
          >
            About Mrugesh
          </motion.p>
          <motion.h2
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={1}
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-white text-balance"
          >
            A Voice That Turns Every Event Into a Celebration
          </motion.h2>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={2}
            className="mt-6 text-stone leading-relaxed"
          >
            Based in Nadiad, Gujarat, Mrugesh Shukla — known on stage as Mrugesh Beats — has spent
            over 15 years perfecting the art of live Gujarati music. From intimate Bhakti Sandhya
            evenings to full-scale wedding productions with a live orchestra, his performances
            blend tradition with a modern, celebrity-grade stage presence that keeps thousands of
            guests on their feet.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-gold/30 px-4 py-2 text-xs sm:text-sm uppercase tracking-wide text-gold glass"
              >
                {badge}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
