"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import type { TimelineEntry } from "@/data/timeline";

function TimelineImage({ entry }: { entry: TimelineEntry }) {
  if (entry.image) {
    return (
      <Image
        src={entry.image}
        alt={entry.caption}
        fill
        sizes="(min-width: 448px) 448px, 100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-accent-soft to-accent/30 text-accent">
      <svg
        width="36"
        height="36"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path
          d="M4 7h3l1.5-2h7L17 7h3a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1Z"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="3.5" />
      </svg>
      <span className="text-xs font-medium">Foto em breve</span>
    </div>
  );
}

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-md px-6">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-accent-soft" />
      <motion.div
        className="absolute left-[7px] top-2 w-px origin-top bg-accent"
        style={{ scaleY: lineProgress, height: "calc(100% - 1rem)" }}
      />

      <ol className="flex flex-col gap-16">
        {entries.map((entry, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative pl-8"
          >
            <span className="absolute left-0 top-1.5 z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-accent bg-background" />

            <p className="mb-3 font-display text-xl italic leading-snug text-foreground">
              {entry.caption}
            </p>

            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <TimelineImage entry={entry} />
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
