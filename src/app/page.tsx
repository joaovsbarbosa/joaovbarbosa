import Link from "next/link";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { timelineEntries, timelineOutro } from "@/data/timeline";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <Timeline entries={timelineEntries} />

      <section className="sticky top-0 z-20 flex h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-background via-background to-accent-soft px-6 text-center">
        <p className="font-display text-3xl italic leading-snug text-foreground">
          {timelineOutro}
        </p>
        <Link
          href="/presentes"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
        >
          Ver lista de presentes
        </Link>
      </section>
    </main>
  );
}
