"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(DrawSVGPlugin, useGSAP);

/**
 * O símbolo da APT desenhando-se a si mesmo.
 *
 * Foi escrito com anime.js primeiro e a marca não aparecia para quem tem
 * animação ligada: o traço ficava parado em comprimento zero
 * (`stroke-dasharray: 0px, 1010px`). O defeito passou despercebido porque
 * nesta máquina o movimento reduzido está ativo, e aí o código saía antes de
 * tocar no traço — deixando a marca inteira e aparentemente correta.
 *
 * Agora usa `DrawSVGPlugin`, que já está no projeto e está verificado no
 * roadmap. Uma biblioteca a menos fazendo a mesma coisa.
 *
 * O segmento em cobre entra por último, sozinho: é o segmento ativo do ciclo,
 * e a abertura no canto superior esquerdo nunca se fecha.
 */
export function AptMark({ size = 120, play = true }: { size?: number; play?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const paths = ref.current?.querySelectorAll("path");
      if (!paths || paths.length < 3) return;

      // Sem animação, ou com movimento reduzido: marca inteira, de uma vez.
      if (!play || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(paths, { drawSVG: "100%" });
        return;
      }

      // Grafite primeiro, cobre por último — a ordem conta a mesma história do
      // ciclo: a estrutura existe, o segmento ativo é o que se move.
      gsap
        .timeline({ defaults: { ease: "power2.out" } })
        .fromTo(paths[1], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.62 }, 0)
        .fromTo(paths[2], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.62 }, 0.16)
        .fromTo(paths[0], { drawSVG: "0%" }, { drawSVG: "100%", duration: 0.72 }, 0.38);
    },
    { scope: ref, dependencies: [play] },
  );

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      strokeWidth={14}
      strokeLinecap="round"
      role="img"
      aria-label="APT"
    >
      <path d="M 40 22 L 84 22 A 14 14 0 0 1 98 36 L 98 52" stroke="var(--apt-cobre)" />
      <path d="M 98 68 L 98 84 A 14 14 0 0 1 84 98 L 52 98" stroke="currentColor" />
      <path d="M 36 98 A 14 14 0 0 1 22 84 L 22 36" stroke="currentColor" />
    </svg>
  );
}

/** Versão estática, sem animação — para cabeçalho, rodapé e navegação. */
export function AptMarkStatic({ size = 28 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none"
         strokeWidth={14} strokeLinecap="round" role="img" aria-label="APT">
      <path d="M 40 22 L 84 22 A 14 14 0 0 1 98 36 L 98 52" stroke="var(--apt-cobre)" />
      <path d="M 98 68 L 98 84 A 14 14 0 0 1 84 98 L 52 98" stroke="currentColor" />
      <path d="M 36 98 A 14 14 0 0 1 22 84 L 22 36" stroke="currentColor" />
    </svg>
  );
}
