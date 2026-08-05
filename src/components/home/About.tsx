"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, blurIn, viewportOnce } from "@/lib/motion";
import Mandala from "@/components/ui/Mandala";

const BADGES = [
  "Band Leader — Mrugesh Beats",
  "Tabla Visharad (Distinction)",
  "Music Teacher, Delhi Public School",
  "Founder, Mrugesh Beats Music Academy",
];

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-background py-28 lg:py-36">
      <Mandala className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] opacity-[0.08]" />
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
              src="/about-mrugesh.jpg"
              alt="Mrugesh Shukla, professional live musician, performing on keyboard on stage"
              fill
              className="object-cover"
              style={{ objectPosition: "54% center" }}
              sizes="(max-width: 1024px) 90vw, 480px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-6 -right-6 hidden sm:flex flex-col h-28 w-28 items-center justify-center rounded-full glass-gold shadow-gold-glow text-center leading-tight">
            <span className="text-[10px] uppercase tracking-widest text-stone">Since</span>
            <span className="font-display text-3xl text-gradient-gold">2007</span>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 20 }}
            whileInView={{ opacity: 1, rotate: -6, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -bottom-10 -left-6 hidden sm:block w-36 rounded-xl bg-white p-2 pb-8 shadow-luxury"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-sm">
              <Image
                src="/mrugesh-with-zakir.jpg"
                alt="Mrugesh Shukla with Ustad Zakir Hussain"
                fill
                className="object-cover"
                sizes="144px"
              />
            </div>
            <p className="absolute inset-x-0 bottom-1.5 text-center font-display text-[11px] text-ink">
              With Zakir Hussain
            </p>
          </motion.div>
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
            className="font-display text-4xl sm:text-5xl lg:text-6xl text-ink text-balance"
          >
            A Musician, Mentor & Band Leader Since 2007
          </motion.h2>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={2}
            className="mt-6 text-stone leading-relaxed"
          >
            Based in Nadiad, Gujarat, Mrugesh Shukla leads Mrugesh Beats — a live band built on
            nearly two decades of stage and teaching experience since 2007. A Tabla Visharad
            graduate with distinction, he serves as a Music Teacher at Delhi Public School and
            personally tutors students in Tabla, Octapad, Keyboard, and Congo through one-on-one
            and group sessions at Mrugesh Beats Music Academy — an examination centre recognised
            by the Gujarat state government.
          </motion.p>
          <motion.p
            variants={blurIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={3}
            className="mt-4 text-stone leading-relaxed"
          >
            As band leader, he brings that same discipline and musicality to every wedding, Garba
            night, and Bhakti Sandhya performance — blending tradition with a modern,
            celebrity-grade stage presence that keeps thousands of guests on their feet.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            custom={4}
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
