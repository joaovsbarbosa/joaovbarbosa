import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createPreference } from "@/lib/mercadopago";
import { isCardPaymentEnabled } from "@/lib/payments";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { guestName, guestContact, method, amount } = body as {
    guestName?: string;
    guestContact?: string;
    method?: "PIX_MANUAL" | "CARTAO_MERCADOPAGO";
    amount?: number;
  };

  if (!guestName || !method || !amount || amount <= 0) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }
  if (method === "CARTAO_MERCADOPAGO" && !isCardPaymentEnabled()) {
    return NextResponse.json(
      { error: "Pagamento por cartão indisponível no momento" },
      { status: 400 },
    );
  }

  const moneyGift = await prisma.moneyGift.create({
    data: { guestName, guestContact, method, amount },
  });

  if (method === "PIX_MANUAL") {
    return NextResponse.json({ moneyGiftId: moneyGift.id, method });
  }

  const origin = req.nextUrl.origin;
  try {
    const preference = await createPreference({
      title: "Contribuição - Chá de Casa Nova",
      price: amount,
      externalReference: moneyGift.id,
      notificationUrl: `${origin}/api/webhooks/mercadopago`,
      successUrl: `${origin}/presentes/pix?status=sucesso`,
      failureUrl: `${origin}/presentes/pix?status=falha`,
    });

    return NextResponse.json({
      moneyGiftId: moneyGift.id,
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
