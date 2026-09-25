# Plano de Polimento Visual de Véspera

## Contexto

A Feira do Conhecimento acontece em 26 de setembro. A aplicação já está funcional, os QR Codes foram testados e a prioridade agora é melhorar a percepção visual sem colocar em risco navegação, links, mapas, PWA, localStorage ou os dados dos 15 projetos.

## Objetivo

Transformar a interface de "protótipo funcional" em uma experiência mais acolhedora, celebrativa e coerente com os 40 anos da E.E. Maria Luiza Miranda Bastos, preservando o comportamento atual.

Princípio de execução:

> baixo risco + alto impacto visual

## Restrições

- não alterar IDs de projetos;
- não alterar URLs usadas pelos QR Codes;
- não alterar persistência local;
- não trocar framework ou biblioteca;
- não reestruturar rotas React;
- não redesenhar o mapa do zero;
- não inventar identidade institucional;
- usar somente a marca oficial já versionada em `public/images/logo-escola.png`;
- preservar acessibilidade e legibilidade em celulares de 360px a 430px.

## Direção visual

### Linguagem

Institucional + cultural + histórica + contemporânea.

### Paleta

Basear o refinamento nas cores reais da marca:

- magenta: ações principais e celebração;
- azul: orientação e informação;
- verde: progresso, visitado e confirmação;
- fundos neutros claros: leitura e respiro.

### Motivos gráficos

Usar de forma discreta:

- linha do tempo 1986 → 2026 → futuro;
- pontos de percurso;
- selo/passaporte;
- linhas pontilhadas;
- camadas suaves de cor;
- contraste entre superfícies.

## Etapas

### Etapa 1 — Fundação visual e Home — P0

Arquivos prováveis:
- `src/pages/HomePage.tsx`
- `src/styles/visual-polish-v2.css`
- `src/main.tsx`

Ações:
- reforçar hero institucional;
- ampliar presença do tema "40 Anos Conectando Histórias";
- criar faixa visual 1986 → 2026 → futuro;
- melhorar hierarquia da data e do horário;
- melhorar cards de acesso rápido;
- adicionar profundidade, bordas e superfícies sem excesso de sombra;
- preservar integralmente os destinos dos links.

Critério de aceite:
- primeiro acesso precisa parecer uma experiência de evento, não um dashboard;
- CTA principal visível sem rolagem excessiva em 390px;
- logo sem corte;
- nenhum texto técnico ou interno.

### Etapa 2 — Projetos, rotas e cards — P0/P1

Arquivos prováveis:
- `src/components/ProjectCard.tsx`
- `src/components/RouteCard.tsx`
- `src/pages/ProjectsPage.tsx`
- `src/pages/RoutesPage.tsx`
- `src/pages/RouteDetailPage.tsx`
- `src/styles/visual-polish-v2.css`

Ações:
- tornar localização a informação mais escaneável;
- melhorar diferenciação entre título, turma e sala;
- reforçar estado visitado;
- refinar rota selecionada e sequência sugerida;
- manter áreas de toque adequadas.

### Etapa 3 — Passaporte — P1

Arquivos prováveis:
- `src/pages/PassportPage.tsx`
- `src/styles/visual-polish-v2.css`

Ações:
- reforçar sensação de passaporte;
- criar visual de "carimbo" para visitados;
- valorizar progresso sem transformar em competição;
- criar finalização mais comemorativa.

### Etapa 4 — Mapa — P1

Arquivos prováveis:
- `src/pages/MapPage.tsx`
- `src/map/SchoolMap.tsx`
- `src/styles/visual-polish-v2.css`

Ações:
- melhorar moldura e hierarquia do mapa;
- manter 1º/2º andar explícitos;
- preservar legibilidade dos blocos;
- reforçar "Você está aqui" e "Seu destino";
- não alterar geometria do mapa sem necessidade.

### Etapa 5 — Timeline e acabamento global — P2

Arquivos prováveis:
- `src/pages/TimelinePage.tsx`
- `src/styles/visual-polish-v2.css`

Ações:
- conectar visualmente décadas, escola e projetos;
- melhorar ritmo vertical;
- refinar tipografia, espaçamento e transições leves;
- manter `prefers-reduced-motion`.

## Estratégia técnica

Criar uma camada visual nova em `src/styles/visual-polish-v2.css` importada por último. Isso reduz o risco de regressão e permite rollback simples removendo uma única importação.

Mudanças de markup serão pequenas e apenas para suportar:
- elementos de identidade;
- linha do tempo visual;
- melhor hierarquia;
- estados visuais.

Nenhuma lógica central deverá depender dessa camada.

## QA obrigatório a cada etapa

Executar:
- `npm run validate:static`;
- `npm run typecheck`;
- `npm run build`;
- Deploy Preview do Netlify.

Conferência manual:
- 360px;
- 390px;
- 430px;
- desktop;
- Home;
- Mapa;
- Projetos;
- Passaporte;
- QR da entrada;
- pelo menos 3 QRs de projetos;
- progresso persistente após fechar/reabrir.

## Critério de congelamento

A partir da aprovação visual final:
- não alterar URLs;
- não alterar IDs;
- não adicionar novas funcionalidades;
- aceitar somente correções P0 de conteúdo, navegação, legibilidade ou quebra funcional.

## Status

- [x] Plano documentado
- [x] Etapa 1 — Fundação visual e Home — implementada, aguardando QA
- [x] Etapa 2 — Projetos e rotas — implementada, aguardando QA
- [x] Etapa 3 — Passaporte — implementada, aguardando QA
- [x] Etapa 4 — Mapa — implementada, aguardando QA
- [x] Etapa 5 — Timeline e acabamento — implementada, aguardando QA
- [ ] QA final
- [ ] Merge em `main`
