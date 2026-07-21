export type Voucher = {
  amount: number;
  examples: string;
};

// Edite os exemplos de cada vale com o que fizer sentido pra vocês.
export const vouchers: Voucher[] = [
  { amount: 50, examples: "potes, utensílios de cozinha, itens de organização" },
  { amount: 80, examples: "toalhas, jogo de lençol, itens de decoração" },
  { amount: 100, examples: "panelas pequenas, roupa de cama, produtos de limpeza" },
  { amount: 150, examples: "jogo de toalhas completo, utensílios de cozinha" },
  { amount: 200, examples: "liquidificador, ferro de passar, itens de cozinha" },
  { amount: 300, examples: "jogo de panelas, aspirador de pó, eletros pequenos" },
  { amount: 500, examples: "eletrodomésticos maiores, móveis pequenos" },
];
