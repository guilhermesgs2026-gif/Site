"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Moldura de mídia.
 *
 * Enquanto a foto não existe, renderiza um espaço marcado com a proporção
 * certa, o nome do slot e a direção do que entra ali. Placeholder honesto vale
 * mais que uma foto de banco genérica: o layout já é o final, e quem for
 * fotografar sabe exatamente o enquadramento que precisa entregar.
 */
export type Slot = {
  id: string;
  /** o que a foto precisa mostrar — vira a legenda do placeholder */
  direcao: string;
  /** largura/altura alvo, em pixels, para o arquivo final */
  w: number;
  h: number;
  /** caminho em /public quando a foto existir */
  src?: string;
  /** segunda imagem, revelada no hover (padrão do site de referência) */
  hover?: string;
  alt?: string;
  /** o material já foi decidido e está a caminho — mostra "em breve" em vez
   *  da direção de arte, que só interessa a quem vai fotografar */
  emBreve?: boolean;
};

export function Frame({
  slot,
  className = "",
  priority = false,
  /** Onde a legenda do placeholder se ancora. No hero ela precisa sair de
   *  baixo, senão fica por trás do título e lê como sujeira. */
  legenda = "baixo",
  children,
}: {
  slot: Slot;
  className?: string;
  priority?: boolean;
  legenda?: "baixo" | "topo-direita";
  children?: React.ReactNode;
}) {
  const [over, setOver] = useState(false);
  const temFoto = Boolean(slot.src);

  return (
    <figure
      className={`group relative overflow-hidden bg-[var(--apt-grafite-2)] ${className}`}
      style={{ aspectRatio: `${slot.w} / ${slot.h}` }}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => setOver(false)}
    >
      {temFoto ? (
        <>
          <Image
            src={slot.src!}
            alt={slot.alt ?? slot.direcao}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          />
          {slot.hover && (
            <Image
              src={slot.hover}
              alt=""
              aria-hidden
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className={`object-cover transition-opacity duration-500 ${
                over ? "opacity-100" : "opacity-0"
              }`}
            />
          )}
        </>
      ) : (
        <PlaceholderMarcado slot={slot} legenda={legenda} />
      )}
      {children}
    </figure>
  );
}

/** O estado sem foto. Desenhado, não quebrado. */
function PlaceholderMarcado({
  slot,
  legenda,
}: {
  slot: Slot;
  legenda: "baixo" | "topo-direita";
}) {
  const ancora =
    legenda === "topo-direita"
      ? "items-end justify-start text-right"
      : "items-start justify-end text-left";
  return (
    <div className="absolute inset-0">
      {/* grade técnica, mesma linguagem do resto do site */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(233,230,225,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(233,230,225,0.05) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* cantos de enquadramento */}
      <div aria-hidden className="absolute inset-5">
        {(
          [
            "left-0 top-0 border-l-2 border-t-2",
            "right-0 top-0 border-r-2 border-t-2",
            "left-0 bottom-0 border-l-2 border-b-2",
            "right-0 bottom-0 border-r-2 border-b-2",
          ] as const
        ).map((pos) => (
          <span
            key={pos}
            className={`absolute h-6 w-6 border-[var(--apt-laranja)]/70 ${pos}`}
          />
        ))}
      </div>

      {slot.emBreve ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-center">
          <span className="apt-display text-3xl text-apt-concreto/22">Em breve</span>
          <span className="apt-label text-muted-foreground">{slot.id}</span>
        </div>
      ) : (
        <div className={`absolute inset-0 flex flex-col gap-2 p-7 sm:p-9 ${ancora}`}>
          <span className="apt-label text-[var(--apt-laranja)]">{slot.id}</span>
          <p className="max-w-md text-sm leading-relaxed text-apt-concreto/70">
            {slot.direcao}
          </p>
          <span className="apt-label text-muted-foreground">
            {slot.w} × {slot.h}
          </span>
        </div>
      )}
    </div>
  );
}
