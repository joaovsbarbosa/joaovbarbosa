const MP_API = "https://api.mercadopago.com";

function getAccessToken() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN;
  if (!token) throw new Error("MERCADOPAGO_ACCESS_TOKEN não configurado");
  return token;
}

export async function createPreference(params: {
  title: string;
  price: number;
  externalReference: string;
  notificationUrl: string;
  successUrl: string;
  failureUrl: string;
}) {
  const res = await fetch(`${MP_API}/checkout/preferences`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: [
        {
          title: params.title,
          quantity: 1,
          unit_price: params.price,
          currency_id: "BRL",
        },
      ],
      external_reference: params.externalReference,
      notification_url: params.notificationUrl,
      back_urls: {
        success: params.successUrl,
        failure: params.failureUrl,
        pending: params.successUrl,
      },
      auto_return: "approved",
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mercado Pago createPreference falhou: ${res.status} ${body}`);
  }

  return res.json() as Promise<{ id: string; init_point: string }>;
}

export async function getPayment(paymentId: string) {
  const res = await fetch(`${MP_API}/v1/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${getAccessToken()}` },
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Mercado Pago getPayment falhou: ${res.status} ${body}`);
  }

  return res.json() as Promise<{
    id: number;
    status: string;
    external_reference: string;
    transaction_amount: number;
  }>;
}
