# Chá de Casa Nova

Site para o chá de casa nova: uma timeline com fotos da obra que passa com o
scroll, uma lista de presentes (itens específicos + vales de valor), e
contribuição por Pix (manual, gratuito) ou cartão (via InfinitePay, opcional).

## Rodando localmente

```bash
npm install
cp .env.example .env   # se ainda não existir um .env
npx prisma migrate dev # cria o banco local (SQLite)
npm run db:seed        # popula com os itens
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## O que editar antes de publicar

1. **`src/data/site.ts`** — nome dos anfitriões, data, endereço e textos.
2. **`src/data/timeline.ts`** — as etapas da obra. Coloque as fotos reais em
   `public/timeline/` e aponte o campo `image` de cada etapa para o arquivo
   (ex: `"/timeline/01-chaves.jpg"`). Sem foto, aparece um placeholder.
3. **`src/data/vouchers.ts`** — os vales de valor (50 a 500) e o texto de
   exemplo de cada um ("ajuda a comprar X, Y, Z").
4. **`.env`** —
   - `PIX_KEY` / `PIX_KEY_OWNER_NAME`: sua chave Pix, exibida no site (sem
     nenhuma taxa).
   - `ADMIN_PASSWORD`: senha do painel `/admin`, onde você confirma
     manualmente os pagamentos Pix e gerencia os itens.
   - `INFINITEPAY_HANDLE` (opcional): sua InfiniteTag (sem o `$`), só
     preencha se quiser aceitar cartão de crédito. Sem isso, a opção de
     cartão fica desabilitada automaticamente e só o Pix manual aparece.
     Não há custo pra criar conta ou integrar, só uma taxa por transação
     aprovada, cobrada pela InfinitePay.
5. **Itens da lista de presentes** — cadastre pelo painel `/admin` (mais
   fácil) ou edite `prisma/seed.ts` e rode `npm run db:seed` de novo.

## Como funciona cada forma de presentear

- **Itens específicos** (jogo de panelas, faqueiro etc.): sem pagamento pelo
  site. O convidado só reserva (sem se identificar) e o item some da lista.
  A pessoa compra por conta própria — no link sugerido ou em outro
  marketplace, desde que seja exatamente aquele produto — e entrega
  pessoalmente no dia. Se alguém reservar e não conseguir comprar, ela avisa
  o anfitrião pra reabrir o item.
- **Vales de valor e contribuição livre**: pagos pelo site.
  - **Pix manual**: o convidado paga direto pra sua chave Pix; você confirma
    manualmente em `/admin` (sem taxa nenhuma, sem depender de API).
  - **Cartão (InfinitePay)**: gera um link de checkout automaticamente; a
    confirmação chega via webhook e é verificada direto na API da
    InfinitePay antes de marcar como confirmado (evita confiar num webhook
    falsificado).

## Banco de dados em produção

Local usa SQLite (arquivo `dev.db`). Hospedagem serverless (Vercel) não
mantém arquivos entre requisições, então em produção use um banco real e
gratuito compatível com o adapter LibSQL já configurado, por exemplo o
[Turso](https://turso.tech) (free tier). Defina `DATABASE_URL` e
`DATABASE_AUTH_TOKEN` nas variáveis de ambiente da hospedagem.

**Importante**: `prisma migrate deploy` não reconhece URLs `libsql://` (só o
Prisma Client, através do driver adapter, entende esse formato — o motor de
migração do Prisma, não). Por isso, pra aplicar as migrações num banco Turso,
use o script deste projeto em vez do comando padrão:

```bash
DATABASE_URL="libsql://seu-banco.turso.io" \
DATABASE_AUTH_TOKEN="seu-token" \
npm run db:migrate:remote
```

Ele aplica as migrações direto (usando o mesmo driver do app) e registra cada
uma na tabela `_prisma_migrations`, então dá pra rodar de novo com segurança
sempre que uma migração nova for criada — só as novas são aplicadas. Depois,
popule os itens com o mesmo par de variáveis:

```bash
DATABASE_URL="libsql://seu-banco.turso.io" \
DATABASE_AUTH_TOKEN="seu-token" \
npm run db:seed
```

## Deploy

Recomendado: [Vercel](https://vercel.com) (gratuito). Configure as variáveis
de ambiente do `.env.example` no painel do projeto antes de publicar. O
`webhook_url` da InfinitePay só funciona com o site publicado (endereço
público) — em `localhost` o pagamento por cartão não confirma sozinho.
