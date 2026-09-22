"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Frame } from "@/components/media";
import { VideoSequencia, PLANOS } from "@/components/video-sequencia";
import { SLOTS } from "@/components/slots";
import { AptMark } from "@/components/apt-mark";
import { Ambiente } from "@/components/ambiente";
import { Reveal } from "@/components/sections";

/**
 * Blocos editoriais dirigidos por imagem.
 *
 * A referência que o cliente trouxe é um site esportivo montado sobre
 * fotografia: tipo display gigante sobre foto sangrada, painéis que trocam de
 * imagem no hover, retratos grandes. O que foi emprestado aqui é a estrutura —
 * tipografia como elemento gráfico, imagem ocupando a tela inteira, texto
 * entrando por cima. A paleta, a tipografia e a grade continuam as da APT.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/* -------------------------------------------------------------------------- */

export function HeroEditorial() {
  const [plano, setPlano] = useState(0);

  return (
    <section id="topo" className="relative min-h-svh overflow-hidden">
      <VideoSequencia veu="baixo" onPlano={setPlano} />

      <div className="relative flex min-h-svh flex-col justify-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16 sm:pb-24">
          {/* Indicador de plano: diz o que está no ar e amarra o topo à
              linguagem numerada do roadmap. */}
          <div className="absolute right-6 bottom-[calc(4rem+2px)] hidden items-center gap-3 lg:flex">
            <span className="apt-label text-[var(--apt-cobre)]">
              {String(plano + 1).padStart(2, "0")}
            </span>
            <span className="apt-label text-muted-foreground">
              {PLANOS[plano].rotulo}
            </span>
            <span className="flex gap-1.5">
              {PLANOS.map((_, i) => (
                <span
                  key={i}
                  className="h-[2px] w-7 transition-colors duration-500"
                  style={{
                    background:
                      i === plano ? "var(--apt-cobre)" : "var(--apt-fio)",
                  }}
                />
              ))}
            </span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="apt-label text-[var(--apt-cobre)]"
          >
            Automations Partner Team
          </motion.p>

          {/* A sigla como elemento gráfico. Sangra à esquerda de propósito:
              texto que respeita a margem dos dois lados é o que faz uma
              página parecer gabarito. */}
          {/* Sigla e marca na mesma linha, alinhadas pela base. Antes a marca
              flutuava sozinha no meio da direita, sem relação com nada, e
              sobrava um vão diagonal entre ela e o texto. Como par, as duas
              seguram a largura da tela juntas. */}
          <div className="mt-3 flex items-end justify-between gap-8">
            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.95, delay: 0.18, ease: EASE }}
              className="apt-display apt-d1 -ml-[0.06em]"
            >
              APT
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.34, ease: EASE }}
              className="mb-[0.1em] hidden shrink-0 text-apt-concreto/85 lg:block"
            >
              <AptMark size={168} />
            </motion.div>
          </div>

          {/* O fio atravessa o container inteiro: antes parava em 768px, no meio
              do nada. E a última faixa vira duas colunas — frase à esquerda,
              ações à direita — para a página não terminar empilhada no canto
              inferior esquerdo. */}
          <div className="apt-fio mt-8 grid gap-8 pt-8 lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="max-w-xl text-lg font-medium leading-[1.3] tracking-[-0.01em] sm:text-2xl"
              >
                Melhoria contínua, qualidade e automação{" "}
                <span className="text-[var(--apt-cobre)]">
                  que continuam sem a gente.
                </span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.42 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#contato"
                className="apt-press bg-[var(--apt-cobre)] px-7 py-4 text-sm font-semibold uppercase tracking-[0.08em] text-[var(--apt-vazio)] hover:bg-[var(--apt-cobre-claro)]"
              >
                Conversar sobre um processo
              </a>
              <a
                href="#metodo"
                className="apt-press border border-[var(--apt-fio)] px-7 py-4 text-sm font-medium uppercase tracking-[0.08em] text-apt-concreto/85 hover:border-apt-concreto/45"
              >
                Ver o método
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Faixa de declaração: tipo grande sobre fundo liso, entre dois blocos de foto. */
export function Manifesto() {
  const frase =
    "Ferramenta resolve metade. A outra metade é gente capaz de sustentar.";
  const palavras = frase.split(" ");

  return (
    <section className="relative overflow-hidden border-y border-border bg-[var(--apt-sup1)]">
      <Ambiente canto="direita" forca={0.035} />
      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-40">
        <p className="apt-label mb-10 text-[var(--apt-laranja)]">A tese</p>
        {/* Entrada palavra a palavra: o olho lê a frase na ordem em que ela
            aparece, o que dá peso à segunda metade — que é o argumento. */}
        <h2 className="apt-display apt-d2 max-w-5xl">
          {palavras.map((p, i) => (
            <motion.span
              key={`${p}-${i}`}
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-25% 0px" }}
              transition={{ duration: 0.5, delay: i * 0.045, ease: EASE }}
              className="inline-block"
            >
              {p}&nbsp;
            </motion.span>
          ))}
        </h2>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-2xl text-[15px] leading-relaxed text-apt-concreto/70">
            O mercado vende sistema para quem não mudou o processo, e manual de
            qualidade para quem não tem quem sustente o método. Em ambos os casos
            alguém entrega, emite a nota e vai embora — e seis meses depois tudo
            voltou a ser o que era.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Bloco de duas colunas: foto alta de um lado, argumento do outro. */
export function PainelNoChao() {
  return (
    <section id="no-chao" className="relative overflow-hidden">
      {/* A foto ocupa a esquerda, então o símbolo entra pela direita, atrás do
          texto. */}
      <Ambiente canto="direita" />
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_1fr] lg:gap-20">
        <Reveal>
          <Frame slot={SLOTS.metodo} className="w-full" />
        </Reveal>

        <div>
          <Reveal>
            <p className="apt-label text-[var(--apt-laranja)]">Onde a gente entra</p>
            <h2 className="apt-display apt-d3 mt-5 max-w-xl">
              Diagnóstico se faz no chão, com quem executa.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-apt-concreto/75">
              Não em sala de reunião com quem descreve o processo. A gente vai
              até onde o trabalho acontece, mede como está hoje e só então mexe
              em alguma coisa. Sem linha de base, qualquer ganho depois é
              opinião.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <dl className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-3">
              {[
                ["Medimos", "antes e depois"],
                ["Redesenhamos", "o processo, não o sistema"],
                ["Transferimos", "com critério escrito"],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="apt-label text-[var(--apt-laranja)]">{k}</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-apt-concreto/75">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/** Duas fotos largas lado a lado, com rótulo por cima. */
export function ParDeImagens() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { slot: SLOTS.filosofia, titulo: "O detalhe que ninguém mede" },
          { slot: SLOTS.treinamento, titulo: "O time que assume depois" },
        ].map((b, i) => (
          <Reveal key={b.titulo} delay={i * 0.1}>
            <Frame slot={b.slot} legenda="topo-direita" className="w-full">
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--apt-grafite)] to-transparent p-7 pt-24">
                <h3 className="text-xl font-semibold tracking-[-0.01em]">{b.titulo}</h3>
              </div>
            </Frame>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

const SOCIOS = [
  { nome: "Guilherme Dorea", slot: SLOTS.dorea },
  { nome: "Rogerio Tirolla", slot: SLOTS.tirolla },
  { nome: "Guilherme Figueira", slot: SLOTS.figueira },
];

export function FundadoresEditorial() {
  return (
    <section id="fundadores" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
        <Reveal>
          <p className="apt-label text-[var(--apt-laranja)]">Fundadores</p>
          <h2 className="apt-display apt-d3 mt-5 max-w-3xl">
            Três pessoas que já foram o funcionário que enxergava o desperdício.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-16">
            <p className="max-w-xl text-base leading-relaxed text-apt-concreto/75">
              Em quase toda empresa existe alguém que faz o trabalho, enxerga o
              que está errado e sabe como resolver. Quase sempre essa pessoa leva
              a ideia adiante e a ideia morre — por prioridade, por orçamento, por
              &ldquo;agora não é o momento&rdquo;.
            </p>
            <p className="max-w-xl text-base leading-relaxed text-apt-concreto/75">
              Depois de algumas mortes, ela para de levar ideia. Continua vendo o
              desperdício, mas cala.{" "}
              <span className="text-apt-concreto">
                A APT existe para que esse caminho tenha para onde ir.
              </span>
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-3">
          {SOCIOS.map((s, i) => (
            <Reveal key={s.nome} delay={i * 0.08}>
              <Frame slot={s.slot} legenda="topo-direita" className="w-full">
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[var(--apt-grafite)] to-transparent p-6 pt-20">
                  <p className="text-lg font-semibold tracking-[-0.01em]">{s.nome}</p>
                  <p className="apt-label mt-1 text-muted-foreground">Sócio fundador</p>
                </div>
              </Frame>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

export function ContatoEditorial() {
  return (
    <section id="contato" className="relative overflow-hidden border-t border-border">
      <VideoSequencia veu="esquerda" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 sm:py-40">
        <div className="flex flex-col items-start gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Reveal>
              <p className="apt-label text-[var(--apt-laranja)]">Contato</p>
              <h2 className="apt-display apt-d2 mt-5 max-w-2xl">
                Uma conversa sobre um processo que está doendo.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-relaxed text-apt-concreto/80">
                Sem proposta pronta e sem diagnóstico por telefone. A gente ouve o
                processo, diz se é caso para a APT — e diz também quando não é.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              {/* Destino ainda não definido: e-mail, WhatsApp ou formulário é
                  decisão dos sócios. */}
              <a
                href="#contato"
                className="mt-10 inline-block bg-[var(--apt-laranja)] px-7 py-3.5 text-sm font-semibold text-[var(--apt-grafite)] transition-transform hover:-translate-y-0.5"
              >
                Falar com a APT
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="hidden text-apt-concreto/90 lg:block">
              <AptMark size={150} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
