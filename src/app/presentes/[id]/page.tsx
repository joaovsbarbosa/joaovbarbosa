import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";
import { getPixInfo, isCardPaymentEnabled } from "@/lib/payments";
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

  const pix = getPixInfo();
  const cardEnabled = isCardPaymentEnabled();

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
      <p className="mt-2 text-lg font-semibold text-accent">
        {formatBRL(item.price)}
      </p>

      {item.status === "COMPRADO" ? (
        <p className="mt-8 rounded-2xl bg-foreground/5 p-5 text-center text-sm text-foreground/60">
          Esse presente já foi escolhido por outra pessoa. Obrigado pelo
          carinho! Dá uma olhada nos outros itens da lista.
        </p>
      ) : (
        <ReserveForm
          giftItemId={item.id}
          price={item.price}
          pixKey={pix.key}
          pixOwnerName={pix.ownerName}
          cardEnabled={cardEnabled}
        />
      )}
    </main>
  );
}
