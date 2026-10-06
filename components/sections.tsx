"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { AptMarkStatic } from "@/components/apt-mark";
import { Ambiente } from "@/components/ambiente";

/**
 * Curva única para tudo que entra. Desaceleração longa lê como coisa pesada
 * parando; linear é mecânico, e mecânico não serve para nada que toque
 * sensação.
 */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Uma marcação só, servidor e cliente. Ramificar o DOM em
 * `prefers-reduced-motion` quebra a hidratação — o servidor não conhece a
 * preferência de quem visita. Quem desliga o movimento é o `MotionConfig`
 * com `reducedMotion="user"` no layout.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.65, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Coluna de rótulo à esquerda, conteúdo à direita — grade de relatório. */
function Secao({
  id,
  rotulo,
  titulo,
  intro,
  children,
  tom = "base",
  ambiente,
}: {
  id: string;
  rotulo: string;
  titulo: string;
  intro?: string;
  children?: ReactNode;
  tom?: "base" | "fundo";
  /* Seção só de texto recebe a marca gigante cortada ao fundo. O canto varia
     entre seções para elas não ficarem idênticas. */
  ambiente?: { canto: "direita" | "esquerda" | "esquerda-baixo" | "direita-baixo"; tom?: "texto" | "cobre" };
}) {
  return (
    <section
      id={id}
      className={`relative overflow-hidden ${
        tom === "fundo" ? "border-y border-border bg-[var(--apt-sup1)]" : ""
      }`}
    >
      {ambiente && <Ambiente canto={ambiente.canto} tom={ambiente.tom} />}
      <div className="relative mx-auto max-w-6xl px-6 py-24 sm:py-32">
        <Reveal>
          <div className="grid gap-x-16 gap-y-6 md:grid-cols-[minmax(0,14rem)_1fr]">
            <p className="apt-label pt-2 text-[var(--apt-laranja)]">{rotulo}</p>
            <div>
              <h2 className="apt-display apt-d3 max-w-3xl">
                {titulo}
              </h2>
              {intro && (
                <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-apt-concreto/75">
                  {intro}
                </p>
              )}
            </div>
          </div>
        </Reveal>
        {children && (
          <div className="mt-16 grid gap-x-16 md:grid-cols-[minmax(0,14rem)_1fr]">
            <div aria-hidden />
            <div>{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const NAV = [
  { href: "#no-chao", label: "Método" },
  { href: "#filosofia", label: "Ética" },
  { href: "#servicos", label: "O que fazemos" },
  { href: "#fundadores", label: "Quem somos" },
  { href: "#projetos", label: "Projetos" },
];

export function Cabecalho() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-[var(--apt-grafite)]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href="#topo" className="flex items-center gap-3 text-apt-concreto">
          <AptMarkStatic size={26} />
          <span className="text-base font-bold tracking-[-0.01em]">APT</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-apt-concreto/70 transition-colors hover:text-apt-concreto"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="apt-press border border-[var(--apt-laranja)] px-4 py-2 text-xs font-medium uppercase tracking-[0.1em] text-[var(--apt-laranja)] hover:bg-[var(--apt-laranja)] hover:text-[var(--apt-grafite)]"
        >
          Falar com a APT
        </a>
      </div>
    </header>
  );
}

/* -------------------------------------------------------------------------- */

const VALORES = [
  {
    n: "01",
    t: "Assume o problema",
    d: "Se a gente viu o retrabalho, o problema passa a ser nosso. Não esperamos alguém mandar resolver.",
  },
  {
    n: "02",
    t: "Termina o que começa",
    d: "Ferramenta só conta quando está no ar e sendo usada. Protótipo parado na pasta não entra nesta página.",
  },
  {
    n: "03",
    t: "Aprende o que precisar",
    d: "Quando o problema pediu mapa, voz sintetizada ou automação de navegador, a gente foi aprender. A ferramenta que a gente conhece não limita a solução.",
  },
  {
    n: "04",
    t: "Deixa tudo explicado",
    d: "Quem usa não pode depender da gente. As ferramentas web saem com manual em PDF e com o Apto dando dica em cada tela.",
  },
  {
    n: "05",
    t: "Fala a verdade sobre o resultado",
    d: "Sem número de antes e de depois, é opinião. Por isso não tem porcentagem nesta página. E quando partimos do trabalho de outra pessoa, a gente diz.",
  },
];

export function Filosofia() {
  return (
    <Secao
      id="filosofia"
      tom="fundo"
      ambiente={{ canto: "esquerda-baixo" }}
      rotulo="Ética de trabalho"
      titulo="O que dá para esperar de qualquer um de nós."
    >
      <ul className="divide-y divide-border border-y border-border">
        {VALORES.map((v, i) => (
          <li key={v.n}>
            <Reveal delay={i * 0.05}>
              <div className="grid gap-3 py-7 sm:grid-cols-[4rem_1fr] sm:gap-8">
                <span className="apt-label pt-1 text-muted-foreground">{v.n}</span>
                <div>
                  <h3 className="text-lg font-semibold">{v.t}</h3>
                  <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-apt-concreto/75">
                    {v.d}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Secao>
  );
}

/* -------------------------------------------------------------------------- */

const RECUSAS = [
  {
    t: "Não prendemos ninguém.",
    d: "Ferramenta que só funciona enquanto a gente estiver por perto é ferramenta mal feita.",
  },
  {
    t: "Não construímos por construir.",
    d: "Tudo começa de um problema que alguém sente no dia a dia, e não de uma tecnologia que a gente quer testar.",
  },
  {
    t: "Não ficamos com mérito dos outros.",
    d: "Quando partimos de algo que já existia, a gente diz. O Slides para vídeo é adaptação de uma ferramenta de código aberto, e está escrito assim.",
  },
  {
    t: "Não largamos pela metade.",
    d: "Ferramenta nossa sai rodando, com manual e com quem usa sabendo usar. Protótipo bonito que ninguém usa não conta.",
  },
];

export function Limites() {
  return (
    <Secao
      id="limites"
      tom="fundo"
      ambiente={{ canto: "direita-baixo", tom: "cobre" }}
      rotulo="Compromissos"
      titulo="Do que a gente não abre mão."
    >
      <div className="grid gap-x-12 gap-y-9 sm:grid-cols-2">
        {RECUSAS.map((r, i) => (
          <Reveal key={r.t} delay={i * 0.06}>
            <div className="border-l-2 border-[var(--apt-laranja)] pl-5">
              <h3 className="text-base font-semibold leading-snug">{r.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-apt-concreto/75">{r.d}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Grupo novo que não inventa número é a coisa mais difícil de imitar
          que existe, e é a regra do próprio brand book. */}
      <Reveal delay={0.24}>
        <div className="mt-14 border border-border bg-[var(--apt-grafite)] p-8">
          <p className="apt-label text-muted-foreground">Sobre números</p>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-snug sm:text-xl">
            Ainda não publicamos nenhum resultado com número. E não vamos
            inventar porcentagem para preencher esta página.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-apt-concreto/70">
            As ferramentas estão em uso. Quando a medição de antes e depois
            estiver feita, o número aparece aqui com o processo e o método de
            medição junto.
          </p>
        </div>
      </Reveal>
    </Secao>
  );
}

/* -------------------------------------------------------------------------- */

export function Rodape() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3 text-apt-concreto">
          <AptMarkStatic size={28} />
          <div>
            <p className="text-base font-bold leading-none">APT</p>
            <p className="apt-label mt-1 text-muted-foreground">Automations Partner Team</p>
          </div>
        </div>
        <p className="max-w-xs text-sm text-muted-foreground">
          Automação e melhoria contínua, feitas por quem está dentro da operação.
        </p>
      </div>
    </footer>
  );
}
