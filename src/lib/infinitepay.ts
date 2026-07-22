const INFINITEPAY_API = "https://api.checkout.infinitepay.io";

function getHandle() {
  const handle = process.env.INFINITEPAY_HANDLE;
  if (!handle) throw new Error("INFINITEPAY_HANDLE não configurado");
  return handle;
}

export async function createPaymentLink(params: {
  title: string;
  price: number;
  orderNsu: string;
  redirectUrl: string;
  webhookUrl: string;
}) {
  const res = await fetch(`${INFINITEPAY_API}/links`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle: getHandle(),
      items: [
        {
          quantity: 1,
          price: Math.round(params.price * 100),
          description: params.title,
        },
      ],
      order_nsu: params.orderNsu,
      redirect_url: params.redirectUrl,
      webhook_url: params.webhookUrl,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`InfinitePay createPaymentLink falhou: ${res.status} ${body}`);
  }

  const data = (await res.json()) as { url?: string };
  const url = data.url ?? findCheckoutUrl(data);

  if (!url) {
    throw new Error(
      `InfinitePay createPaymentLink não retornou URL de checkout: ${JSON.stringify(data)}`,
    );
  }

  return { url };
}

/** Fallback: procura em qualquer nível do objeto por uma URL de checkout da
 * InfinitePay, caso o campo "url" documentado não venha preenchido. */
function findCheckoutUrl(value: unknown): string | undefined {
  if (typeof value === "string" && value.includes("checkout.infinitepay.")) {
    return value;
  }
  if (value && typeof value === "object") {
    for (const nested of Object.values(value)) {
      const found = findCheckoutUrl(nested);
      if (found) return found;
    }
  }
  return undefined;
}

export async function checkPayment(params: {
  orderNsu: string;
  transactionNsu: string;
  slug: string;
}) {
  const res = await fetch(`${INFINITEPAY_API}/payment_check`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      handle: getHandle(),
      order_nsu: params.orderNsu,
      transaction_nsu: params.transactionNsu,
      slug: params.slug,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`InfinitePay checkPayment falhou: ${res.status} ${body}`);
  }

  return res.json() as Promise<{
    success: boolean;
    paid: boolean;
    amount: number;
    paid_amount: number;
    installments: number;
    capture_method: string;
  }>;
}
