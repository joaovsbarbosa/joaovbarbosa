"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function confirmReservation(reservationId: string) {
  await prisma.$transaction(async (tx) => {
    const reservation = await tx.reservation.findUnique({
      where: { id: reservationId },
      include: { giftItem: true },
    });
    if (!reservation) return;
    if (reservation.giftItem.status === "COMPRADO" && reservation.status !== "CONFIRMADO") {
      return;
    }

    await tx.reservation.update({
      where: { id: reservation.id },
      data: { status: "CONFIRMADO" },
    });
    await tx.giftItem.update({
      where: { id: reservation.giftItemId },
      data: { status: "COMPRADO" },
    });
    // outras reservas pendentes do mesmo item ficam obsoletas
    await tx.reservation.updateMany({
      where: {
        giftItemId: reservation.giftItemId,
        id: { not: reservation.id },
        status: "PENDENTE",
      },
      data: { status: "CANCELADO" },
    });
  });

  revalidatePath("/admin");
  revalidatePath("/presentes");
}

export async function cancelReservation(reservationId: string) {
  await prisma.reservation.update({
    where: { id: reservationId },
    data: { status: "CANCELADO" },
  });
  revalidatePath("/admin");
}

export async function confirmMoneyGift(moneyGiftId: string) {
  await prisma.moneyGift.update({
    where: { id: moneyGiftId },
    data: { status: "CONFIRMADO" },
  });
  revalidatePath("/admin");
}

export async function resetItemToAvailable(giftItemId: string) {
  await prisma.giftItem.update({
    where: { id: giftItemId },
    data: { status: "DISPONIVEL" },
  });
  revalidatePath("/admin");
  revalidatePath("/presentes");
}

export async function addGiftItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));

  if (!name || !price || price <= 0) return;

  await prisma.giftItem.create({
    data: { name, description: description || null, price },
  });

  revalidatePath("/admin");
  revalidatePath("/presentes");
}

export async function deleteGiftItem(giftItemId: string) {
  await prisma.reservation.deleteMany({ where: { giftItemId } });
  await prisma.giftItem.delete({ where: { id: giftItemId } });
  revalidatePath("/admin");
  revalidatePath("/presentes");
}
