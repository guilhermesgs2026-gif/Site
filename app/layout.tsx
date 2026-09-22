import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

/**
 * Display. O site inteiro em uma grotesca neutra é o que fazia tudo parecer
 * gerado: sem contraste tipográfico não existe voz. Archivo Black é pesada e
 * larga o bastante para ler como sinalização industrial, e briga bem com a
 * mono nos números.
 */
const archivo = Archivo_Black({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "APT — Automations Partner Team",
  description:
    "Automatizamos o processo e capacitamos o time a manter e evoluir sozinho. Melhoria contínua, qualidade e automação para PMEs e indústrias.",
  openGraph: {
    title: "APT — Automations Partner Team",
    description: "Melhoria que continua sem a gente.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${plexSans.variable} ${plexMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="apt-grao min-h-full flex flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
