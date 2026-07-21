import Link from "next/link";
import { notFound } from "next/navigation";
import { vouchers } from "@/data/vouchers";
import { getPixInfo, isCardPaymentEnabled } from "@/lib/payments";
import { formatBRL } from "@/lib/format";
import MoneyGiftForm from "@/components/MoneyGiftForm";

export default async function VoucherPage({
  params,
}: {
  params: Promise<{ amount: string }>;
}) {
  const { amount } = await params;
  const voucher = vouchers.find((v) => v.amount === Number(amount));
  if (!voucher) notFound();

  const pix = getPixInfo();
  const cardEnabled = isCardPaymentEnabled();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-24 pt-14">
      <Link href="/presentes" className="text-sm text-foreground/60">
        ← Voltar para a lista
      </Link>

      <h1 className="mt-4 font-display text-3xl italic text-foreground">
        Vale {formatBRL(voucher.amount)}
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        Ajuda a comprar {voucher.examples}.
      </p>

      <MoneyGiftForm
        pixKey={pix.key}
        pixOwnerName={pix.ownerName}
        cardEnabled={cardEnabled}
        fixedAmount={voucher.amount}
      />
    </main>
  );
}
