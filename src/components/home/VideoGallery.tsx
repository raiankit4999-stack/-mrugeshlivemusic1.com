"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { fadeUp, viewportOnce } from "@/lib/motion";
import type { VideoItem } from "@/lib/videos";

function VideoCard({ video, index }: { video: VideoItem; index: number }) {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      custom={index % 3}
      className="group relative aspect-video overflow-hidden rounded-2xl shadow-luxury"
    >
      {playing ? (
        video.type === "mp4" ? (
          <video
            src={video.src}
            poster={video.poster}
            className="h-full w-full object-cover"
            controls
            autoPlay
          />
        ) : (
          <iframe
            src={video.src}
            title={video.title}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        )
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative h-full w-full"
          aria-label={`Play ${video.title}`}
        >
          <Image
            src={video.poster}
            alt={video.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <motion.span
            whileHover={{ scale: 1.15 }}
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full glass-gold text-gold shadow-gold-glow"
          >
            <Play size={26} fill="currentColor" />
          </motion.span>
          <p className="absolute inset-x-0 bottom-0 p-4 text-left font-display text-lg text-white">
            {video.title}
          </p>
        </button>
      )}
    </motion.div>
  );
}

export default function VideoGallery({ videos }: { videos: VideoItem[] }) {
  return (
    <section id="videos" className="relative bg-background py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Watch Live"
          title="Performances That Speak for Themselves"
          description="Highlights from weddings, Garba nights, and corporate stages — watch the energy up close."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
