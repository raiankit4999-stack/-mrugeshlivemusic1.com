"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { scrollToSection } from "@/lib/lenis";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Events" },
  { id: "gallery", label: "Gallery" },
  { id: "videos", label: "Videos" },
  { id: "services", label: "Services" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((item) => document.getElementById(item.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 2.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled ? "glass py-3" : "bg-transparent py-6"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <button onClick={() => scrollTo("home")} aria-label="Mrugesh Beats — Home">
          <Image
            src="/logo.png"
            alt="Mrugesh Beats"
            width={405}
            height={458}
            priority
            className="h-12 sm:h-14 w-auto"
          />
        </button>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "relative text-sm tracking-wide uppercase text-stone transition-colors hover:text-gold",
                active === item.id && "text-gold"
              )}
            >
              {item.label}
              {active === item.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-gold"
                />
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scrollTo("contact")}
          className="hidden lg:inline-flex items-center rounded-full border border-gold/50 px-5 py-2 text-sm tracking-wide uppercase text-gold transition-colors hover:bg-gold hover:text-ink"
        >
          Book Now
        </button>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="lg:hidden text-gold" aria-label="Open menu">
            <Menu size={28} />
          </SheetTrigger>
          <SheetContent side="right" className="bg-ink-soft border-gold/20">
            <SheetTitle className="px-4 pt-6">
              <Image
                src="/logo.png"
                alt="Mrugesh Beats"
                width={405}
                height={458}
                className="h-16 w-auto"
              />
            </SheetTitle>
            <nav className="flex flex-col gap-6 px-6 py-8">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={cn(
                    "text-left text-lg uppercase tracking-wide text-stone hover:text-gold transition-colors",
                    active === item.id && "text-gold"
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
