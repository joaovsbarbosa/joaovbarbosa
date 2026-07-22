// O `prisma migrate deploy` não reconhece URLs libsql:// (só o Prisma
// Client, via driver adapter, entende). Esse script aplica as migrações
// direto no banco remoto (Turso) usando o mesmo driver do app, e registra
// cada uma na tabela _prisma_migrations pra manter o histórico consistente.
//
// Uso:
//   DATABASE_URL="libsql://..." DATABASE_AUTH_TOKEN="..." npm run db:migrate:remote

import { createClient } from "@libsql/client";
import { createHash, randomUUID } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("Defina DATABASE_URL e DATABASE_AUTH_TOKEN antes de rodar.");
  process.exit(1);
}
if (url.startsWith("file:")) {
  console.error(
    "DATABASE_URL aponta pra um arquivo local — esse script é só pra bancos remotos (Turso).",
  );
  process.exit(1);
}

console.log(`Rodando migração contra: ${url}`);

const client = createClient({ url, authToken });

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "prisma", "migrations");
const names = readdirSync(migrationsDir)
  .filter((n) => !n.startsWith(".") && n !== "migration_lock.toml")
  .sort();

await client.execute(`
  CREATE TABLE IF NOT EXISTS "_prisma_migrations" (
    "id" TEXT PRIMARY KEY NOT NULL,
    "checksum" TEXT NOT NULL,
    "finished_at" DATETIME,
    "migration_name" TEXT NOT NULL,
    "logs" TEXT,
    "rolled_back_at" DATETIME,
    "started_at" DATETIME NOT NULL DEFAULT current_timestamp,
    "applied_steps_count" INTEGER UNSIGNED NOT NULL DEFAULT 0
  )
`);

const { rows: already } = await client.execute(
  `SELECT migration_name FROM "_prisma_migrations"`,
);
const appliedNames = new Set(already.map((r) => r.migration_name));

for (const name of names) {
  if (appliedNames.has(name)) {
    console.log(`(já aplicada) ${name}`);
    continue;
  }
  const sqlPath = path.join(migrationsDir, name, "migration.sql");
  const sql = readFileSync(sqlPath, "utf8");
  const checksum = createHash("sha256").update(sql).digest("hex");

  console.log(`Aplicando ${name}...`);
  await client.executeMultiple(sql);

  const nowIso = new Date().toISOString();
  await client.execute({
    sql: `INSERT INTO "_prisma_migrations"
      (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
      VALUES (?, ?, ?, ?, NULL, NULL, ?, 1)`,
    args: [randomUUID(), checksum, nowIso, name, nowIso],
  });
  console.log(`OK ${name}`);
}

console.log("Migrações aplicadas com sucesso.");
