"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll suavizado, com o ScrollTrigger amarrado ao relógio do Lenis.
 *
 * Sem esse casamento os dois brigam: o Lenis interpola a posição por conta
 * própria e o ScrollTrigger continua lendo o scroll nativo, o que faz a cena
 * fixada tremer. `lenis.on("scroll", ScrollTrigger.update)` mantém os dois na
 * mesma frame, e tirar o Lenis do próprio rAF para o ticker do GSAP garante
 * uma única fila de animação.
 *
 * Quem pede movimento reduzido não recebe suavização nenhuma — scroll nativo,
 * que é o comportamento esperado.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      // Toque fica nativo: suavizar scroll de dedo atrapalha mais do que ajuda.
      syncTouch: false,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
