# barrica-site

Landing page do Barrica — O Diário Social da Cachaça.

HTML/CSS estático, página única, sem build step. Um arquivo de JS vanilla
(`script.js`) cuida só do enhancement progressivo das cenas em vídeo.

## Estrutura

Scrollytelling cinematográfico em 5 atos (ver spec em
`docs/superpowers/specs/2026-06-16-barrica-landing-cinematica-design.md`):

1. Hero (cena campo)
2. A tese: caráter próprio (alambique) e o copo que esvazia no scroll (apreciador → lacuna, numa cena só)
3. Transição + o app (corte seco, telas reais)
4. Waitlist (Tally) + 5. institucional + rodapé — bloco final sobre o barril (still, fecha o arco campo → barril), com Instagram no rodapé

## Editar

- Conteúdo: `index.html`
- Estilo: `style.css` (variáveis no `:root` espelham o design system do app)
- Enhancement de vídeo: `script.js`
- Imagens: `assets/`

## Assets cinematográficos (a produzir)

Pipeline: still-base no Gemini → animação no Higgsfield (só as cenas de produção).
A still é o poster; o vídeo carrega por cima quando aparelho e conexão permitem.

Cada cena tem versão paisagem (16:9) e retrato (9:16, sufixo `-9x16`):

- Vídeo + poster: `campo`, `alambique` (`.mp4` + `.jpg`)
- Still de fundo do bloco final: `barril.jpg` / `barril-9x16.jpg` (os `barril.mp4` ficaram sem uso após a cena do topo sair)
- Cena que esvazia no scroll (crossfade ligado ao scroll, via `script.js`): `copo.jpg` → `copo-vazio.jpg`
- Telas do app: transição = `checkin.jpg` (Reserva) + `perfil.jpg`; features = `degust.jpg` (Registre), `produto.jpg` (Descubra), `feed.jpg` (Compartilhe). `explorar.jpg` não usada no momento.

Enquanto os assets não existem, a página renderiza com posters quebrados; a
estrutura, o CSS e o JS já funcionam.

## Enhancement progressivo (não travar no mobile)

`script.js`: poster sempre renderiza; o vídeo só carrega via IntersectionObserver
(um por vez), respeita `prefers-reduced-motion` e a Network Information API
(save-data / 2g-3g → fica na still). Sem a API (Safari/iOS), cai no lazy-load.

## Troca de fase (waitlist → download)

No `index.html` há blocos demarcados:

    <!-- PHASE: waitlist (active) -->  ... formulário Tally ...
    <!-- PHASE: download (commented, enable at launch) -->

No launch: comentar os blocos `waitlist`, descomentar os blocos `download`
e preencher o href do badge com a URL da Play Store.

## Publicação

Decidida em sessão futura (GitHub Pages em repo público ou domínio próprio).
