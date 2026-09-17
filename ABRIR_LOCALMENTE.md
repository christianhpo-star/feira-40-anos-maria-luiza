# Como abrir o aplicativo no computador

O `index.html` deste projeto **nao e um HTML independente**. Ele e o ponto de entrada de uma aplicacao React/Vite e depende do servidor de desenvolvimento ou do build de producao.

## Windows - forma mais simples

1. Extraia o ZIP inteiro para uma pasta.
2. De dois cliques em `INICIAR_APP_LOCAL.bat`.
3. Na primeira vez, o script executa `npm install`.
4. Em seguida o navegador abre em `http://localhost:5173`.

> Requisito: Node.js 22 LTS instalado.

## Terminal

```bash
npm install
npm run dev
```

## Producao

O projeto foi desenhado para ser publicado no Cloudflare Pages. O Cloudflare executara o build e servira os arquivos corretos ao visitante; ninguem precisara rodar Node.js para acessar a feira.
