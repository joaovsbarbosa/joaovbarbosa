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
        alt={entry.title}
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
    offset: ["start 0.8", "end 0.5"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-md px-6">
      {/* trilho de fundo */}
      <div className="absolute left-[27px] top-2 bottom-2 w-px bg-accent-soft" />
      {/* trilho preenchido conforme o scroll */}
      <motion.div
        className="absolute left-[27px] top-2 w-px origin-top bg-accent"
        style={{ scaleY: lineProgress, height: "calc(100% - 1rem)" }}
      />

      <ol className="flex flex-col gap-14">
        {entries.map((entry, i) => (
          <motion.li
            key={`${entry.date}-${i}`}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative pl-14"
          >
            <span className="absolute left-[19px] top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-background" />

            <span className="mb-2 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              {entry.date}
            </span>

            <div className="relative mb-3 aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5">
              <TimelineImage entry={entry} />
            </div>

            <h3 className="font-display text-xl text-foreground">
              {entry.title}
            </h3>
            {entry.description && (
              <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                {entry.description}
              </p>
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
