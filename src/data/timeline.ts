export type TimelineEntry = {
  caption: string;
  /** Caminho da imagem em /public, ex: "/timeline/01-planta.jpg". Deixe undefined para usar um placeholder. */
  image?: string;
};

// Substitua "image" pelas fotos reais, em ordem. Coloque os arquivos em /public/timeline/.
export const timelineEntries: TimelineEntry[] = [
  { caption: "A casa nova chegou, mas esse sonho começou lá em 2022..." },
  { caption: "Até que o prédio começou a subir..." },
  { caption: "E foi subindo..." },
  { caption: "Até que subiu por completo! Mas, e a pintura?" },
  { caption: "Com tudo se ajeitando, foi hora de fazer a primeira visita ao meu ap!" },
  { caption: "E, finalmente, a entrega das chaves" },
];

export const timelineOutro =
  "Agora, é hora de celebrar esse momento e ter a sua contribuição na minha casinha nova!";
