import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const adapter = new PrismaLibSql({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

const prisma = new PrismaClient({ adapter });

const items = [
  {
    name: "Jogo de panelas",
    description: "Tramontina Turim, 7 peças, alumínio com revestimento antiaderente, vermelho",
    referenceUrl:
      "https://www.mercadolivre.com.br/jogo-de-panelas-tramontina-turim-7-pecas-em-aluminio-com-revestimento-antiaderente-vermelho/p/MLB32486155",
  },
  {
    name: "Conjunto de assadeiras antiaderentes",
    description: "Tramontina, 3 peças",
    referenceUrl:
      "https://www.casasbahia.com.br/conjunto-de-assadeiras-antiaderentes-3-pecas-brasil-tramontina-20099020/p/5414653",
  },
  {
    name: "Kit assadeiras de vidro",
    description: null,
    referenceUrl: null,
  },
  {
    name: "Kit potes herméticos de vidro",
    description: null,
    referenceUrl: null,
  },
  {
    name: "Escorredor de louça",
    description: "Tramontina Plurale, grafite e inox, 9 pratos, com porta-talheres",
    referenceUrl:
      "https://www.magazineluiza.com.br/escorredor-de-louca-tramontina-plurale-grafite-e-inox-9-pratos-com-porta-talheres/p/241218700/ud/espt/",
  },
  {
    name: "Faqueiro",
    description: "Tramontina Polywood, vermelho, 24 peças",
    referenceUrl:
      "https://www.mercadolivre.com.br/faqueiro-tramontina-polywood-vermelho-24-pecas/p/MLB32486303",
  },
  {
    name: "Jogo de facas",
    description: "Tramontina Plenus, 6 peças, com suporte",
    referenceUrl:
      "https://www.mercadolivre.com.br/jogo-de-facas-tramontina-plenus-6-pecas-com-suporte/up/MLBU4254761807",
  },
  {
    name: "Jogo de 6 pratos de vidro transparente",
    description: "Duralex Diamante",
    referenceUrl:
      "https://www.mercadolivre.com.br/jogo-c-6-pratos-fundo-duralex-diamante-transparente-nadir/p/MLB22636733",
  },
  {
    name: "Jogo de chá e jantar",
    description: "Oxford Donna Colb, 20 peças",
    referenceUrl: "https://www.oxfordporcelanas.com.br/donna-colb-jantar-20pcs/p?idsku=60603390",
  },
  {
    name: "Jogo de 6 copos de vidro",
    description: null,
    referenceUrl: null,
  },
  {
    name: "Panela de pressão elétrica",
    description: "Philips Walita Daily RI3103",
    referenceUrl:
      "https://www.mercadolivre.com.br/panela-de-presso-eletrica-walita-daily-philips-ri3103-metal-cor-pretoprata-frequncia-60-hz/p/MLB15508470",
  },
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
