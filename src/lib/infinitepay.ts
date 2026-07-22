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

  const data = (await res.json()) as Record<string, unknown>;
  const url =
    (data.url as string | undefined) ??
    (data.checkout_url as string | undefined) ??
    (data.link as string | undefined);

  if (!url) {
    throw new Error(
      `InfinitePay createPaymentLink não retornou URL de checkout: ${JSON.stringify(data)}`,
    );
  }

  return { url };
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
