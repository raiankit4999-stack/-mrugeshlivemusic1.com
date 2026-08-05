"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import eventExperience from "@/data/eventExperience.json";
import { iconMap } from "@/lib/iconMap";
import SectionHeading from "@/components/ui/SectionHeading";

export default function EventExperience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.6,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>(".timeline-step").forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative bg-ink-soft py-28 lg:py-36">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="The Journey"
          title="Your Event Experience"
          description="A seamless journey from the first conversation to the final encore."
        />

        <div className="relative mt-20">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold/10" />
          <div
            ref={lineRef}
            className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-gold via-accent-bronze to-gold"
          />

          <div className="flex flex-col gap-14">
            {eventExperience.map((step, i) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap] ?? null;
              const isEven = i % 2 === 0;
              return (
                <div
                  key={step.id}
                  className={`timeline-step relative flex items-center gap-6 ${
                    isEven ? "sm:flex-row" : "sm:flex-row-reverse sm:text-right"
                  }`}
                >
                  <div className="hidden sm:block sm:w-1/2" />
                  <div className="absolute left-1/2 top-1/2 z-10 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass-gold text-gold shadow-gold-glow">
                    {Icon && <Icon size={20} />}
                  </div>
                  <div className="ml-16 sm:ml-0 sm:w-1/2">
                    <span className="text-xs uppercase tracking-widest text-gold">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-1 font-display text-2xl text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm text-stone leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
