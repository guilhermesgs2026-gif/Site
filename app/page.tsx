import { SmoothScroll } from "@/components/smooth-scroll";
import { Roadmap } from "@/components/roadmap";
import {
  HeroEditorial,
  Manifesto,
  PainelNoChao,
  ParDeImagens,
  FundadoresEditorial,
  ContatoEditorial,
} from "@/components/editorial";
import { Servicos } from "@/components/servicos";
import {
  Cabecalho,
  Filosofia,
  Limites,
  Projetos,
  Rodape,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Cabecalho />
      <main className="flex-1">
        <HeroEditorial />
        <Manifesto />
        <PainelNoChao />
        {/* Roadmap: o método explícito, em estágios nomeados. Substituiu a
            planta isométrica — ver o cabeçalho de roadmap.tsx. */}
        <Roadmap />
        <ParDeImagens />
        <Filosofia />
        <Servicos />
        <Limites />
        <FundadoresEditorial />
        <Projetos />
        <ContatoEditorial />
      </main>
      <Rodape />
    </>
  );
}
