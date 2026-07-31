"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const NAME = "MRUGESH BEATS";
const BAR_COUNT = 24;
const NOTE_COUNT = 10;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useLockBodyScroll(visible);

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 2400));
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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: NOTE_COUNT }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute text-gold/50 font-display"
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

          <div className="relative z-10 flex flex-col items-center gap-8">
            <div className="flex overflow-hidden">
              {NAME.split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display text-3xl sm:text-5xl tracking-[0.2em] text-gradient-gold"
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </div>

            <div className="flex items-end gap-[3px] h-8">
              {Array.from({ length: BAR_COUNT }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[3px] rounded-full bg-gradient-to-t from-accent-bronze to-gold origin-bottom"
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

            <motion.p
              className="text-stone text-xs tracking-[0.4em] uppercase font-sans"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 1 }}
            >
              Live Entertainment
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
