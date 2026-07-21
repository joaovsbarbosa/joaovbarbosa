"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/data/site";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center px-6 pb-10 pt-16 text-center">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-accent-soft/50 to-background" />

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
        className="relative mt-3 font-display text-3xl italic leading-tight text-foreground sm:text-4xl"
      >
        {siteConfig.hostNames}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="relative mt-4 flex flex-col gap-1 text-sm text-foreground/60"
      >
        <span>{siteConfig.eventDate}</span>
        <span>{siteConfig.eventAddress}</span>
      </motion.div>
    </section>
  );
}
