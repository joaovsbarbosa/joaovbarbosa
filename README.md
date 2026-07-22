# Chá de Casa Nova

Site para o chá de casa nova: uma timeline com fotos da obra que passa com o
scroll, uma lista de presentes, e formas de contribuir por Pix (manual,
gratuito) ou cartão (via Mercado Pago, opcional).

## Rodando localmente

```bash
npm install
cp .env.example .env   # se ainda não existir um .env
npx prisma migrate dev # cria o banco local (SQLite)
npm run db:seed        # popula com itens de exemplo
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## O que editar antes de publicar

1. **`src/data/site.ts`** — nome dos anfitriões, data, endereço e textos.
2. **`src/data/timeline.ts`** — as etapas da obra. Coloque as fotos reais em
   `public/timeline/` e aponte o campo `image` de cada etapa para o arquivo
   (ex: `"/timeline/01-chaves.jpg"`). Sem foto, aparece um placeholder.
3. **`.env`** —
   - `PIX_KEY` / `PIX_KEY_OWNER_NAME`: sua chave Pix, exibida no site (sem
     nenhuma taxa).
   - `ADMIN_PASSWORD`: senha do painel `/admin`, onde você confirma
     manualmente os pagamentos Pix e gerencia os itens.
   - `MERCADOPAGO_ACCESS_TOKEN` (opcional): só
     preencha se quiser aceitar cartão de crédito. Sem isso, a opção de
     cartão fica desabilitada automaticamente e só o Pix manual aparece.
     Gere as chaves em https://www.mercadopago.com.br/developers/panel —
     não há custo para criar a conta ou integrar, só uma taxa por transação
     aprovada (~1% Pix, ~4-5% cartão, cobrada pelo Mercado Pago).
4. **Itens da lista de presentes** — cadastre pelo painel `/admin` (mais
   fácil) ou edite `prisma/seed.ts` e rode `npm run db:seed` de novo.

## Como funciona a reserva de item

- O convidado escolhe um item, informa o nome e a forma de pagamento.
- **Pix manual**: o item continua na lista até você confirmar manualmente
  o pagamento em `/admin`. Isso evita duplicidade sem depender de nenhuma
  API — só exige que você confira o extrato do Pix e clique em "Confirmar".
- **Cartão (Mercado Pago)**: o pagamento é confirmado automaticamente via
  webhook, e o item sai da lista assim que aprovado. Se dois pagamentos
  aprovados chegarem para o mesmo item ao mesmo tempo (raro), o segundo é
  sinalizado no painel para você estornar manualmente pelo Mercado Pago.

## Banco de dados em produção

Local usa SQLite (arquivo `dev.db`). Hospedagem serverless (Vercel) não
mantém arquivos entre requisições, então em produção use um banco real e
gratuito compatível com o adapter LibSQL já configurado, por exemplo o
[Turso](https://turso.tech) (free tier). Defina `DATABASE_URL` (e
`DATABASE_AUTH_TOKEN`, se aplicável) nas variáveis de ambiente da hospedagem
e rode `npx prisma migrate deploy` apontando pra esse banco antes do primeiro
deploy.

## Deploy

Recomendado: [Vercel](https://vercel.com) (gratuito). Configure as variáveis
de ambiente do `.env.example` no painel do projeto antes de publicar.
