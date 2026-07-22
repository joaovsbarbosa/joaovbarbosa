import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { giftItemId, guestName } = body as {
    giftItemId?: string;
    guestName?: string;
  };

  if (!giftItemId || !guestName?.trim()) {
    return NextResponse.json({ error: "Dados incompletos" }, { status: 400 });
  }

  const result = await prisma.giftItem.updateMany({
    where: { id: giftItemId, status: "DISPONIVEL" },
    data: { status: "RESERVADO", reservedByName: guestName.trim() },
  });

  if (result.count === 0) {
    return NextResponse.json(
      { error: "Este item já foi escolhido por outra pessoa" },
      { status: 409 },
    );
  }

  return NextResponse.json({ ok: true });
}
