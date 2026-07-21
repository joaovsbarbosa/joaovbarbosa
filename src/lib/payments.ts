export function isCardPaymentEnabled() {
  return Boolean(process.env.MERCADOPAGO_ACCESS_TOKEN);
}

export function getPixInfo() {
  return {
    key: process.env.PIX_KEY ?? "",
    ownerName: process.env.PIX_KEY_OWNER_NAME ?? "",
  };
}
