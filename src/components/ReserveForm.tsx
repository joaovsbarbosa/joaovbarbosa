"use client";

import { useState } from "react";

export default function ReserveForm({ giftItemId }: { giftItemId: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleReserve() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/gift-items/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ giftItemId }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Algo deu errado, tente novamente");
        setLoading(false);
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
      <div className="mt-6 rounded-2xl bg-accent-soft/60 p-5 text-center">
        <p className="font-display text-xl italic text-foreground">
          Reservado!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/70">
          Não esqueça de comprar e trazer no dia do evento. O item já saiu da
          lista para os outros convidados.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 flex flex-col gap-4">
      <div className="rounded-xl bg-accent-soft/60 px-4 py-3 text-sm text-foreground/80">
        Ao reservar, o item sai da lista para os outros convidados. Se tiver
        algum problema pra comprar depois, me avisa que eu devolvo o item
        pra lista.
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="button"
        onClick={handleReserve}
        disabled={loading}
        className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95 disabled:opacity-60"
      >
        {loading ? "Reservando..." : "Reservar este item"}
      </button>
    </div>
  );
}
