"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Dois planos alternando no fundo do topo.
 *
 * A ordem carrega o argumento da marca: abre no sistema rodando sozinho, corta
 * para as pessoas que o operam. Ferramenta resolve metade, a outra metade é
 * gente — dito em duas imagens, sem legenda.
 *
 * Os dois vídeos tocam o tempo todo e só a opacidade troca. Pausar o que está
 * escondido economizaria decodificação, mas ao voltar o plano recomeçaria de
 * onde parou e o corte ficaria irregular; são dois arquivos pequenos, vale a
 * troca.
 */

export type Plano = {
  src: string;
  srcMobile: string;
  poster: string;
  /** quanto tempo este plano fica no ar, em milissegundos */
  duracao: number;
  rotulo: string;
};

export const PLANOS: Plano[] = [
  {
    src: "/video/operacao.mp4",
    srcMobile: "/video/operacao-m.mp4",
    poster: "/video/operacao-poster.webp",
    duracao: 6000,
    rotulo: "o processo rodando",
  },
  {
    src: "/video/time.mp4",
    srcMobile: "/video/time-m.mp4",
    poster: "/video/time-poster.webp",
    duracao: 7000,
    rotulo: "quem opera",
  },
];

const FADE = 1100;

export function VideoSequencia({
  veu = "baixo",
  onPlano,
}: {
  veu?: "baixo" | "esquerda";
  onPlano?: (i: number) => void;
}) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);
  const [atual, setAtual] = useState(0);

  useEffect(() => {
    // Celular recebe os arquivos leves. Decidido no cliente, porque o servidor
    // não conhece a largura da tela.
    const estreito = window.matchMedia("(max-width: 900px)").matches;

    refs.current.forEach((v, i) => {
      if (!v) return;
      if (estreito) v.src = PLANOS[i].srcMobile;
      // `muted` como propriedade, não só como prop do React: sem o atributo no
      // DOM o navegador trata o vídeo como sonoro e bloqueia a reprodução.
      v.muted = true;
      v.play().catch(() => {});
    });
  }, []);

  useEffect(() => {
    onPlano?.(atual);
    const t = setTimeout(
      () => setAtual((i) => (i + 1) % PLANOS.length),
      PLANOS[atual].duracao,
    );
    return () => clearTimeout(t);
  }, [atual, onPlano]);

  const gradiente =
    veu === "esquerda"
      ? "linear-gradient(to right, var(--apt-base) 10%, color-mix(in srgb, var(--apt-base) 78%, transparent) 55%, color-mix(in srgb, var(--apt-base) 36%, transparent) 100%)"
      : "linear-gradient(to top, var(--apt-base) 5%, color-mix(in srgb, var(--apt-base) 76%, transparent) 44%, color-mix(in srgb, var(--apt-base) 24%, transparent) 84%)";

  return (
    <div className="absolute inset-0 overflow-hidden">
      {PLANOS.map((p, i) => (
        <video
          key={p.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          src={p.src}
          poster={p.poster}
          muted
          loop
          playsInline
          preload={i === 0 ? "auto" : "metadata"}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: atual === i ? 1 : 0,
            transition: `opacity ${FADE}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            filter: "grayscale(0.58) contrast(1.14) brightness(0.5)",
          }}
        />
      ))}

      {/* puxa o que sobrou de azul para a base */}
      <div
        aria-hidden
        className="absolute inset-0 mix-blend-color"
        style={{ background: "var(--apt-base)" }}
      />
      {/* devolve um calor mínimo, para não virar chumbo morto */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.09] mix-blend-overlay"
        style={{ background: "var(--apt-cobre)" }}
      />
      {/* véu de legibilidade: o texto não pode depender do que o vídeo mostra
          naquele segundo */}
      <div aria-hidden className="absolute inset-0" style={{ background: gradiente }} />
    </div>
  );
}
