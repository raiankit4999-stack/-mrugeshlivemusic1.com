"use client";

import { motion } from "framer-motion";
import whyChooseUs from "@/data/whyChooseUs.json";
import { iconMap } from "@/lib/iconMap";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function WhyChooseUs() {
  return (
    <section className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Why Mrugesh Beats"
          title="Excellence in Every Detail"
          description="Every performance is backed by a team and a sound experience designed for celebrity-grade events."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={item.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i % 4}
              >
                <GlowCard className="h-full text-center">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
                    {Icon && <Icon size={24} />}
                  </div>
                  <h3 className="font-display text-xl text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone">{item.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
