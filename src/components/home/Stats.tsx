"use client";

import { motion } from "framer-motion";
import stats from "@/data/stats.json";
import Counter from "@/components/ui/Counter";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Stats() {
  return (
    <section className="relative bg-ink-soft py-20 lg:py-28 noise-overlay">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              custom={i}
              className="text-center"
            >
              <p className="font-display text-4xl sm:text-5xl lg:text-6xl text-gradient-gold">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 text-xs sm:text-sm uppercase tracking-widest text-stone">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
