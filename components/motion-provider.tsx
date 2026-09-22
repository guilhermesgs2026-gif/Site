"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * `reducedMotion="user"` faz a Motion respeitar a preferência do sistema sem
 * que nenhum componente precise ramificar a própria marcação — que é o que
 * quebrava a hidratação, já que o servidor não conhece a preferência de quem
 * visita. Transform some, opacidade fica.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
