"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-soft/50 via-background to-background" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-sm font-semibold uppercase tracking-[0.2em] text-accent"
      >
        {siteConfig.eventTitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="relative mt-4 font-display text-4xl italic leading-tight text-foreground sm:text-5xl"
      >
        Finalmente, casa nova!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mt-5 max-w-sm text-base leading-relaxed text-foreground/70"
      >
        {siteConfig.introText}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-6 flex flex-col gap-1 text-sm text-foreground/60"
      >
        <span>{siteConfig.eventDate}</span>
        <span>{siteConfig.eventAddress}</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 flex flex-col items-center gap-1 text-foreground/40"
        aria-hidden="true"
      >
        <span className="text-xs uppercase tracking-widest">Role para ver</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </section>
  );
}
