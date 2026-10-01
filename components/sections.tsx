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
  { href: "#no-chao", label: "O método" },
  { href: "#filosofia", label: "Filosofia" },
  { href: "#servicos", label: "Serviços" },
  { href: "#fundadores", label: "Fundadores" },
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
    t: "Transferir, não reter",
    d: "Sucesso é o cliente não precisar mais da gente naquele processo. Contrato que só se sustenta porque ninguém aprendeu a operar é fracasso, mesmo faturando.",
  },
  {
    n: "02",
    t: "Ir onde o trabalho acontece",
    d: "Diagnóstico se faz no chão, com quem executa — não em sala de reunião com quem descreve.",
  },
  {
    n: "03",
    t: "Autonomia de quem opera",
    d: "Quem faz o trabalho é quem melhor sabe melhorá-lo. Nosso papel é dar ferramenta, método e espaço.",
  },
  {
    n: "04",
    t: "Medir antes de afirmar",
    d: "Sem número antes e depois, é opinião. A medição abre e fecha todo projeto.",
  },
  {
    n: "05",
    t: "Simples que roda",
    d: "Processo que a equipe mantém vale mais que o processo perfeito que ninguém segue.",
  },
];

export function Filosofia() {
  return (
    <Secao
      id="filosofia"
      tom="fundo"
      ambiente={{ canto: "esquerda-baixo" }}
      rotulo="Filosofia"
      titulo="Cinco princípios que decidem o que a gente aceita fazer."
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
    t: "Não somos para quem quer só o selo.",
    d: "Se o que você precisa é o certificado para a auditoria sem mexer no processo, uma consultoria de conformidade resolve melhor e mais barato.",
  },
  {
    t: "Não competimos por preço de hora.",
    d: "Quem decide pelo menor valor de hora está comprando ferramenta. A gente entrega capacidade instalada.",
  },
  {
    t: "Não vendemos dependência.",
    d: "Contrato que só se sustenta porque o cliente nunca aprendeu a operar é fracasso.",
  },
  {
    t: "Não somos software house.",
    d: "Não viramos fábrica de demanda de sistema e não temos produto próprio para empurrar.",
  },
];

export function Limites() {
  return (
    <Secao
      id="limites"
      tom="fundo"
      ambiente={{ canto: "direita-baixo", tom: "cobre" }}
      rotulo="Os limites"
      titulo="O que a APT se recusa a ser."
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

      {/* Empresa nova que não inventa número é a coisa mais difícil de imitar
          que existe — e é a regra do próprio brand book. */}
      <Reveal delay={0.24}>
        <div className="mt-14 border border-border bg-[var(--apt-grafite)] p-8">
          <p className="apt-label text-muted-foreground">Sobre números</p>
          <p className="mt-4 max-w-3xl text-lg font-medium leading-snug sm:text-xl">
            A APT é nova. Não temos caso publicado ainda — e não vamos inventar
            porcentagem para preencher esta página.
          </p>
          <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-apt-concreto/70">
            Quando o primeiro número for real, ele aparece aqui com o cliente, o
            processo e o método de medição junto.
          </p>
        </div>
      </Reveal>
    </Secao>
  );
}

/* -------------------------------------------------------------------------- */

/* Feitos por nós dentro de uma operação onde trabalhamos. Não são casos de
   cliente — o texto diz isso, pela mesma regra do bloco "Sobre números". */
const PROJETOS = [
  {
    n: "01",
    nome: "RNC Online",
    desc: "Relatório de não conformidade preenchido em campo, com fotos de evidência, classificação de SST e qualidade, e exportação em XLS, PDF ou e-mail.",
    area: "Qualidade · Segurança do trabalho",
    href: "https://apt-rnc-online.vercel.app/",
  },
  {
    n: "02",
    nome: "Painel SGI",
    desc: "Painel de indicadores do sistema de gestão integrado, com acesso por login para cada equipe.",
    area: "Gestão · Indicadores",
    href: "https://dashapt.vercel.app/",
    restrito: true,
  },
  {
    n: "03",
    nome: "Gerador de FD",
    desc: "Monta a ficha de troca de equipamento — o que saiu, o que entrou, dados técnicos e fotos — já com o nome de arquivo no padrão.",
    area: "Ativos · Subestações",
    href: "https://gerador-fd.vercel.app/",
  },
  {
    n: "04",
    nome: "Relatório Semanal de Fiscalização",
    desc: "Gera o relatório semanal em slides a partir de um formulário. Texto que não cabe vira página de continuação no mesmo padrão.",
    area: "Fiscalização · Relatórios",
    href: "https://rsf-sgs.vercel.app/",
  },
  {
    n: "05",
    nome: "App de equipe de subestação",
    desc: "Aplicativo da equipe de campo nas subestações, com acesso por login.",
    area: "Campo · Equipes",
    href: "https://subestacao-equipe-app.vercel.app/",
    restrito: true,
  },
  {
    n: "06",
    nome: "Upload automático de fichas",
    desc: "Varre as pastas de projeto, acha o link certo na planilha e sobe os arquivos para o OneDrive/SharePoint. No fim, entrega um Excel com o que subiu e o que ficou pendente.",
    area: "Automação · Python",
    onde: "Aplicativo de desktop · Windows",
  },
  {
    n: "07",
    nome: "Slides para vídeo",
    desc: "Transforma uma apresentação de PowerPoint em vídeo narrado, com vozes em português. Adaptamos uma ferramenta de código aberto e demos a ela uma janela simples de usar.",
    area: "Treinamento · Python",
    onde: "Aplicativo de desktop · Windows",
  },
  {
    n: "08",
    nome: "Controle de hospedagem corporativa",
    desc: "Cadastro de viajantes e coordenadores, pedidos de reserva com acompanhamento de status, cancelamentos e relatório geral. Importa e exporta planilhas.",
    area: "Logística · Viagens",
    href: "/demos/controle-hospedagem.html",
    demo: true,
  },
];

export function Projetos() {
  return (
    <Secao
      id="projetos"
      tom="fundo"
      ambiente={{ canto: "direita" }}
      rotulo="Projetos"
      titulo="O que já construímos, rodando de verdade."
      intro="Ainda não são casos de cliente. São ferramentas que fizemos dentro de uma operação onde trabalhamos e que seguem em uso no dia a dia."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {PROJETOS.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.06}>
            <div className="group relative flex h-full flex-col justify-between gap-6 border border-border bg-[var(--apt-grafite)] p-6 transition-colors has-[a:hover]:border-[var(--apt-laranja)]">
              <div>
                <div className="flex items-baseline justify-between gap-4">
                  <span className="apt-label text-muted-foreground">{p.n}</span>
                  <span className="apt-label text-muted-foreground">{p.area}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.nome}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-apt-concreto/75">{p.desc}</p>
              </div>
              {p.href ? (
                /* O ::after estica o link sobre o cartão inteiro. */
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--apt-laranja)] after:absolute after:inset-0"
                >
                  {p.restrito ? "Acesso restrito — ver tela de entrada" : p.demo ? "Abrir demonstração (sem dados)" : "Abrir o aplicativo"}{" "}
                  <span aria-hidden className="inline-block transition-transform group-has-[a:hover]:translate-x-1">→</span>
                </a>
              ) : (
                <span className="text-sm text-muted-foreground">{p.onde}</span>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Secao>
  );
}

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
          Melhoria contínua, qualidade e automação para PMEs e indústrias.
        </p>
      </div>
    </footer>
  );
}
