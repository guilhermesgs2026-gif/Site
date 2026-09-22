# APT — Automations Partner Team

Site institucional da APT. Next.js 16 (App Router), React 19, Tailwind CSS 4.

**Tese da marca:** a APT automatiza o processo e capacita o time do cliente a
manter e evoluir sozinho. Cada decisão de conteúdo e de design no site deriva
disso — inclusive a ausência de números inventados.

---

## Rodar localmente

Requer Node.js 22.12 ou mais novo.

```bash
npm install
npm run dev
```

Abre em http://localhost:3000.

```bash
npm run build   # build de produção
npm start       # serve o build
```

## Publicar

O projeto é um app Next.js estático-primeiro (a home é pré-renderizada). Sobe
sem configuração extra em qualquer host que entenda Next.js — Vercel é o
caminho mais curto: importar o repositório e publicar, sem variáveis de
ambiente.

## Estrutura

| Caminho | O que é |
|---|---|
| `app/globals.css` | tokens da marca, escala tipográfica, grão, utilitários |
| `app/page.tsx` | composição da home |
| `components/editorial.tsx` | topo, manifesto, painéis de imagem, fundadores, contato |
| `components/roadmap.tsx` | os cinco estágios do método, com traçado em degraus |
| `components/servicos-horizontal.tsx` | serviços em rolagem horizontal fixada |
| `components/sections.tsx` | cabeçalho, filosofia, limites, projetos, rodapé |
| `components/media.tsx` | moldura de imagem, com estado de foto ausente |
| `components/slots.ts` | **fonte única dos espaços de imagem** |
| `components/video-sequencia.tsx` | os dois planos de fundo alternando |
| `scripts/` | verificações visuais com Playwright |

## Sistema de design

Paleta, tipografia e regras estão em `app/globals.css`, com o raciocínio nos
comentários. Resumo:

- **Base** `#0d0f12` com três degraus de elevação. Fundo chapado é o que mais
  entrega página feita em template.
- **Acento** cobre `#c2683f`, em dose mínima. A matiz é a da marca; o croma foi
  cortado para o tom sair de "alerta" e entrar em "metal".
- **Verde** `#2f7a5c` significa uma coisa só: o que passou a ser do cliente.
- **Tipografia** Archivo Black em caixa alta para display, IBM Plex Sans no
  corpo, IBM Plex Mono em rótulo e número.
- **Canto reto** em tudo. Raio zero é decisão, não esquecimento.

## Imagens e vídeo

`components/slots.ts` é a fonte única: cada espaço declara a direção de arte, a
proporção e o caminho do arquivo. Sem `src`, a moldura desenha um placeholder
marcado com o enquadramento pedido — o layout já é o final.

Os três retratos dos sócios estão em `emBreve: true` e mostram "Em breve" até
as fotos existirem.

**As três imagens atuais são geradas e provisórias.** Foram recortadas para
eliminar texto ilegível e crachás, e os uniformes trazem um "APT" em tipografia
comum, não o símbolo real da marca. Refotografar resolve.

## Acessibilidade

`prefers-reduced-motion` é respeitado em toda animação de interface: o roadmap
mostra o estado final sem cena fixada, os serviços viram rolagem nativa de
lado, e as entradas por scroll não movem nada.

O vídeo de fundo é a exceção deliberada — mudo, em loop, sem corte e sem
movimento de câmera brusco é ambiente, não animação. Congelá-lo tirava o fundo
do site inteiro de quem apenas desligou as animações do sistema.

## Verificação visual

```bash
node scripts/verificar-roadmap.mjs   # traçado, nós e marca percorrendo o caminho
node scripts/verificar-topo.mjs      # os dois planos e o corte entre eles
```

Rodam com o `npm run dev` de pé. Emulam `prefers-reduced-motion` nos dois
estados, porque vários defeitos desta base apareciam só em um deles.

## Pendências

- Destino do botão "Falar com a APT" — e-mail, WhatsApp ou formulário.
- Retratos dos três sócios.
- Fotos definitivas no lugar das geradas.
- A seção Projetos está vazia de propósito, até existir caso real.
- Quatro elementos de vídeo tocam ao mesmo tempo (dois no topo, dois no
  fechamento). Pausar o par fora da viewport com `IntersectionObserver`.
