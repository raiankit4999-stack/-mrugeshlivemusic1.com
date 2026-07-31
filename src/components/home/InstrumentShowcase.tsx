"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import instruments from "@/data/instruments.json";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function InstrumentShowcase() {
  return (
    <section className="relative bg-background py-28 lg:py-36 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Live Orchestra"
          title="Instruments Behind Every Performance"
          description="A full live setup of traditional and modern instruments, played by seasoned professionals."
        />

        <div className="mt-16 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {instruments.map((instrument, i) => (
            <motion.div
              key={instrument.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={i % 4}
              whileHover={{ rotate: i % 2 === 0 ? 2 : -2, y: -8 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-2xl shadow-luxury transition-shadow duration-300 hover:shadow-gold-glow"
            >
              <Image
                src={instrument.image}
                alt={instrument.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-display text-xl text-white">{instrument.name}</p>
              </div>
              <div className="absolute inset-0 border border-gold/0 transition-colors duration-300 group-hover:border-gold/40 rounded-2xl" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
