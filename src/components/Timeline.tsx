import Image from "next/image";
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
          <div className="absolute inset-0">
            <TimelineImage entry={entry} />
          </div>

          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/5 to-black/40" />

          <div className="absolute inset-x-0 top-0 px-6 pt-14">
            <p className="font-display text-2xl italic leading-snug text-white">
              {entry.caption}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
