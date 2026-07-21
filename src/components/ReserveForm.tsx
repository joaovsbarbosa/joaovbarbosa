"use client";

import { useState } from "react";
import { formatBRL } from "@/lib/format";
import PixDisplay from "@/components/PixDisplay";

type Method = "PIX_MANUAL" | "CARTAO_MERCADOPAGO";

export default function ReserveForm({
  giftItemId,
  price,
  pixKey,
  pixOwnerName,
  cardEnabled,
}: {
  giftItemId: string;
  price: number;
  pixKey: string;
  pixOwnerName: string;
  cardEnabled: boolean;
}) {
  const [name, setName] = useState("");
  const [method, setMethod] = useState<Method>("PIX_MANUAL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Digite seu nome");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftItemId, guestName: name, method }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Algo deu errado, tente novamente");
        setLoading(false);
        return;
      }

      if (method === "CARTAO_MERCADOPAGO" && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
        return;
      }

      setDone(true);
    } catch {
      setError("Não foi possível conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="mt-6">
        <p className="mb-4 text-sm text-foreground/70">
          Obrigado, {name}! Pague usando os dados abaixo. Assim que
          identificarmos o pagamento, o item sai da lista para os outros
          convidados.
        </p>
        <PixDisplay
          pixKey={pixKey}
          ownerName={pixOwnerName}
          amountLabel={formatBRL(price)}
        />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
      <label className="flex flex-col gap-1 text-sm text-foreground/70">
        Seu nome
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Como podemos te reconhecer?"
          className="rounded-xl border border-foreground/15 bg-card px-4 py-3 text-base text-foreground outline-none focus:border-accent"
        />
      </label>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm text-foreground/70">
          Como você prefere pagar?
        </legend>
        <label className="flex items-center gap-3 rounded-xl border border-foreground/15 bg-card px-4 py-3">
          <input
            type="radio"
            name="method"
            checked={method === "PIX_MANUAL"}
            onChange={() => setMethod("PIX_MANUAL")}
          />
          <span className="text-sm text-foreground">Pix</span>
        </label>
        <label
          className={`flex items-center gap-3 rounded-xl border border-foreground/15 bg-card px-4 py-3 ${
            cardEnabled ? "" : "opacity-40"
          }`}
        >
          <input
            type="radio"
            name="method"
            disabled={!cardEnabled}
            checked={method === "CARTAO_MERCADOPAGO"}
            onChange={() => setMethod("CARTAO_MERCADOPAGO")}
          />
          <span className="text-sm text-foreground">
            Cartão de crédito {!cardEnabled && "(indisponível)"}
          </span>
        </label>
      </fieldset>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:opacity-60"
      >
        {loading ? "Processando..." : `Confirmar - ${formatBRL(price)}`}
      </button>
    </form>
  );
}
