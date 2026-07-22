import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";
import ReserveForm from "@/components/ReserveForm";

export const dynamic = "force-dynamic";

export default async function GiftItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await prisma.giftItem.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-24 pt-14">
      <Link href="/presentes" className="text-sm text-foreground/60">
        ← Voltar para a lista
      </Link>

      <h1 className="mt-4 font-display text-3xl italic text-foreground">
        {item.name}
      </h1>
      {item.description && (
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          {item.description}
        </p>
      )}
      {item.price != null && (
        <p className="mt-2 text-lg font-semibold text-accent">
          {formatBRL(item.price)}
        </p>
      )}

      {item.referenceUrl && (
        <a
          href={item.referenceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center rounded-full border border-accent px-6 py-3 text-sm font-semibold text-accent transition-colors active:bg-accent-soft"
        >
          Ver sugestão de compra
        </a>
      )}
      {item.referenceUrl && (
        <p className="mt-2 text-xs text-foreground/50">
          Pode comprar em outro lugar, desde que seja este produto (ou
          equivalente).
        </p>
      )}

      {item.status === "RESERVADO" ? (
        <p className="mt-8 rounded-2xl bg-foreground/5 p-5 text-center text-sm text-foreground/60">
          Esse presente já foi escolhido por outra pessoa. Obrigado pelo
          carinho! Dá uma olhada nos outros itens da lista.
        </p>
      ) : (
        <ReserveForm giftItemId={item.id} />
      )}
    </main>
  );
}
