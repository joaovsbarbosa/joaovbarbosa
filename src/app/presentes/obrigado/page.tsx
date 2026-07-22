import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="font-display text-3xl italic leading-snug text-foreground">
        Valeu demais pela sua ajuda!
      </p>
      <p className="mt-3 text-base leading-relaxed text-foreground/70">
        Pode ter certeza que irá me ajudar muuuuito!
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
      >
        Voltar pro início
      </Link>
    </main>
  );
}
