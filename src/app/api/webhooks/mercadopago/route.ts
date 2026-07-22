import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getPayment } from "@/lib/mercadopago";

function extractPaymentId(req: NextRequest, body: unknown): string | null {
  const url = req.nextUrl;
  const queryId = url.searchParams.get("data.id") ?? url.searchParams.get("id");
  if (queryId) return queryId;

  if (body && typeof body === "object" && "data" in body) {
    const data = (body as { data?: { id?: string } }).data;
    if (data?.id) return String(data.id);
  }
  return null;
}

export async function POST(req: NextRequest) {
  let body: unknown = null;
  try {
    body = await req.json();
  } catch {
    // MP também pode notificar via query string sem corpo
  }

  const paymentId = extractPaymentId(req, body);
  if (!paymentId) {
    return NextResponse.json({ ok: true });
  }

  let payment;
  try {
    payment = await getPayment(paymentId);
  } catch (err) {
    console.error("Falha ao consultar pagamento no Mercado Pago", err);
    return NextResponse.json({ ok: true });
  }

  if (payment.status !== "approved") {
    return NextResponse.json({ ok: true });
  }

  await prisma.moneyGift.updateMany({
    where: { id: payment.external_reference, status: { not: "CONFIRMADO" } },
    data: { status: "CONFIRMADO", mpPaymentId: String(payment.id) },
  });

  return NextResponse.json({ ok: true });
}
