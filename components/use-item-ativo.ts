import { useEffect, useState, type RefObject } from "react";

/**
 * Índice do filho de `lista` que está em leitura: o último cujo topo já
 * passou de uma linha a 45% da tela.
 *
 * Substituiu um useInView por item. Itens curtos ficavam visíveis ao mesmo
 * tempo, o último efeito vencia e o contador pulava do 01 para o 03.
 */
export function useItemAtivo(lista: RefObject<HTMLElement | null>) {
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    let quadro = 0;
    const medir = () => {
      quadro = 0;
      const linha = window.innerHeight * 0.45;
      const itens = lista.current?.children ?? [];
      let i = 0;
      for (let k = 0; k < itens.length; k++) {
        if (itens[k].getBoundingClientRect().top <= linha) i = k;
      }
      setAtivo(i);
    };
    const agendar = () => {
      if (!quadro) quadro = requestAnimationFrame(medir);
    };
    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar);
    return () => {
      cancelAnimationFrame(quadro);
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, [lista]);

  return ativo;
}
