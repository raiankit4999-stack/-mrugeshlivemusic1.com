"use client";

import { motion } from "framer-motion";
import services from "@/data/services.json";
import { iconMap } from "@/lib/iconMap";
import SectionHeading from "@/components/ui/SectionHeading";
import GlowCard from "@/components/ui/GlowCard";
import { fadeUp, viewportOnce } from "@/lib/motion";

export default function Services() {
  return (
    <section id="services" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="What We Offer"
          title="Services Crafted for Every Celebration"
          description="From intimate ceremonies to celebrity-grade productions — every performance is tailored to your event."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                custom={i % 3}
              >
                <GlowCard className="h-full">
                  <motion.div
                    className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold/10 text-gold animate-float-y"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    {Icon && <Icon size={26} />}
                  </motion.div>
                  <h3 className="font-display text-2xl text-ink">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-stone">{service.description}</p>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
