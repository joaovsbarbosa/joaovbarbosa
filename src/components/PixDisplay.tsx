"use client";

import { useState } from "react";

export default function PixDisplay({
  pixKey,
  ownerName,
  amountLabel,
}: {
  pixKey: string;
  ownerName?: string;
  amountLabel?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard indisponível; usuário pode selecionar o texto manualmente
    }
  }

  if (!pixKey) {
    return (
      <p className="rounded-xl bg-foreground/5 p-4 text-sm text-foreground/60">
        Chave Pix ainda não configurada. Defina PIX_KEY no arquivo .env.
      </p>
    );
  }

  return (
    <div className="rounded-2xl bg-accent-soft/60 p-5 text-center">
      {ownerName && (
        <p className="text-xs uppercase tracking-wide text-foreground/50">
          Chave Pix de {ownerName}
        </p>
      )}
      {amountLabel && (
        <p className="mt-1 font-display text-2xl italic text-foreground">
          {amountLabel}
        </p>
      )}
      <p className="mt-3 break-all rounded-xl bg-card px-4 py-3 font-mono text-sm text-foreground">
        {pixKey}
      </p>
      <button
        type="button"
        onClick={copy}
        className="mt-3 inline-flex items-center justify-center rounded-full bg-accent px-6 py-2 text-sm font-semibold text-white transition-transform active:scale-95"
      >
        {copied ? "Copiado!" : "Copiar chave Pix"}
      </button>
    </div>
  );
}
