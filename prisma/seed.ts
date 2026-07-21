import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

const items = [
  { name: "Jogo de panelas", description: "Panelas antiaderentes, 5 peças", price: 450 },
  { name: "Liquidificador", description: "Potência alta, jarra de vidro", price: 250 },
  { name: "Jogo de toalhas", description: "Banho + rosto, 100% algodão", price: 180 },
  { name: "Aspirador de pó", description: "Vertical, sem fio", price: 600 },
  { name: "Jogo de cama queen", description: "200 fios, cor a combinar", price: 220 },
];

async function main() {
  for (const item of items) {
    await prisma.giftItem.create({ data: item });
  }
  console.log(`Seed concluído: ${items.length} itens criados.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
