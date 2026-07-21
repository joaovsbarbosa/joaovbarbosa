import Link from "next/link";
import Hero from "@/components/Hero";
import Timeline from "@/components/Timeline";
import { timelineEntries } from "@/data/timeline";
import { siteConfig } from "@/data/site";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />

      <section className="px-6 pb-4 pt-16 text-center">
        <h2 className="font-display text-2xl italic text-foreground">
          Nossa jornada até aqui
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-foreground/60">
          Cada etapa da obra, até o apê ficar pronto para receber vocês.
        </p>
      </section>

      <Timeline entries={timelineEntries} />

      <section className="mx-auto mt-20 w-full max-w-md px-6 pb-24 text-center">
        <div className="rounded-3xl bg-accent-soft/60 px-6 py-10">
          <h2 className="font-display text-2xl italic text-foreground">
            Quer nos ajudar a montar a casa?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-foreground/70">
            {siteConfig.giftsIntro}
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
