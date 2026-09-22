"use client";

/**
 * Fundo para seções só de texto.
 *
 * Superfície lisa atrás de um bloco de tipografia grande fica sem peso — o
 * texto flutua e a seção parece um slide. A saída que serve a esta marca não é
 * decoração: é a própria identidade em escala de material.
 *
 * O símbolo entra gigante, **cortado pela borda**, em opacidade quase nula. O
 * corte é a parte que importa: marca inteira e centralizada lê como marca
 * d'água barata; cortada, lê como estrutura que continua além do quadro.
 *
 * O que foi deliberadamente evitado: grade de fio em gradiente ladrilhado. É o
 * reflexo óbvio para "fundo vazio" e o detector do impeccable a classifica como
 * `codex-grid-background`, assinatura recorrente de interface gerada.
 */

type Canto = "direita" | "esquerda" | "esquerda-baixo" | "direita-baixo";

const POSICAO: Record<Canto, string> = {
  direita: "-right-[14%] top-1/2 -translate-y-1/2",
  esquerda: "-left-[16%] top-1/2 -translate-y-1/2",
  "esquerda-baixo": "-left-[18%] -bottom-[22%]",
  "direita-baixo": "-right-[18%] -bottom-[26%]",
};

export function Ambiente({
  canto = "direita",
  /** 0.02–0.05. Acima disso vira marca d'água e compete com o texto. */
  forca = 0.03,
  tom = "texto",
}: {
  canto?: Canto;
  forca?: number;
  tom?: "texto" | "cobre";
}) {
  const cor = tom === "cobre" ? "var(--apt-cobre)" : "var(--apt-texto)";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 120 120"
        className={`absolute h-[min(150%,86rem)] w-auto ${POSICAO[canto]}`}
        style={{ opacity: forca }}
        fill="none"
        stroke={cor}
        strokeWidth={14}
        strokeLinecap="round"
      >
        <path d="M 40 22 L 84 22 A 14 14 0 0 1 98 36 L 98 52" />
        <path d="M 98 68 L 98 84 A 14 14 0 0 1 84 98 L 52 98" />
        <path d="M 36 98 A 14 14 0 0 1 22 84 L 22 36" />
      </svg>
    </div>
  );
}
