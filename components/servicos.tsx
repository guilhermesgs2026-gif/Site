"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { useItemAtivo } from "@/components/use-item-ativo";
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
    nome: "Automação de rotina",
    desc: "Formulário de campo que vira relatório, ficha, planilha ou apresentação no padrão certo, sem ninguém redigitar nada.",
    para: "Foi assim com o RNC Online, o Gerador de FD e o RSF.",
  },
  {
    n: "02",
    nome: "Painéis e indicadores",
    desc: "Dado espalhado em planilha vira painel com filtro, gráfico e relatório pronto para apresentar.",
    para: "Foi assim com o Painel SGI.",
  },
  {
    n: "03",
    nome: "Ferramentas para o time",
    desc: "Upload automático de fichas, alocação de equipes por distância, controle de hospedagem e vídeo de treinamento feito a partir de slides.",
    para: "Cada uma resolveu um problema que a gente mesmo tinha.",
  },
  {
    n: "04",
    nome: "O que não fazemos",
    desc: "Não fazemos sistema para enfeitar processo ruim, não deixamos ninguém preso à nossa ferramenta e não contamos resultado que não medimos.",
    para: "Saber dizer não também é método.",
    limite: true,
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function Porta({ porta }: { porta: (typeof PORTAS)[number] }) {
  return (
    <motion.article
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
  const lista = useRef<HTMLDivElement>(null);
  const ativo = useItemAtivo(lista);

  return (
    <section
      id="servicos"
      className="relative overflow-hidden border-t border-[var(--apt-fio)]"
    >
      <Ambiente canto="esquerda" />
      <div className="mx-auto grid max-w-7xl gap-x-16 px-6 py-24 lg:grid-cols-[minmax(0,20rem)_1fr] sm:py-32">
        {/* Coluna presa: diz onde a pessoa está sem precisar de barra. */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <p className="apt-label text-[var(--apt-cobre)]">O que a gente faz</p>
          <h2 className="apt-display apt-d3 mt-5">
            O que a gente
            <br />
            sabe fazer
          </h2>
          <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-apt-concreto/70">
            Nada nesta lista é promessa. Tudo aqui a gente já fez pelo menos uma
            vez, e está rodando.
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

        <div ref={lista} className="mt-14 lg:mt-0">
          {PORTAS.map((porta) => (
            <Porta key={porta.n} porta={porta} />
          ))}
        </div>
      </div>
    </section>
  );
}
