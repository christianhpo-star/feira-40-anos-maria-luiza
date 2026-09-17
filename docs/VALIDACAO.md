# Validação realizada neste ambiente

## Concluído

- Validação de presença dos 15 projetos esperados: **OK**.
- Manifesto PWA: **OK**.
- Service worker, fallback SPA do Netlify/Cloudflare Pages, mapas e rotas: **presentes**.
- Novo mapa de blocos incorporado aos dados e componentes do aplicativo; a origem está documentada em `docs/reference/README.md`.
- Entrada de pais/responsáveis, Portão da Secretaria e passarela modelados: **OK**.
- Bloco 1 (1–6), Bloco 2 (7, 8, 9, 10, 11, 12, 16) e Bloco 3 (14, 15, 13, 17): **modelados**.
- Pátio, Cantina/Refeitório, quadra e quadra de areia preservados no mapa geral: **OK**.
- Referência geral de salas no 2º andar e Cantina/Refeitório no 1º andar: **registrada sem transformar em certeza individual**.
- Verificação sintática de 25 arquivos `.ts`/`.tsx` com o compilador TypeScript: **0 falhas sintáticas**.
- `npm run validate:static`: **OK**.

## Limitação do ambiente atual

A instalação dos pacotes NPM não foi concluída neste ambiente porque `npm install` excedeu o tempo disponível sem criar `node_modules`. Portanto, o `vite build` completo não foi executado aqui.

O projeto mantém as correções de configuração feitas após o erro do Netlify (`vite-env.d.ts`, `noEmit` e `netlify.toml`). No ambiente do Netlify/GitHub, execute:

```bash
npm install
npm run validate:static
npm run typecheck
npm run build
```
