import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth";
import { logout } from "./actions";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!isValidSessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pb-24 pt-10">
      <header className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-2xl italic text-foreground">
          Painel admin
        </h1>
        <form action={logout}>
          <button
            type="submit"
            className="text-sm text-foreground/60 underline"
          >
            Sair
          </button>
        </form>
      </header>
      {children}
    </div>
  );
}
