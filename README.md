# Feira 40 Anos — Passaporte Digital

Aplicação Web/PWA mobile-first da Feira do Conhecimento da E.E. Maria Luiza Miranda Bastos.

**Tema:** “40 Anos Conectando Histórias: O Mundo e Nossa Escola (1986–2026)”  
**Evento:** 26 de setembro, das 9h às 12h.

## Experiência pública

A aplicação foi desenhada para famílias e visitantes e oferece:

- 15 projetos da Feira do Conhecimento;
- mapa geral da escola e mapa de blocos/salas;
- rotas de visitação, incluindo a Rota 40 minutos;
- linha do tempo “Viagem no tempo”;
- Passaporte Digital com progresso salvo apenas no dispositivo;
- acesso direto aos projetos por QR Code;
- PWA com suporte a cache para melhorar o uso em conexão instável;
- interface responsiva e acessível para celular.

A identidade visual utiliza a marca oficial dos 40 anos da escola e suas cores principais.

## Proteção da interface pública

O projeto possui uma validação automática de conteúdo público. O build falha se textos de planejamento ou revisão — como “informação pendente”, “roteiro provisório” ou “a confirmar” — forem introduzidos nas telas do aplicativo.

Isso reduz o risco de observações internas de desenvolvimento chegarem ao site exibido às famílias.

## Rodar localmente

```bash
npm install
npm run dev
```

No Windows também é possível usar `INICIAR_APP_LOCAL.bat`.

## Validar e gerar build

```bash
npm run validate:static
npm run typecheck
npm run build
```

A saída de produção fica em `dist/`.

## Publicar no Netlify

O repositório inclui `netlify.toml` com:

- build command: `npm run build`;
- diretório publicado: `dist`;
- Node.js 22;
- fallback SPA para rotas diretas, como `/projeto/cesio-137`.

Como a validação pública faz parte de `npm run build`, o Netlify também executa o bloqueio de textos internos antes de publicar.

## QR Codes

O parâmetro `local` atualiza a referência de localização do visitante no Passaporte Digital.

Exemplos:

```text
https://SEU-DOMINIO/projeto/muro-de-berlim?local=sala-01
https://SEU-DOMINIO/projeto/cesio-137?local=sala-04
https://SEU-DOMINIO/projeto/historia-escola?local=sala-14
https://SEU-DOMINIO/projeto/40-anos-movimento?local=quadra-areia
```

A leitura do QR atualiza a localização; a confirmação de que o projeto foi visitado continua sendo feita pelo botão “Marcar como visitado”.

## Estrutura

```text
src/
  components/     componentes reutilizáveis
  context/        progresso e estado local
  data/           projetos, rotas, locais e informações do evento
  map/            mapas SVG interativos
  pages/          telas públicas
  services/       persistência local
  styles/         identidade visual e layout responsivo
  types/          contratos TypeScript
```

## Fontes do conteúdo

Os textos dos projetos foram estruturados a partir do documento da Feira do Conhecimento fornecido pela escola. Os documentos originais não são publicados no site.
