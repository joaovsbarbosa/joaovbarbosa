"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section
      className="sticky top-0 z-0 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-accent-soft/60 via-background to-background px-6 text-center"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
      >
        {siteConfig.eventTitle}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="mt-3 font-display text-4xl italic leading-tight text-foreground sm:text-5xl"
      >
        {siteConfig.hostNames}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="mt-5 flex flex-col gap-1 text-sm text-foreground/60"
      >
        <span>{siteConfig.eventDate}</span>
        <span>{siteConfig.eventAddress}</span>
      </motion.div>
    </section>
  );
}
