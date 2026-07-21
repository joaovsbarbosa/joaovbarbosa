import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPreference } from "@/lib/mercadopago";
import { isCardPaymentEnabled } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { giftItemId, guestName, guestContact, method } = body as {
    giftItemId?: string;
    guestName?: string;
    guestContact?: string;
    method?: "PIX_MANUAL" | "CARTAO_MERCADOPAGO";
  };

  if (!giftItemId || !guestName || !method) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const item = await prisma.giftItem.findUnique({ where: { id: giftItemId } });
  if (!item) {
    return NextResponse.json({ error: "Item não encontrado" }, { status: 404 });
  }
  if (item.status === "COMPRADO") {
    return NextResponse.json(
      { error: "Este item já foi escolhido por outra pessoa" },
      { status: 409 },
    );
  }
  if (method === "CARTAO_MERCADOPAGO" && !isCardPaymentEnabled()) {
    return NextResponse.json(
      { error: "Pagamento por cartão indisponível no momento" },
      { status: 400 },
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      giftItemId: item.id,
      guestName,
      guestContact,
      method,
      amount: item.price,
    },
  });

  if (method === "PIX_MANUAL") {
    return NextResponse.json({ reservationId: reservation.id, method });
  }

  const origin = req.nextUrl.origin;
  try {
    const preference = await createPreference({
      title: item.name,
      price: item.price,
      externalReference: reservation.id,
      notificationUrl: `${origin}/api/webhooks/mercadopago`,
      successUrl: `${origin}/presentes/${item.id}?status=sucesso`,
      failureUrl: `${origin}/presentes/${item.id}?status=falha`,
    });

    return NextResponse.json({
      reservationId: reservation.id,
      method,
      checkoutUrl: preference.init_point,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Não foi possível iniciar o pagamento por cartão" },
      { status: 500 },
    );
  }
}
