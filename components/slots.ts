import type { Slot } from "@/components/media";

/**
 * Fonte única dos espaços de imagem do site.
 *
 * O site e a lista de fotos saem daqui, então não podem divergir: quando a
 * foto chegar, basta preencher `src` e o layout já está no tamanho certo.
 *
 * Direção de arte vinda do brand book: documental, luz disponível, plano médio
 * que mostra pessoa E contexto. Nada de aperto de mão, engrenagem, sala de
 * servidor ou banco de imagem.
 */
export const SLOTS: Record<string, Slot> = {
  hero: {
    id: "FOTO 01 · Capa",
    direcao:
      "Plano largo, horizontal, de uma operação real: chão de fábrica, expedição ou sala de operação com gente trabalhando. Precisa ter espaço vazio à esquerda e embaixo para a tipografia entrar por cima. Luz disponível, sem flash.",
    w: 2400,
    h: 1350,
  },
  metodo: {
    id: "FOTO 02 · No chão",
    direcao:
      "Alguém da APT ao lado de quem opera, olhando para o mesmo processo — prancheta, tela ou equipamento. Plano médio. É a prova visual de 'diagnóstico se faz onde o trabalho acontece'.",
    // Recortada do material gerado: o quadro original tinha crachá e texto de
    // tela legíveis. O recorte guarda só a interação.
    src: "/img/no-chao.jpg",
    alt: "Analista da APT aponta um fluxo na tela enquanto o operador anota na prancheta",
    w: 682,
    h: 768,
  },
  filosofia: {
    id: "FOTO 03 · Detalhe",
    direcao:
      "Detalhe de processo: mão em equipamento, etiqueta, painel, ordem de serviço marcada. Enquadramento fechado, fundo desfocado. Serve de respiro entre blocos de texto.",
    // Recorte começa em x=390 para eliminar uma placa de parede que dizia
    // literalmente "EMPRESA X", e termina antes da placa de mesa.
    src: "/img/detalhe.jpg",
    alt: "Gestora revisando uma ordem de serviço ao lado de dois monitores com planilha e fluxo",
    w: 750,
    h: 562,
  },
  treinamento: {
    id: "FOTO 04 · Treinamento",
    direcao:
      "Grupo pequeno em treinamento — quadro, tela ou máquina, três a cinco pessoas. Ninguém posando para a câmera. É a seção de capacitação.",
    // Recorte para x<760 elimina o quadro branco inteiro, que era onde estava
    // o texto mais embaralhado do lote ("Ccleta de Dados", duplicado).
    src: "/img/treinamento.jpg",
    alt: "Instrutora explica um fluxo em tela para um operador que anota em caderno",
    w: 760,
    h: 570,
  },
  dorea: {
    id: "Guilherme Dorea",
    direcao:
      "Retrato vertical, meio corpo, no ambiente de trabalho — não em estúdio com fundo branco. Olhar para a câmera. Mesma luz e mesmo enquadramento nos três retratos.",
    w: 1200,
    h: 1600,
    emBreve: true,
  },
  tirolla: {
    id: "Rogerio Tirolla",
    direcao:
      "Retrato vertical, meio corpo, no ambiente de trabalho. Mesmo tratamento do retrato 05 — os três precisam parecer a mesma sessão.",
    w: 1200,
    h: 1600,
    emBreve: true,
  },
  figueira: {
    id: "Guilherme Figueira",
    direcao:
      "Retrato vertical, meio corpo, no ambiente de trabalho. Mesmo tratamento dos retratos 05 e 06.",
    w: 1200,
    h: 1600,
    emBreve: true,
  },
  contato: {
    id: "FOTO 08 · Fechamento",
    direcao:
      "Plano largo do time de um cliente trabalhando sem ninguém da APT no quadro. É a tese da marca em imagem: o processo rodando sozinho. Pode ser a mesma locação da foto 01, em outro momento.",
    w: 2400,
    h: 1000,
  },
};
