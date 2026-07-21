"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { checkPassword, getExpectedSessionToken, ADMIN_SESSION_COOKIE } from "@/lib/auth";

export async function login(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!checkPassword(password)) {
    redirect("/admin/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, getExpectedSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}
