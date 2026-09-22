"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Ambiente } from "@/components/ambiente";

/**
 * Serviços revelados pela rolagem.
 *
 * Substituiu a versão em trilho horizontal. O trilho tinha dois problemas: ele
 * sequestrava o scroll — quem rolava para ler a página era obrigado a atravessar
 * a faixa de lado — e dependia de um pin que não existe com movimento reduzido,
 * o que deixava metade dos cartões inalcançável.
 *
 * Aqui a rolagem continua sendo rolagem. A coluna da esquerda fica presa e conta
 * onde a pessoa está; os serviços passam à direita e cada um se revela ao entrar.
 * Funciona igual com ou sem animação: sem ela, tudo já está visível.
 */

const PORTAS = [
  {
    n: "01",
    nome: "Consultoria e implantação",
    desc: "Diagnóstico onde o trabalho acontece, desenho do processo e a automação entregue rodando.",
    para: "Projeto com início e fim. Para quem tem um gargalo nomeado.",
  },
  {
    n: "02",
    nome: "Parceria contínua",
    desc: "Um time de melhoria contínua acoplado à sua operação, mês a mês. É o que a palavra Partner no nome promete.",
    para: "Para quem tem mais processo do que braço para cuidar.",
  },
  {
    n: "03",
    nome: "Treinamento e cultura",
    desc: "Formamos o seu time para automatizar e melhorar por conta própria.",
    para: "Para quem quer a capacidade dentro de casa.",
  },
  {
    n: "04",
    nome: "O que não fazemos",
    desc: "Não vendemos selo sem mudança de processo, não competimos por preço de hora e não temos produto próprio para empurrar.",
    para: "Dizer não faz parte do serviço.",
    limite: true,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Porta({
  porta,
  indice,
  onAtivo,
}: {
  porta: (typeof PORTAS)[number];
  indice: number;
  /* Recebe o setter direto do useState, que tem referência estável. Uma arrow
     criada no pai entraria nova a cada render e o efeito abaixo reexecutaria
     sem parar. */
  onAtivo: (i: number) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  /* `amount: 0.55` faz o item virar o ativo só quando ele domina a faixa de
     leitura, não quando a primeira linha aparece. Sem isso o contador pisca
     entre dois números durante a rolagem. */
  const naVista = useInView(ref, { amount: 0.55, margin: "-18% 0px -18% 0px" });

  /* Avisar o pai dentro do render disparava setState durante a renderização.
     O efeito troca o estado depois da pintura, que é onde isso pertence. */
  useEffect(() => {
    if (naVista) onAtivo(indice);
  }, [naVista, indice, onAtivo]);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="border-t border-[var(--apt-fio)] py-14 first:border-t-0 sm:py-20"
    >
      <div className="flex items-baseline gap-5">
        <span
          className={`apt-display text-2xl leading-none transition-colors duration-500 ${
            porta.limite ? "text-[var(--apt-cobre)]" : "text-apt-concreto/25"
          }`}
        >
          {porta.n}
        </span>
        <h3 className="apt-display text-2xl leading-[1.04] sm:text-[2.1rem]">
          {porta.nome}
        </h3>
      </div>

      <p className="mt-6 max-w-xl text-base leading-relaxed text-apt-concreto/75">
        {porta.desc}
      </p>
      <p className="mt-5 max-w-xl text-sm text-muted-foreground">{porta.para}</p>
    </motion.article>
  );
}

export function Servicos() {
  const [ativo, setAtivo] = useState(0);

  return (
    <section
      id="servicos"
      className="relative overflow-hidden border-t border-[var(--apt-fio)]"
    >
      <Ambiente canto="esquerda" />
      <div className="mx-auto grid max-w-7xl gap-x-16 px-6 py-24 lg:grid-cols-[minmax(0,20rem)_1fr] sm:py-32">
        {/* Coluna presa: diz onde a pessoa está sem precisar de barra. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="apt-label text-[var(--apt-cobre)]">Serviços</p>
          <h2 className="apt-display apt-d3 mt-5">
            Três portas,
            <br />
            uma tese
          </h2>
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-apt-concreto/70">
            A mesma ideia em três estágios de maturidade. Você sobe a escada
            conforme faz sentido — não existe degrau em que a gente precise que
            você fique preso.
          </p>

          {/* Indicador de progresso: uma barra por serviço, a do atual acesa. */}
          <div className="mt-10 hidden items-center gap-4 lg:flex">
            <span className="apt-label text-[var(--apt-cobre)]">
              {PORTAS[ativo].n}
            </span>
            <span className="flex gap-1.5" aria-hidden>
              {PORTAS.map((p, i) => (
                <span
                  key={p.n}
                  className="h-[2px] w-8 transition-colors duration-500"
                  style={{
                    background:
                      i === ativo ? "var(--apt-cobre)" : "var(--apt-fio)",
                  }}
                />
              ))}
            </span>
            <span className="apt-label text-muted-foreground">
              de {String(PORTAS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="mt-14 lg:mt-0">
          {PORTAS.map((porta, i) => (
            <Porta key={porta.n} porta={porta} indice={i} onAtivo={setAtivo} />
          ))}
        </div>
      </div>
    </section>
  );
}
