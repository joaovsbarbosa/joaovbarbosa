import { prisma } from "@/lib/prisma";
import { formatBRL } from "@/lib/format";
import {
  confirmMoneyGift,
  resetItemToAvailable,
  addGiftItem,
  deleteGiftItem,
} from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [pendingMoneyGifts, items, confirmedTotal] = await Promise.all([
    prisma.moneyGift.findMany({
      where: { status: "PENDENTE", method: "PIX_MANUAL" },
      orderBy: { createdAt: "asc" },
    }),
    prisma.giftItem.findMany({ orderBy: { name: "asc" } }),
    prisma.moneyGift.aggregate({
      where: { status: "CONFIRMADO" },
      _sum: { amount: true },
    }),
  ]);

  const totalArrecadado = confirmedTotal._sum.amount ?? 0;

  return (
    <div className="flex flex-col gap-10">
      <section className="rounded-2xl bg-accent-soft/60 p-5">
        <p className="text-sm text-foreground/60">Total confirmado (vales e contribuições)</p>
        <p className="font-display text-3xl italic text-foreground">
          {formatBRL(totalArrecadado)}
        </p>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl italic text-foreground">
          Pagamentos Pix pendentes
        </h2>
        {pendingMoneyGifts.length === 0 && (
          <p className="text-sm text-foreground/50">Nenhum pendente.</p>
        )}
        <ul className="flex flex-col gap-3">
          {pendingMoneyGifts.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-black/5"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {m.guestName}
                </p>
                <p className="text-sm text-foreground/60">{formatBRL(m.amount)}</p>
              </div>
              <form action={confirmMoneyGift.bind(null, m.id)}>
                <button className="shrink-0 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white">
                  Confirmar
                </button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl italic text-foreground">
          Itens da lista
        </h2>
        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 rounded-xl bg-card p-4 shadow-sm ring-1 ring-black/5"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {item.name}
                </p>
                <p className="text-sm text-foreground/60">
                  {item.price != null ? `${formatBRL(item.price)} · ` : ""}
                  {item.status === "DISPONIVEL" ? "Disponível" : "Reservado"}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                {item.status === "RESERVADO" && (
                  <form action={resetItemToAvailable.bind(null, item.id)}>
                    <button className="rounded-full bg-foreground/10 px-4 py-2 text-xs font-semibold text-foreground/60">
                      Reabrir
                    </button>
                  </form>
                )}
                <form action={deleteGiftItem.bind(null, item.id)}>
                  <button className="rounded-full bg-red-100 px-4 py-2 text-xs font-semibold text-red-700">
                    Excluir
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl italic text-foreground">
          Adicionar item
        </h2>
        <form
          action={addGiftItem}
          className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm ring-1 ring-black/5"
        >
          <input
            name="name"
            placeholder="Nome do item"
            className="rounded-xl border border-foreground/15 px-4 py-3 text-base outline-none focus:border-accent"
          />
          <input
            name="description"
            placeholder="Descrição (opcional)"
            className="rounded-xl border border-foreground/15 px-4 py-3 text-base outline-none focus:border-accent"
          />
          <input
            name="referenceUrl"
            type="url"
            placeholder="Link de sugestão de compra (opcional)"
            className="rounded-xl border border-foreground/15 px-4 py-3 text-base outline-none focus:border-accent"
          />
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            placeholder="Preço aproximado (opcional)"
            className="rounded-xl border border-foreground/15 px-4 py-3 text-base outline-none focus:border-accent"
          />
          <button className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white">
            Adicionar
          </button>
        </form>
      </section>
    </div>
  );
}
