"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Play } from "lucide-react";
import gsap from "gsap";
import Image from "next/image";
import siteConfig from "@/data/siteConfig.json";
import MagneticButton from "@/components/ui/MagneticButton";
import { scrollToSection } from "@/lib/lenis";

const Scene = dynamic(() => import("@/components/3d/Scene"), { ssr: false });

const TITLE = "MRUGESH SHUKLA";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;
    const chars = titleRef.current.querySelectorAll(".char");
    gsap.fromTo(
      chars,
      { yPercent: 120, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.04,
        ease: "power4.out",
        delay: 2.6,
      }
    );
  }, []);

  const scrollTo = (id: string) => {
    scrollToSection(id);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-background noise-overlay"
    >
      <div className="absolute inset-0">
        {siteConfig.heroVideoUrl ? (
          <video
            className="h-full w-full object-cover animate-hero-zoom"
            autoPlay
            muted
            loop
            playsInline
            poster={siteConfig.heroPosterUrl}
          >
            <source src={siteConfig.heroVideoUrl} type="video/mp4" />
          </video>
        ) : (
          <div className="relative h-full w-full animate-hero-zoom">
            <Image
              src={siteConfig.heroPosterUrl}
              alt="Mrugesh Shukla live concert atmosphere"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        <div className="absolute inset-0 [background:radial-gradient(circle_at_50%_35%,rgba(212,175,55,0.22),transparent_60%)]" />
      </div>

      <div className="absolute inset-0">
        <Scene />
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="mb-6 text-xs sm:text-sm uppercase tracking-[0.5em] text-gold"
        >
          Live Entertainment &middot; Wedding Specialist
        </motion.p>

        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl lg:text-8xl tracking-wide text-gradient-gold"
        >
          {TITLE.split("").map((char, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom">
              <span className="char inline-block">{char === " " ? " " : char}</span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.4, duration: 0.8 }}
          className="mt-6 max-w-xl text-base sm:text-lg text-stone"
        >
          Gujarati Live Music for weddings, Garba nights, and celebrations that feel like a
          headline concert.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.7, duration: 0.8 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-5"
        >
          <MagneticButton
            onClick={() => scrollTo("contact")}
            className="rounded-full bg-gold px-8 py-4 text-sm font-medium uppercase tracking-widest text-ink shadow-gold-glow hover:bg-gold-soft"
          >
            Book Now
          </MagneticButton>
          <MagneticButton
            onClick={() => scrollTo("videos")}
            className="gap-2 rounded-full border border-gold/40 px-8 py-4 text-sm font-medium uppercase tracking-widest text-white hover:border-gold hover:text-gold"
          >
            <Play size={16} /> Watch Live
          </MagneticButton>
        </motion.div>
      </div>

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
