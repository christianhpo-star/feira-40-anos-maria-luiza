# Como abrir o Passaporte Digital localmente

Este é um projeto React/Vite. O arquivo `index.html` não deve ser aberto diretamente por duplo clique.

## Windows

Dê dois cliques em `INICIAR_APP_LOCAL.bat`.

Na primeira execução, o script instala as dependências, inicia o servidor de desenvolvimento e abre o endereço local no navegador.

## Terminal

```bash
npm install
npm run dev
```

Depois abra o endereço informado pelo Vite, normalmente `http://localhost:5173`.

## Produção

```bash
npm run build
```

O build executa primeiro a validação de conteúdo público e, se tudo estiver correto, gera a pasta `dist/` usada pelo Netlify.
