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
4. Download (badges das duas lojas) + 5. institucional + rodapé — bloco final sobre o barril (still, fecha o arco campo → barril), com Instagram no rodapé

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

## Fases de loja (estado atual: as duas lojas ao vivo)

**Swap feito em 09/set/2026.** A lista de espera Android saiu da página; os dois
badges apontam para as fichas públicas:

| Loja | Link | Estado |
|---|---|---|
| App Store | `https://apps.apple.com/app/id6781766987` | publicada em 26/jun/2026 |
| Google Play | `https://play.google.com/store/apps/details?id=com.barrica.app` | ficha pública, versão 1.21.0, atualizada em 05/set/2026 |

Badges oficiais ficam locais em `assets/` (sem depender de endpoint externo):
`appstore-ptbr.svg` (Apple, preto, PT-BR) e `googleplay-ptbr.png` (Google, PT-BR).
Os dois assets têm margens internas diferentes, então largura igual deixa o do
Play parecer menor: `.store-badge-play` compensa isso no `style.css`.

No `index.html` sobrou um bloco demarcado só, `<!-- PHASE: download -->`, no hero.
A seção do Ato IV virou `<section class="download">`, e o `id="lista"` foi
**mantido de propósito**: peças já publicadas (bio do Instagram, WhatsApp)
apontam para `#lista`.

### O que saiu, e o que fazer se voltar

- **Formulário Tally** (`EkaKOB`, lista de espera Android): removido do HTML, junto
  com o ramo do script inline que injetava UTM no iframe. O formulário segue
  existindo no Tally; se algum dia voltar, o ramo precisa voltar também.
- **Regras de CSS órfãs** removidas no mesmo commit: `.store-alt`, `.android-cue`,
  `.waitlist iframe` e `.privacy-note` (esta última só servia ao formulário; o link
  da Política de Privacidade continua no rodapé).

### UTM e Install Referrer

O link do Google Play carrega `data-play`, e o script inline põe o UTM **dentro** do
parâmetro `referrer` (formato do Install Referrer). Sem esse atributo o UTM não
viaja para a Play: o bloco pré-escrito da fase anterior não o tinha.

### Promessa datada na página

A linha "Os 100 primeiros usuários ganham o selo de Membro Fundador" corresponde ao
troféu `Membro Fundador` (condição `primeiros_100_usuarios`), ativo em produção.
**Remover a linha quando o app passar de 100 usuários.**

## Publicação

Decidida em sessão futura (GitHub Pages em repo público ou domínio próprio).
