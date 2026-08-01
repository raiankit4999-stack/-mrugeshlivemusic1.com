"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

const BAR_COUNT = 24;
const NOTE_COUNT = 8;

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useLockBodyScroll(visible);

  useEffect(() => {
    const minTime = new Promise((resolve) => setTimeout(resolve, 2600));
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
                className="absolute text-gold/40 font-display"
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
              <motion.div
                aria-hidden
                className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gold/25 blur-3xl"
                animate={{ scale: [0.85, 1.15, 0.85], opacity: [0.4, 0.75, 0.4] }}
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                initial={{ scale: 0.7, opacity: 0, filter: "blur(14px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Image
                    src="/logo.png"
                    alt="Mrugesh Beats"
                    width={405}
                    height={458}
                    priority
                    className="relative z-10 w-44 sm:w-56 h-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.45)]"
                  />
                </motion.div>
              </motion.div>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
