/**
 * Tela de carregamento, trazida do RNC Online. CSS puro (ver `.ld-*` em
 * globals.css): renderiza no servidor, roda antes da hidratação e some sozinha
 * em ~3s. Com movimento reduzido ela nem aparece.
 */
export function Carregamento() {
  return (
    <div
      aria-hidden="true"
      className="ld-tela fixed inset-0 z-[100] flex items-center justify-center bg-[var(--apt-base)]"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-end gap-5 text-apt-concreto sm:gap-7 xl:gap-10">
          <svg
            viewBox="0 0 120 120"
            className="h-28 w-28 lg:h-40 lg:w-40 2xl:h-52 2xl:w-52"
            fill="none"
            strokeWidth={14}
            strokeLinecap="round"
          >
            <path className="ld-traco" pathLength={1} d="M 40 22 L 84 22 A 14 14 0 0 1 98 36 L 98 52" stroke="var(--apt-cobre)" />
            <path className="ld-traco" pathLength={1} d="M 98 68 L 98 84 A 14 14 0 0 1 84 98 L 52 98" stroke="currentColor" />
            <path className="ld-traco" pathLength={1} d="M 36 98 A 14 14 0 0 1 22 84 L 22 36" stroke="currentColor" />
          </svg>
          <span className="apt-display text-[5.5rem] sm:text-[7.5rem] lg:text-[10.5rem] 2xl:text-[13.5rem]">
            {["A", "P", "T"].map((l, i) => (
              <span key={l} className="ld-sobe inline-block" style={{ animationDelay: `${1.3 + i * 0.1}s` }}>
                {l}
              </span>
            ))}
          </span>
        </div>
        <span className="ld-barra mt-5 block h-[2px] w-full bg-[var(--apt-cobre)]" />
        <p className="apt-label ld-sobe mt-3 text-[var(--apt-cobre)] lg:text-sm 2xl:text-base" style={{ animationDelay: "1.8s" }}>
          Automations Partner Team
        </p>
      </div>
    </div>
  );
}
