import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkPayment } from "@/lib/infinitepay";

export async function POST(req: NextRequest) {
  let body: {
    invoice_slug?: string;
    transaction_nsu?: string;
    order_nsu?: string;
  } = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: true });
  }

  const { invoice_slug: slug, transaction_nsu: transactionNsu, order_nsu: orderNsu } = body;
  if (!slug || !transactionNsu || !orderNsu) {
    return NextResponse.json({ ok: true });
  }

  // Não confia direto no payload do webhook (sem assinatura pra verificar) —
  // confirma o pagamento consultando a própria API da InfinitePay.
  let result;
  try {
    result = await checkPayment({ orderNsu, transactionNsu, slug });
  } catch (err) {
    console.error("Falha ao verificar pagamento na InfinitePay", err);
    return NextResponse.json({ ok: true });
  }

  if (!result.success || !result.paid) {
    return NextResponse.json({ ok: true });
  }

  await prisma.moneyGift.updateMany({
    where: { id: orderNsu, status: { not: "CONFIRMADO" } },
    data: { status: "CONFIRMADO", gatewayTransactionId: transactionNsu },
  });

  return NextResponse.json({ ok: true });
}
