"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TimelineEntry } from "@/data/timeline";

function TimelineImage({ entry }: { entry: TimelineEntry }) {
  if (entry.image) {
    return (
      <Image
        src={entry.image}
        alt={entry.caption}
        fill
        sizes="100vw"
        className="object-cover"
      />
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-stone-700 to-stone-900 text-white/60">
      <svg
        width="40"
        height="40"
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
      <span className="text-sm font-medium">Foto em breve</span>
    </div>
  );
}

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="relative bg-black">
      {entries.map((entry, i) => (
        <div
          key={i}
          className="sticky top-0 h-[100svh] w-full overflow-hidden"
          style={{ zIndex: i + 1 }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.12 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          >
            <TimelineImage entry={entry} />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/5 to-black/40" />

          <motion.div
            initial={{ opacity: 0, y: -14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.9 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute inset-x-0 top-0 px-6 pt-14"
          >
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              {String(i + 1).padStart(2, "0")} / {String(entries.length).padStart(2, "0")}
            </span>
            <p className="font-display text-2xl italic leading-snug text-white">
              {entry.caption}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  );
}
