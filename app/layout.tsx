import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Archivo_Black } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { Carregamento } from "@/components/carregamento";

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
    "Um grupo que automatiza o trabalho de dentro da operação. Conheça o nosso método, a nossa ética de trabalho e as ferramentas que já estão rodando.",
  openGraph: {
    title: "APT — Automations Partner Team",
    description: "Automação feita de dentro da operação, e deixada rodando.",
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
        <Carregamento />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
