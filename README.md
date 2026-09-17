# Feira 40 Anos — Passaporte Digital

Web/PWA static-first para a Feira do Conhecimento da E.E. Maria Luiza Miranda Bastos.

**Tema:** “40 Anos Conectando Histórias: O Mundo e Nossa Escola (1986–2026)”

> **Importante:** nao abra `index.html` diretamente por duplo clique. Este e um projeto React/Vite. No Windows, use `INICIAR_APP_LOCAL.bat`, ou execute `npm install` e `npm run dev`.

## Estado do MVP

Implementado:

- 15 projetos extraídos do documento oficial fornecido;
- home mobile-first;
- busca e filtros de projetos;
- Rota 40 minutos (provisória), Rota completa e rotas temáticas;
- linha do tempo “Viagem no tempo”;
- passaporte com `localStorage` e barra de progresso;
- dois mapas SVG complementares: mapa geral dos espaços e mapa de blocos/salas;
- localização sem GPS por parâmetro de QR (`?local=`);
- PWA com `manifest.webmanifest` e service worker simples;
- fallback SPA para Cloudflare Pages (`public/_redirects`);
- área da Cápsula do Tempo sem envio público, aguardando política de moderação/privacidade.

## Informações confirmadas depois do croqui

- Bloco 1 = salas 01, 02, 03, 04, 05 e 06.
- Bloco 2 = salas 07, 08, 09, 10, 11, 12 e 16.
- Bloco 3 = salas 14, 15, 13 e 17.
- O Portão de Entrada de pais/responsáveis fica separado do Portão da Secretaria.
- Há uma passarela indicada entre os Blocos 1 e 2.
- A escada é uma ligação entre prédios no croqui geral.
- Não há elevador nem rampa acessível.
- As salas de aula ficam geralmente no 2º andar.
- Cantina e Refeitório são o mesmo espaço; a referência atual indica a cantina no 1º andar.
- Não há sentido preferencial de circulação definido.

## Pendências preservadas no app

1. Pavimento exato de cada sala individualmente (referência geral atual: 2º andar).
2. Localização exata do Laboratório de Ciências.
3. Se o projeto InovaMENTE exige visita às salas 12 e 16 ou se elas funcionam como uma única exposição.
4. Tempo real de cada apresentação.

Por isso, os mapas estão identificados como **esquemáticos e não proporcionais** e a Rota 40 minutos continua provisória. A distribuição confirmada dos blocos e salas está registrada em `docs/MAPEAMENTO_LOCALIZACOES.md`.

## Rodar localmente

```bash
npm install
npm run dev
```

## Validar e gerar build

```bash
npm run typecheck
npm run build
```

A saída fica em `dist/`.


## Publicar no Netlify

O projeto inclui `netlify.toml` com configuração pronta:

- build command: `npm run build`;
- diretório publicado: `dist`;
- Node.js 22;
- fallback SPA para rotas como `/projeto/cesio-137`.

Importante: publique a pasta do projeto, não abra `index.html` diretamente. O `index.html` é a entrada do Vite e depende do build.

## Publicar no Cloudflare Pages

1. Suba este projeto para um repositório GitHub.
2. No Cloudflare Pages, conecte o repositório.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Build output directory: `dist`.
6. Faça o deploy.

O arquivo `_redirects` permite abrir rotas diretas como `/projeto/cesio-137` sem erro 404.

## QR Codes

O app foi preparado para QR por sala. O parâmetro `local` atualiza a posição do visitante sem GPS.

Exemplos depois do domínio existir:

```text
https://SEU-DOMINIO/projeto/muro-berlim?local=sala-01
https://SEU-DOMINIO/projeto/cesio-137?local=sala-04
https://SEU-DOMINIO/projeto/historia-escola?local=sala-14
https://SEU-DOMINIO/projeto/40-anos-movimento?local=quadra-areia
```

Não marque o projeto automaticamente como visitado ao escanear. O QR atualiza a localização; o visitante confirma a visita no botão “Marcar como visitado”.

## Estrutura

```text
src/
  components/     componentes reutilizáveis
  context/        progresso e estado local
  data/           projetos, rotas, locais e linha do tempo
  map/            mapa SVG interativo
  pages/          telas
  services/       persistência local
  styles/         design system e layout
  types/          contratos TypeScript
```

## Fonte do conteúdo

As referências de origem são descritas em `docs/reference/README.md`. Os arquivos originais não são publicados neste repositório público.
