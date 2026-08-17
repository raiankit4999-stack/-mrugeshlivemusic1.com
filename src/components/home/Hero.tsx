"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import HeroBackground from "@/components/home/HeroBackground";
import { scrollToSection } from "@/lib/lenis";

export default function Hero() {
  const scrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-end justify-center overflow-hidden bg-[#170e08] noise-overlay"
    >
      <div className="absolute inset-0">
        <HeroBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-[#170e08]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#170e08] via-transparent to-black/40" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22),transparent_60%)]" />
      </div>

      <h1 className="sr-only">
        Crystal Beats — Events by Mrugesh Shukla | Live Musician &amp; Live Band Bookings Across Gujarat
      </h1>

      <motion.button
        onClick={() => scrollTo("about")}
        aria-label="Scroll down"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 4, duration: 1 }, y: { delay: 4.5, duration: 1.8, repeat: Infinity } }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-gold"
      >
        <ChevronDown size={28} />
      </motion.button>
    </section>
  );
}
