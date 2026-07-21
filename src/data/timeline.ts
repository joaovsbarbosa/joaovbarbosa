export type TimelineEntry = {
  caption: string;
  /** Caminho da imagem em /public, ex: "/timeline/01-planta.jpg". Deixe undefined para usar um placeholder. */
  image?: string;
};

// Substitua "image" pelas fotos reais, em ordem. Coloque os arquivos em /public/timeline/.
export const timelineEntries: TimelineEntry[] = [
  {
    caption: "A casa nova chegou, mas esse sonho começou lá em 2022...",
    image: "/timeline/01-terreno.jpg",
  },
  {
    caption: "Até que o prédio começou a subir...",
    image: "/timeline/02-comecando-a-subir.jpg",
  },
  {
    caption: "E foi subindo...",
    image: "/timeline/03-subindo.jpg",
  },
  {
    caption: "Até que subiu por completo!",
    image: "/timeline/04-estrutura-pronta.jpg",
  },
  {
    caption: "Com tudo se ajeitando, foi hora de fazer a primeira visita ao meu ap!",
    image: "/timeline/05-primeira-visita.jpg",
  },
  {
    caption: "E, finalmente, a entrega das chaves",
    // falta a foto da entrega das chaves — manda quando puder
  },
];

export const timelineOutro =
  "Agora, é hora de celebrar esse momento e ter a sua contribuição na minha casinha nova!";
