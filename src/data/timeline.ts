export type TimelineEntry = {
  date: string;
  title: string;
  description?: string;
  /** Caminho da imagem em /public, ex: "/timeline/01-chaves.jpg". Deixe undefined para usar um placeholder. */
  image?: string;
};

// Substitua estas entradas pelas fotos reais da sua obra, em ordem cronológica.
// Coloque os arquivos de imagem em /public/timeline/ e aponte o campo "image" para eles.
export const timelineEntries: TimelineEntry[] = [
  {
    date: "Passo 1",
    title: "As chaves na mão",
    description: "O início de tudo: recebendo as chaves do apartamento.",
  },
  {
    date: "Passo 2",
    title: "Demolição e reforma",
    description: "Paredes caindo pra dar lugar ao projeto novo.",
  },
  {
    date: "Passo 3",
    title: "Elétrica e hidráulica",
    description: "A parte que ninguém vê, mas que faz tudo funcionar.",
  },
  {
    date: "Passo 4",
    title: "Piso e revestimentos",
    description: "A casa começando a ganhar cara.",
  },
  {
    date: "Passo 5",
    title: "Pintura",
    description: "Escolhendo as cores que vão dar vida aos ambientes.",
  },
  {
    date: "Passo 6",
    title: "Móveis chegando",
    description: "Cada entrega era uma festa.",
  },
  {
    date: "Pronto!",
    title: "O apê pronto",
    description: "E finalmente, depois de tanto trabalho, a casa nova.",
  },
];
