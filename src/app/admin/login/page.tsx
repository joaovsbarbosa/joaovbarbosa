import { login } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-6 py-14">
      <h1 className="font-display text-2xl italic text-foreground">
        Painel admin
      </h1>
      <p className="mt-1 text-sm text-foreground/60">
        Acesso restrito ao anfitrião.
      </p>

      <form action={login} className="mt-6 flex flex-col gap-4">
        <input
          type="password"
          name="password"
          placeholder="Senha"
          autoFocus
          className="rounded-xl border border-foreground/15 bg-card px-4 py-3 text-base text-foreground outline-none focus:border-accent"
        />
        {error && (
          <p className="text-sm text-red-600">Senha incorreta, tente de novo.</p>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white shadow-sm transition-transform active:scale-95"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
