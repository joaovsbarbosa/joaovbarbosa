import Link from "next/link";
import { getPixInfo, isCardPaymentEnabled } from "@/lib/payments";
import MoneyGiftForm from "@/components/MoneyGiftForm";

export default function PixContributionPage() {
  const pix = getPixInfo();
  const cardEnabled = isCardPaymentEnabled();

  return (
    <main className="mx-auto flex w-full max-w-md flex-1 flex-col px-6 pb-24 pt-14">
      <Link href="/presentes" className="text-sm text-foreground/60">
        ← Voltar para a lista
      </Link>

      <h1 className="mt-4 font-display text-3xl italic text-foreground">
        Contribuir com um valor
      </h1>
      <p className="mt-2 text-sm leading-relaxed text-foreground/70">
        Prefere me ajudar com o valor que achar melhor, sem escolher um item
        específico? Fica à vontade!
      </p>

      <MoneyGiftForm
        pixKey={pix.key}
        pixOwnerName={pix.ownerName}
        cardEnabled={cardEnabled}
      />
    </main>
  );
}
