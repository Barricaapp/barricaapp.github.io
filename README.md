# barrica-site

Landing page do Barrica — O Diário Social da Cachaça.

HTML/CSS estático puro, página única, sem build step e sem JavaScript próprio.

## Editar

- Conteúdo: `index.html`
- Estilo: `style.css` (variáveis no `:root` espelham o design system do app)
- Imagens: `assets/` (originais dos screenshots ficam em `assets/raw/`, fora do git)

## Troca de fase (waitlist → download)

No `index.html` há dois blocos demarcados:

    <!-- PHASE: waitlist (active) -->  ... formulário Tally ...
    <!-- PHASE: download (commented, enable at launch) -->

No launch: comentar os blocos `waitlist`, descomentar os blocos `download`
e preencher o href do badge com a URL da Play Store. O badge da App Store
segue o mesmo padrão quando o app for publicado lá.

## Publicação

Decidida em sessão futura (GitHub Pages em repo público ou domínio próprio).
