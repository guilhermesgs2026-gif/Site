"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { Ambiente } from "@/components/ambiente";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin, useGSAP);

/**
 * Roadmap do método.
 *
 * Substituiu a planta isométrica. A planta mostrava um espaço se arrumando —
 * bonito, mas a narrativa ficava implícita e cada estágio exigia inventar um
 * objeto novo para representá-lo. Um roadmap é a linguagem de deck de
 * estratégia: os estágios são explícitos, nomeados e ordenados.
 *
 * O traçado sobe em degraus porque o que sobe é capacidade, não tempo. E a
 * peça da APT percorre o caminho e **desce antes do último trecho** — a tese
 * da marca dita em um movimento, sem legenda.
 */

const ETAPAS = [
  {
    n: "01",
    x: 160,
    y: 520,
    titulo: "Hoje",
    desc: "O processo mora em planilha, conversa e na cabeça de uma pessoa.",
    marca: "linha de base desconhecida",
  },
  {
    n: "02",
    x: 440,
    y: 430,
    titulo: "Diagnóstico",
    desc: "Medição onde o trabalho acontece, com quem executa.",
    marca: "linha de base registrada",
  },
  {
    n: "03",
    x: 720,
    y: 340,
    titulo: "Padrão",
    desc: "O processo é redesenhado antes de qualquer sistema entrar.",
    marca: "fluxo definido",
  },
  {
    n: "04",
    x: 1000,
    y: 250,
    titulo: "Automação",
    desc: "O que era digitado, conferido e recopiado passa a correr sozinho.",
    marca: "ganho medido",
  },
  {
    n: "05",
    x: 1280,
    y: 160,
    titulo: "Autonomia",
    desc: "O time mantém e evolui o processo sem a gente.",
    marca: "transferência concluída",
    doTime: true,
  },
];

/* Degraus: corre na horizontal, sobe, corre de novo. Os nós ficam no início de
   cada corrida, o que deixa o rótulo sempre com espaço livre acima. */
const TRACADO =
  "M 80 520 L 300 520 L 300 430 L 580 430 L 580 340 L 860 340 L 860 250 L 1140 250 L 1140 160 L 1360 160";

/* Último trecho, desenhado por cima em verde: é o pedaço que o cliente toca. */
const TRECHO_TIME = "M 1140 250 L 1140 160 L 1360 160";

export function Roadmap() {
  const root = useRef<HTMLDivElement>(null);
  const cena = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(cena);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const estreito = window.matchMedia("(max-width: 900px)").matches;

      if (reduce || estreito) {
        gsap.set(q("[data-road]"), { drawSVG: "100%" });
        gsap.set(q("[data-road-time]"), { drawSVG: "100%" });
        gsap.set(q("[data-no]"), { opacity: 1, scale: 1 });
        gsap.set(q("[data-rotulo]"), { opacity: 1, y: 0 });
        gsap.set(q("[data-marca-apt]"), { opacity: 0 });
        return;
      }

      gsap.set(q("[data-road]"), { drawSVG: "0%" });
      gsap.set(q("[data-road-time]"), { drawSVG: "0%" });
      gsap.set(q("[data-no]"), { opacity: 0, scale: 0.4, transformOrigin: "50% 50%" });
      gsap.set(q("[data-rotulo]"), { opacity: 0, y: 14 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          pin: true,
          scrub: 0.5,
          refreshPriority: 1,
        },
      });

      // O traçado desenha do começo ao fim e comanda todo o resto.
      tl.to(q("[data-road]"), { drawSVG: "100%", duration: 1 }, 0);

      // A peça da APT anda em cima do traçado. `align` amarra o elemento ao
      // path em coordenadas do próprio SVG — sem isso ela anda em paralelo,
      // deslocada da linha. Pego o nó pelo ref e não pelo seletor do GSAP,
      // que devolve um união de tipos de HTML e exigiria um cast cego.
      const estrada = cena.current?.querySelector<SVGPathElement>("[data-road]");
      if (estrada) {
        tl.to(
          q("[data-marca-apt]"),
          {
            duration: 0.78,
            motionPath: { path: estrada, align: estrada, alignOrigin: [0.5, 0.5] },
          },
          0,
        );
      }

      // Cada nó e seu rótulo entram quando o traço passa por eles.
      ETAPAS.forEach((_, i) => {
        const t = i / (ETAPAS.length - 1);
        const quando = Math.min(0.94, t * 0.92 + 0.04);
        tl.to(q(`[data-no="${i}"]`), { opacity: 1, scale: 1, duration: 0.05 }, quando)
          .to(q(`[data-rotulo="${i}"]`), { opacity: 1, y: 0, duration: 0.07 }, quando);
      });

      // A APT desce antes do último trecho, e o trecho final se pinta de verde.
      tl.to(q("[data-marca-apt]"), { opacity: 0, duration: 0.06 }, 0.78)
        .to(q("[data-road-time]"), { drawSVG: "100%", duration: 0.18 }, 0.79)
        .to(q('[data-no="4"] circle'), { fill: "var(--apt-verde)", duration: 0.08 }, 0.9);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="metodo"
      aria-label="Roadmap do método da APT"
      /* Altura mínima, não fixa. Com `h-svh` + `overflow-hidden` a legenda era
         cortada pela própria borda da seção em janela baixa — e o corte
         dependia da janela, então passava em teste e falhava na tela do
         cliente. Agora a seção cresce se precisar. */
      className="relative flex min-h-svh flex-col justify-center overflow-hidden border-t border-[var(--apt-fio)] py-24"
    >
      {/* Canto inferior direito: o traçado sobe da base-esquerda para o topo-
          direita, então é a única área grande que ele não atravessa. Força
          menor que nas outras seções para não competir com a linha, que aqui
          é o assunto. */}
      <Ambiente canto="direita-baixo" forca={0.025} />
      <div className="mx-auto w-full max-w-7xl px-6">
        <p className="apt-label text-[var(--apt-cobre)]">O método</p>
        <h2 className="apt-display apt-d3 mt-4 max-w-2xl">
          Cinco estágios. O último não é nosso.
        </h2>
      </div>

      {/* O SVG vive no mesmo container do título: antes ele sangrava a largura
          toda (x=0) enquanto o texto começava em x=104, e a seção inteira lia
          como desalinhada. */}
      <div className="mx-auto w-full max-w-7xl px-6">
      <svg
        ref={cena}
        viewBox="0 0 1440 620"
        /* Teto de altura para janela baixa. `xMinYMid` ancora o desenho na
           esquerda, então ele continua alinhado ao título mesmo quando o teto
           de altura entra em ação e o traçado encolhe. */
        preserveAspectRatio="xMinYMid meet"
        className="mt-8 max-h-[52svh] w-full"
        role="img"
        aria-label="Cinco estágios em degraus ascendentes: hoje, diagnóstico, padrão, automação e autonomia"
      >
        {/* Traçado apagado ao fundo: mostra o caminho inteiro desde o começo,
            para o olho saber para onde a coisa vai. */}
        <path
          d={TRACADO}
          fill="none"
          stroke="var(--apt-texto)"
          strokeOpacity="0.09"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <path
          data-road
          d={TRACADO}
          fill="none"
          stroke="var(--apt-cobre)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <path
          data-road-time
          d={TRECHO_TIME}
          fill="none"
          stroke="var(--apt-verde)"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {ETAPAS.map((e, i) => (
          <g key={e.n}>
            {/* Rótulo acima do nó. Grupo externo posiciona, grupo interno
                anima: animar `y` num <g> que já carrega `transform` faz o
                GSAP sobrescrever a translação e o texto some do quadro. */}
            {/* Rótulo perto da borda direita cresce para a esquerda, senão o
                texto do último estágio é cortado pelo viewBox. */}
            <g transform={`translate(${e.x} ${e.y - 34})`} textAnchor={e.x > 1100 ? "end" : "start"}>
              <g data-rotulo={i}>
              <text
                x="0"
                y="-74"
                fill="var(--apt-texto-mudo)"
                fontSize="13"
                letterSpacing="2"
                fontFamily="var(--font-plex-mono), monospace"
              >
                {e.n}
              </text>
              <text
                x="0"
                y="-44"
                fill="var(--apt-texto)"
                fontSize="26"
                fontFamily="var(--font-display), sans-serif"
                letterSpacing="-0.5"
              >
                {e.titulo.toUpperCase()}
              </text>
              <text
                x="0"
                y="-18"
                fill={e.doTime ? "var(--apt-verde)" : "var(--apt-cobre)"}
                fontSize="12"
                letterSpacing="1.6"
                fontFamily="var(--font-plex-mono), monospace"
              >
                {e.marca.toUpperCase()}
              </text>
              </g>
            </g>

            <g data-no={i} transform={`translate(${e.x} ${e.y})`}>
              <circle r="9" fill={e.doTime ? "var(--apt-verde)" : "var(--apt-cobre)"} />
              <circle
                r="19"
                fill="none"
                stroke={e.doTime ? "var(--apt-verde)" : "var(--apt-cobre)"}
                strokeOpacity="0.35"
                strokeWidth="1.5"
              />
            </g>
          </g>
        ))}

        {/* A peça da APT, percorrendo o traçado. Sai de cena antes do fim. */}
        <g data-marca-apt>
          <rect
            x="-13"
            y="-13"
            width="26"
            height="26"
            fill="var(--apt-base)"
            stroke="var(--apt-cobre)"
            strokeWidth="4"
            strokeDasharray="58 16"
          />
        </g>
      </svg>

        <p className="apt-fio mt-6 max-w-xl pt-5 text-[15px] leading-relaxed text-apt-concreto/70">
          {ETAPAS[4].desc}
        </p>
      </div>
    </section>
  );
}
