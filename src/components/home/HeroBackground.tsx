"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import heroImages from "@/data/heroImages.json";
import siteConfig from "@/data/siteConfig.json";

const SLIDE_DURATION = 6500;

export default function HeroBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % heroImages.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  if (siteConfig.heroVideoUrl) {
    return (
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
    );
  }

  if (heroImages.length === 0) {
    return (
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
    );
  }

  return (
    <AnimatePresence mode="sync">
      {heroImages
        .filter((_, i) => i === index)
        .map((image) => (
          <motion.div
            key={image.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          >
            <div className="relative h-full w-full animate-hero-zoom bg-black">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-contain sm:object-cover"
                style={{ objectPosition: image.objectPosition }}
                sizes="100vw"
              />
            </div>
          </motion.div>
        ))}
    </AnimatePresence>
  );
}
