# Barrica landing cinematográfica — design

Data: 2026-06-16
Status: aprovado para spec, aguardando revisão do usuário antes do plano de implementação.

## Objetivo

Transformar a landing de pré-lançamento do Barrica de uma página tipográfica modesta (features empilhadas + waitlist) em uma experiência cinematográfica que conta **por que o Barrica existe**, mantendo a página leve e bonita no celular (público primário: tráfego de Instagram/WhatsApp em mobile, muitas vezes 4G).

Sucesso = a página comunica a tese (cachaça de alambique tem caráter, quem aprecia quer registrar, faltava o lugar), conduz ao waitlist, e **carrega rápido e sem travar no celular** mesmo com imagery e vídeo.

## Eixo narrativo

A página não é um documentário de como a cachaça é feita. É uma tese em três tempos sobre por que o app precisa existir. A imagery de produção (campo, alambique, barril) é **evidência visual** do primeiro argumento, não uma linha do tempo de produção.

## Restrições (o que NÃO mexer)

- Formulário Tally do waitlist (embed atual).
- Seção institucional (laboratórios, curadores, instituições).
- Rodapé e textos legais (beba com moderação, +18, copyright, privacidade, termos).
- Comentários de troca de fase `<!-- PHASE: waitlist -->` / `<!-- PHASE: download -->` e o mecanismo de switch waitlist→download.
- Meta tags e Open Graph (título, descrição, og:image, og:url).
- Fontes Cinzel + EB Garamond e a paleta do design system (`:root` em `style.css`).
- Sem build step, sem framework. HTML/CSS estático + JS vanilla apenas.

## Regra de copy

Zero travessões e em-dashes (`—`) em qualquer texto. Substituir por dois-pontos, ponto, vírgula ou parênteses. Preferência firme e recorrente do usuário (ver memória `no-em-dashes-copy`).

## Estrutura da página

### Ato I — Hero
Fundo: cena de **campo / canavial** ao entardecer, movimento leve (vídeo loop com still de poster).

Nota de produção: o hero e a cena "campo" do beat 1 podem ser o **mesmo asset reaproveitado** (economia de geração e de peso) ou **dois planos distintos** (hero = plano aberto de estabelecimento, beat 1 = plano de detalhe da cana). Decisão fica para a etapa de geração; o default sugerido é reaproveitar o mesmo asset para não gerar dois vídeos de campo.
Conteúdo (sobre overlay escurecido na base para legibilidade):
- Eyebrow: **Barrica**
- Título: **O Diário Social da Cachaça**
- Lead (mantido do site atual): *"Registre cada degustação e descubra a procedência: produtor, município, madeira, envelhecimento. Compartilhe com quem entende. Cachaça de alambique merece memória."*
- CTA: **Entrar na lista de espera** (âncora para o waitlist)

### Ato II — A tese (scrollytelling full-bleed)
Cada cena ocupa a tela cheia; o hook surge conforme o scroll.

**Beat 1 — Caráter próprio** (três cenas de produção, todas em **vídeo Higgsfield**):

| Cena | Imagery | Tratamento |
|---|---|---|
| Campo | canavial / terra, luz de fim de tarde | vídeo loop |
| Alambique | alambique de cobre, vapor | vídeo loop |
| Barril | adega / barris, luz âmbar (representa as cachaças **envelhecidas**) | vídeo loop |

Hook (aparece uma vez sobre a sequência):
> *"Nenhuma cachaça é igual a outra. A terra de onde vem, a madeira onde dormiu, a mão que destilou: tudo isso vira sabor."*

Nuance de domínio: a copy **não universaliza** o envelhecimento. Cachaça branca não passa por madeira; "a madeira onde dormiu" é um dos fatores que **variam** entre cachaças, o que reforça a tese de que cada uma é diferente. O barril ilustra as envelhecidas, não todas.

**Beat 2 — O apreciador** (cena própria, **still + movimento CSS Ken Burns/parallax**, sem vídeo):
- Imagery: o copo, líquido âmbar contra a luz.
- Hook: *"Quem prova de verdade quer lembrar, entender, comparar."*

**Beat 3 — A lacuna** (cena própria, **still + movimento CSS**, sem vídeo):
- Imagery: copo só, luz baixa, ambiente que esvazia.
- Hook: *"Aquela que te marcou: qual era o nome? De que município? Quanto tempo de barril? Cachaça boa se esquece fácil quando não há onde guardar."*

### Transição → Ato III
A primeira tela do app (**Check-in**, `assets/checkin.jpg`) surge sobre a atmosfera, com a virada:
> *"É por isso que o Barrica existe."*

Check-in abre a virada porque responde direto à dor plantada no beat 3 (esquecer o que provou → aqui você registra).

### Ato III — O app (corte seco, fundo limpo e sóbrio)
Quebra deliberada de atmosfera: fundo limpa, respiro claro, telas reais em destaque. Três beats curtos reaproveitando a copy atual do site:
- **Registre** (`checkin.jpg`): *"Foto, nota em barris em vez de estrelas, e o perfil sensorial do que você provou. Seu diário de degustação, sempre à mão."*
- **Descubra** (`produto.jpg`): *"Produtor, município, madeira de envelhecimento, tempo de descanso, subcategoria. A ficha completa de cada cachaça, sem precisar pesquisar fora."*
- **Compartilhe** (`feed.jpg`): *"Siga amigos, veja o que estão provando por perto e organize sua confraria: listas, conquistas e o feed de quem divide a garrafa com você."*
  - Toque discreto de gamificação (uma linha): *"Cada descoberta rende um selo. Monte sua estante de explorador."*

(`explorar.jpg` pode entrar como apoio visual do Ato III ou da transição; uso opcional.)

### Ato IV — Waitlist
Mantido como está (título + embed Tally + nota de privacidade). Acréscimo de **uma linha discreta** abaixo do form:
> *"Quem entra agora recebe o selo de explorador fundador."*

Confirmado pelo usuário como cumprível (o app de fato concederá o selo a quem entrar pela waitlist). Não entra como promessa não verificável.

### Ato V — Institucional + rodapé
Mantidos integralmente.

## Estratégia de mídia

Pipeline de produção dos assets:
1. **Stills base no Gemini** (Nano Banana / Imagen). O usuário gera e cura as imagens base antes de qualquer animação. Controle de composição, luz e enquadramento fica na mão dele.
2. **Animação no Higgsfield** (image-to-video) apenas para as **3 cenas de produção** + hero: movimento sutil estilo cinemagraph (cana ao vento, vapor subindo, reflexo no cobre). Loop curto, ambiental, não um "vídeo".
3. **Beats 2 e 3** ficam em still + movimento CSS (Ken Burns / parallax), sem passar pelo Higgsfield.

Art direction responsiva (evitar foto encolhida):
- Gerar **dois enquadramentos** de cada cena: **9:16 para mobile** e **16:9 para desktop**, ou compor com o assunto centralizado e sobra nas bordas.
- Trocar via `<picture>` / `<source>` por viewport.

Formatos e peso dos vídeos:
- Loops de 3 a 6s, mudos, sem faixa de áudio.
- WebM (VP9/AV1) com fallback MP4 (H.264).
- Alvo aproximado: 0,5 a 1,5 MB por loop. Atmosfera tolera bitrate baixo.
- Cada vídeo tem a still correspondente como `poster`.

## Performance: enhancement progressivo (a regra que impede travar)

A still é o **piso** (conteúdo real), o vídeo é o **teto** (enfeite). Aparelho e conexão decidem o que cada um recebe. Pior caso degrada para uma página de stills bonita e parada, nunca quebrada.

Controles (JS vanilla, sem framework, estimado em 30 a 50 linhas):
1. **Still sempre renderiza** como `poster` / imagem de fundo. Vídeo carrega depois.
2. **IntersectionObserver**: só busca e dá play no vídeo da seção visível; pausa e descarrega os demais. Nunca baixa todos de uma vez.
3. **`prefers-reduced-motion: reduce`** → serve apenas stills, sem vídeo e sem Ken Burns.
4. **Network Information API** (`navigator.connection.saveData`, `effectiveType`) → em save-data ou 2g/3g, não baixa vídeo; fica na still.
   - Caveat verificado: a Network Information API **não é suportada no Safari/iOS**. Quando o objeto `navigator.connection` for ausente, o fallback é: respeitar `prefers-reduced-motion` e carregar vídeo apenas via IntersectionObserver (lazy, um por vez), sem gating de conexão. Degrada com segurança, não bloqueia iOS de ter vídeo nem força vídeo em conexão ruim que o iOS sinalize por outros meios.
5. Vídeo entra com `playsinline`, `muted`, `loop`, `autoplay` (necessário para autoplay em mobile).

## Acessibilidade

- Texto sempre legível: overlay/gradiente sob hooks sobre imagery.
- `prefers-reduced-motion` respeitado (sem vídeo, sem Ken Burns).
- `alt` descritivo nas stills das telas do app (manter os atuais).
- Contraste mínimo AA entre texto e fundo nas cenas.

## Assets a produzir

Vídeos (Higgsfield, com still poster cada, em 9:16 e 16:9):
- Hero: campo / canavial entardecer.
- Beat 1: campo, alambique, barril.

Stills (Gemini, 9:16 e 16:9, com Ken Burns via CSS):
- Beat 2: copo com líquido âmbar contra a luz.
- Beat 3: copo só, luz baixa.

Telas do app (já existem em `assets/`): `checkin.jpg`, `produto.jpg`, `feed.jpg`, `explorar.jpg`.

## Fora de escopo

- Backend, analytics, tracking.
- Mudança no fluxo de fase waitlist→download (mantém mecanismo atual).
- Geração das imagens em si (é etapa do usuário no Gemini/Higgsfield; a implementação consome os assets quando prontos).
- Internacionalização (segue só pt-BR).

## Critério de aceite

1. Estrutura de 5 atos implementada na ordem acima, substituindo o zigzag de features atual.
2. Toda a copy sem travessões.
3. No mobile em conexão fraca / save-data / reduced-motion: nenhum vídeo carrega, página fica em stills, sem travar.
4. No desktop / bom 4G: vídeos das 3 cenas de produção + hero rodam em loop, um por vez conforme o scroll.
5. Enquadramento vertical próprio no mobile (não foto cortada).
6. Tally, institucional, rodapé, meta/OG e switch de fase intactos.
7. Dois toques de selo presentes e discretos (gamificação no Ato III, fundador no waitlist).

## Notas de verificação

- Estrutura atual, assets e seções a preservar: **verificado** lendo `index.html`, `style.css`, `README.md` e listando `assets/`.
- Telas disponíveis (`checkin/produto/feed/explorar.jpg`): **verificado** via listagem de arquivos. `perfil-reserva.png` existe só em `assets/raw/`, sem `.jpg` publicado; não usado no design.
- Network Information API sem suporte no Safari/iOS: **verificado** contra conhecimento de compatibilidade de browser; fallback especificado.
- Branca não envelhece em madeira: **verificado** contra conhecimento de domínio (cachaça branca/prata é não envelhecida; envelhecidas usam madeira). Copy ajustada para não universalizar.
- Capacidade image-to-video do Higgsfield e do Gemini para stills: **inferido** como disponível (MCP Higgsfield expõe generate_video/generate_image); a qualidade real de cada cena só se confirma gerando e curando. Gate externo: produção e curadoria das imagens pelo usuário.
- Pesos-alvo de vídeo e contagem de linhas de JS: **estimativas**, a validar na implementação.
