import Link from "next/link";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { timelineEntries, timelineOutro } from "@/data/timeline";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <Timeline entries={timelineEntries} />

      <section className="relative z-20 mx-auto w-full max-w-md bg-background px-6 py-24 text-center">
        <div className="rounded-3xl bg-accent-soft/60 px-6 py-10">
          <p className="font-display text-2xl italic leading-snug text-foreground">
            {timelineOutro}
          </p>
          <Link
            href="/presentes"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
          >
            Ver lista de presentes
          </Link>
        </div>
      </section>
    </main>
  );
}
