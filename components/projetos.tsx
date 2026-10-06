"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Ambiente } from "@/components/ambiente";
import { AptMarkStatic } from "@/components/apt-mark";
import { useItemAtivo } from "@/components/use-item-ativo";

/**
 * Projetos com prévia que acompanha a rolagem.
 *
 * Mesmo padrão de Serviços: a rolagem continua sendo rolagem. A coluna da
 * esquerda fica presa com uma janela de navegador, e a captura troca conforme
 * o projeto da direita domina a tela. Nada de trilho horizontal — ver o
 * cabeçalho de servicos.tsx para o porquê.
 *
 * No celular não há coluna presa: cada projeto leva a própria captura.
 *
 * Feitos por nós dentro de uma operação onde trabalhamos. Não são casos de
 * cliente — o texto diz isso, pela mesma regra do bloco "Sobre números".
 * Capturas em /img/projetos, sem marca da empresa.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

type Projeto = {
  n: string;
  nome: string;
  desc: string;
  area: string;
  /* Sem `img`, a janela mostra a marca: app de desktop não tem página. */
  img?: string;
  href?: string;
  restrito?: boolean;
  demo?: boolean;
  onde?: string;
};

const PROJETOS: Projeto[] = [
  {
    n: "01",
    nome: "RNC Online",
    desc: "Relatório de não conformidade preenchido em campo, com fotos de evidência, classificação de SST e qualidade, e exportação em XLS, PDF ou e-mail.",
    area: "Qualidade · Segurança do trabalho",
    img: "/img/projetos/rnc.jpg",
    href: "https://apt-rnc-online.vercel.app/",
  },
  {
    n: "02",
    nome: "Painel SGI",
    desc: "Indicadores de segurança, qualidade e gestão a partir das inspeções de campo: contratadas, desvios, equipes e locais, com filtros por período e regional. Gráficos saem em imagem e o relatório sai pronto em apresentação.",
    area: "Gestão · Indicadores",
    img: "/img/projetos/sgi.jpg",
    href: "https://dashapt.vercel.app/",
    restrito: true,
  },
  {
    n: "03",
    nome: "Gerador de FD",
    desc: "Monta a ficha de troca de equipamento, com o que saiu, o que entrou, os dados técnicos e as fotos, já com o nome de arquivo no padrão.",
    area: "Ativos · Subestações",
    img: "/img/projetos/fd.jpg",
    href: "https://gerador-fd.vercel.app/",
  },
  {
    n: "04",
    nome: "Relatório Semanal de Fiscalização",
    desc: "Gera o relatório semanal em slides a partir de um formulário. Texto que não cabe vira página de continuação no mesmo padrão.",
    area: "Fiscalização · Relatórios",
    img: "/img/projetos/rsf.jpg",
    href: "https://rsf-sgs.vercel.app/",
  },
  {
    n: "05",
    nome: "Alocação de equipes",
    desc: "Monta as equipes de fiscalização por subestação a partir do endereço de cada funcionário. Calcula a distância, marca quem ficaria a mais de 50 km e mostra tudo no mapa, com a rota até a subestação.",
    area: "Campo · Equipes",
    img: "/img/projetos/subestacao.jpg",
    href: "https://subestacao-equipe-app.vercel.app/",
    restrito: true,
  },
  {
    n: "06",
    nome: "Upload automático de fichas",
    desc: "Varre as pastas de projeto, acha o link certo na planilha e sobe os arquivos para o OneDrive/SharePoint. No fim, entrega um Excel com o que subiu e o que ficou pendente.",
    area: "Automação · Python",
    img: "/img/projetos/upload-fichas.jpg",
    onde: "Aplicativo de desktop · Windows",
  },
  {
    n: "07",
    nome: "Slides para vídeo",
    desc: "Transforma uma apresentação de PowerPoint em vídeo narrado em português, com voz pronta ou clonada de uma gravação sua. Adaptamos uma ferramenta de código aberto e demos a ela uma janela simples de usar.",
    area: "Treinamento · Python",
    img: "/img/projetos/slides-video.jpg",
    onde: "Aplicativo de desktop · Windows",
  },
  {
    n: "08",
    nome: "Controle de hospedagem corporativa",
    desc: "Cadastro de viajantes e coordenadores, pedidos de reserva com acompanhamento de status, cancelamentos e relatório geral. Importa e exporta planilhas.",
    area: "Logística · Viagens",
    img: "/img/projetos/hospedagem.jpg",
    href: "/demos/controle-hospedagem.html",
    demo: true,
  },
];

function endereco(p: Projeto) {
  if (!p.href) return "aplicativo de desktop";
  return p.href.replace(/^https?:\/\//, "").replace(/\/$/, "") || p.href;
}

/** Janela de navegador com a captura. Sem imagem, mostra a marca. */
function Janela({ p, className = "" }: { p: Projeto; className?: string }) {
  return (
    <div className={`overflow-hidden border border-border bg-[var(--apt-sup2)] ${className}`}>
      <div className="flex items-center gap-3 border-b border-border px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-2 w-2 rounded-full bg-apt-concreto/20" />
          ))}
        </span>
        <span className="truncate font-mono text-[11px] text-muted-foreground">{endereco(p)}</span>
      </div>
      <div className="relative aspect-[16/10] bg-[var(--apt-base)]">
        {p.img ? (
          <Image
            src={p.img}
            alt={`Tela do ${p.nome}`}
            fill
            sizes="(min-width: 1024px) 34rem, 100vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-apt-concreto/60">
            <AptMarkStatic size={56} />
            <span className="apt-label text-muted-foreground">Roda no computador · sem página web</span>
          </div>
        )}
      </div>
    </div>
  );
}

function Item({ p }: { p: Projeto }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="border-t border-[var(--apt-fio)] py-12 first:border-t-0 sm:py-16"
    >
      <Janela p={p} className="mb-8 lg:hidden" />
      <div className="flex items-baseline justify-between gap-4">
        <span className="apt-display text-2xl leading-none text-apt-concreto/25">{p.n}</span>
        <span className="apt-label text-right text-muted-foreground">{p.area}</span>
      </div>
      <h3 className="apt-display mt-4 text-2xl leading-[1.04] sm:text-[2.1rem]">{p.nome}</h3>
      <p className="mt-5 max-w-xl text-base leading-relaxed text-apt-concreto/75">{p.desc}</p>
      <div className="mt-6">
        {p.href ? (
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-sm text-[var(--apt-laranja)]"
          >
            {p.restrito
              ? "Acesso restrito: ver a tela de entrada"
              : p.demo
                ? "Abrir demonstração (sem dados)"
                : "Abrir o aplicativo"}{" "}
            <span aria-hidden className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        ) : (
          <span className="text-sm text-muted-foreground">{p.onde}</span>
        )}
      </div>
    </motion.article>
  );
}

export function Projetos() {
  const lista = useRef<HTMLDivElement>(null);
  const ativo = useItemAtivo(lista);

  return (
    <section
      id="projetos"
      className="relative overflow-clip border-y border-border bg-[var(--apt-sup1)]"
    >
      <Ambiente canto="direita" />
      <div className="relative mx-auto grid max-w-7xl gap-x-16 px-6 py-24 sm:py-32 lg:grid-cols-[minmax(0,34rem)_1fr]">
        {/* Coluna presa: a prévia troca conforme o projeto em foco. */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="apt-label text-[var(--apt-cobre)]">Projetos</p>
          <h2 className="apt-display apt-d3 mt-5">O que já construímos, rodando de verdade.</h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-apt-concreto/70">
            Ainda não são casos de cliente. São ferramentas que fizemos dentro de
            uma operação onde trabalhamos e que seguem em uso no dia a dia.
          </p>

          <div className="relative mt-10 hidden lg:block">
            {/* Todas empilhadas; só a ativa aparece. Trocar o src piscaria a
                imagem a cada carregamento. */}
            {PROJETOS.map((p, i) => (
              <div
                key={p.n}
                aria-hidden={i !== ativo}
                className={`transition-opacity duration-500 ${
                  i === 0 ? "relative" : "absolute inset-0"
                } ${i === ativo ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <Janela p={p} />
              </div>
            ))}
          </div>

          <div className="mt-6 hidden items-center gap-4 lg:flex">
            <span className="apt-label text-[var(--apt-cobre)]">{PROJETOS[ativo].n}</span>
            <span className="flex gap-1.5" aria-hidden>
              {PROJETOS.map((p, i) => (
                <span
                  key={p.n}
                  className="h-[2px] w-6 transition-colors duration-500"
                  style={{ background: i === ativo ? "var(--apt-cobre)" : "var(--apt-fio)" }}
                />
              ))}
            </span>
            <span className="apt-label text-muted-foreground">
              de {String(PROJETOS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div ref={lista} className="mt-14 lg:mt-0">
          {PROJETOS.map((p) => (
            <Item key={p.n} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
