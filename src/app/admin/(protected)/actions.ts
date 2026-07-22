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
    data: { status: "DISPONIVEL", reservedByName: null },
  });
  revalidatePath("/admin");
  revalidatePath("/presentes");
}

export async function addGiftItem(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const referenceUrl = String(formData.get("referenceUrl") ?? "").trim();
  const priceRaw = String(formData.get("price") ?? "").trim();
  const price = priceRaw ? Number(priceRaw) : null;

  if (!name) return;

  await prisma.giftItem.create({
    data: {
      name,
      description: description || null,
      referenceUrl: referenceUrl || null,
      price,
    },
  });

  revalidatePath("/admin");
  revalidatePath("/presentes");
}

export async function deleteGiftItem(giftItemId: string) {
  await prisma.giftItem.delete({ where: { id: giftItemId } });
  revalidatePath("/admin");
  revalidatePath("/presentes");
}
