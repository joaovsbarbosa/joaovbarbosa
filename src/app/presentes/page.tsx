import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";
import { siteConfig } from "@/data/site";
import { vouchers } from "@/data/vouchers";

export const dynamic = "force-dynamic";

export default async function PresentesPage() {
  const items = await prisma.giftItem.findMany({
    orderBy: [{ status: "asc" }, { name: "asc" }],
  });

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-24 pt-14">
      <Link href="/" className="text-sm text-foreground/60">
        ← Voltar
      </Link>

      <h1 className="mt-4 font-display text-3xl italic text-foreground">
        Lista de presentes
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        {siteConfig.giftsIntro}
      </p>

      <section className="mt-8">
        <h2 className="font-display text-xl italic text-foreground">
          Não sabe o que dar? Escolha um vale
        </h2>
        <p className="mt-1 text-sm text-foreground/60">
          Qualquer valor ajuda a montar a casa nova.
        </p>

        <ul className="mt-4 grid grid-cols-2 gap-3">
          {vouchers.map((voucher) => (
            <li key={voucher.amount}>
              <Link
                href={`/presentes/vale/${voucher.amount}`}
                className="flex h-full flex-col rounded-2xl bg-card p-4 shadow-sm ring-1 ring-black/5 transition-transform active:scale-95"
              >
                <span className="font-display text-2xl italic text-accent">
                  {formatBRL(voucher.amount)}
                </span>
                <span className="mt-1 text-xs leading-snug text-foreground/60">
                  Ajuda a comprar {voucher.examples}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/presentes/pix"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors active:bg-accent-soft"
        >
          Prefiro escolher outro valor
        </Link>
      </section>

      {items.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl italic text-foreground">
            Ou escolha algo específico
          </h2>

          <ul className="mt-4 flex flex-col gap-4">
            {items.map((item) => {
              const disponivel = item.status === "DISPONIVEL";
              return (
                <li key={item.id}>
                  <Link
                    href={`/presentes/${item.id}`}
                    className={`flex items-center gap-4 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-black/5 transition-opacity ${
                      disponivel ? "" : "opacity-50"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {item.name}
                      </p>
                      {item.description && (
                        <p className="truncate text-sm text-foreground/60">
                          {item.description}
                        </p>
                      )}
                      {item.price != null && (
                        <p className="mt-1 text-sm font-semibold text-accent">
                          {formatBRL(item.price)}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                        disponivel
                          ? "bg-accent-soft text-accent"
                          : "bg-foreground/10 text-foreground/50"
                      }`}
                    >
                      {disponivel ? "Disponível" : "Escolhido"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </main>
  );
}
