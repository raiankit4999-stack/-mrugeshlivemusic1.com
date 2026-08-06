"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import Mandala from "@/components/ui/Mandala";

const BAR_COUNT = 24;
const NOTE_COUNT = 6;
const RING_COUNT = 5;
const PARTICLE_COUNT = 18;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useLockBodyScroll(visible);

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 3000));
    const ready =
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));

    Promise.all([minTime, ready]).then(() => setVisible(false));
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
            {Array.from({ length: RING_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className={`absolute rounded-full border ${
                  i % 2 === 0 ? "border-gold/40" : "border-maroon/35"
                }`}
                style={{ width: 60, height: 60 }}
                initial={{ scale: 1, opacity: 0.8 }}
                animate={{ scale: 18, opacity: 0 }}
                transition={{
                  duration: 4.5,
                  delay: i * 0.9,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const left = (i * 61.8) % 100;
              const top = (i * 37.2) % 100;
              const size = 3 + (i % 3) * 2;
              const isMaroon = i % 4 === 0;
              return (
                <motion.span
                  key={i}
                  className={`absolute rounded-full ${isMaroon ? "bg-maroon/50" : "bg-gold/60"}`}
                  style={{ left: `${left}%`, top: `${top}%`, width: size, height: size }}
                  animate={{
                    y: [0, -18, 0],
                    opacity: [0.2, 0.9, 0.2],
                  }}
                  transition={{
                    duration: 3 + (i % 4),
                    delay: (i * 0.25) % 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
            {Array.from({ length: NOTE_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-maroon/35 font-display"
                style={{
                  left: `${(i * 97) % 100}%`,
                  fontSize: `${16 + (i % 4) * 8}px`,
                }}
                initial={{ y: "110vh", opacity: 0 }}
                animate={{ y: "-10vh", opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 5 + (i % 5),
                  delay: i * 0.35,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                ♪
              </motion.span>
            ))}
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10">
            <div className="relative flex items-center justify-center">
              <Mandala className="pointer-events-none absolute h-[520px] w-[520px] sm:h-[640px] sm:w-[640px]" />

              <motion.div
                initial={{ scale: 2.6, opacity: 0, filter: "blur(18px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2.2 }}
                >
                  <Image
                    src="/logo.png"
                    alt="Mrugesh Beats"
                    width={405}
                    height={458}
                    priority
                    className="relative z-10 w-44 sm:w-56 h-auto drop-shadow-[0_10px_30px_rgba(155,44,62,0.25)]"
                  />
                </motion.div>
              </motion.div>
            </div>

            <div className="flex items-end gap-[3px] h-8">
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-maroon to-gold origin-bottom"
                  style={{ height: "100%" }}
                  animate={{ scaleY: [0.2, 1, 0.3, 0.8, 0.2] }}
                  transition={{
                    duration: 1.1 + (i % 5) * 0.1,
                    repeat: Infinity,
                    delay: i * 0.04,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
