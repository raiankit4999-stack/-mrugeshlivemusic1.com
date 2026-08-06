"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ scale: 2.6, opacity: 0, filter: "blur(18px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/logo.png"
              alt="Mrugesh Beats"
              width={405}
              height={458}
              priority
              className="w-44 sm:w-56 h-auto"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
