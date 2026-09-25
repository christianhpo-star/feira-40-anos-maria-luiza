# Operação da Feira — checklist de véspera

## Prioridade

Não adicionar novas funcionalidades de alto risco no dia da feira. A partir deste ponto, priorizar correções de conteúdo, orientação, legibilidade e bugs críticos.

## QR principal

Depois de confirmar a URL pública de produção no Netlify, usar:

```
{BASE_URL}/?local=entrada-pais
```

Esse parâmetro faz o Passaporte registrar a entrada principal como localização inicial.

## QR por exposição

Formato:

```
{BASE_URL}/projeto/{ID_DO_PROJETO}?local={ID_DA_LOCALIZACAO}
```

Exemplos de localização:

- `sala-01`
- `sala-04`
- `sala-14`
- `quadra-areia`
- `refeitorio-cantina`

A lista canônica de projetos está em `src/data/projects.ts`.

## Teste obrigatório antes de imprimir QRs

1. Abrir a URL de produção em um celular.
2. Testar Home, Mapa, Projetos e Passaporte.
3. Pesquisar uma sala e usar **Ver no mapa**.
4. Abrir um projeto e marcar/desmarcar como visitado.
5. Fechar e reabrir o navegador para confirmar persistência.
6. Escanear um QR de sala e confirmar **Você está aqui**.
7. Após uma primeira abertura com internet, testar navegação com conexão ruim ou modo avião.
8. Confirmar que nenhum texto interno, pendência ou placeholder aparece ao visitante.

## Orientação física publicada

- 1º andar: Cantina / Refeitório.
- 2º andar: salas de exposição.
- O acesso ao 2º andar é por escadas.
- A escola não possui elevador ou rampa para esse pavimento.

Não atribuir andar específico a uma sala enquanto essa informação não estiver confirmada.

## Plano B

Manter na entrada:
- um mapa impresso simples;
- lista impressa de projetos por bloco/sala;
- URL curta da aplicação escrita abaixo do QR.

Assim, uma falha de câmera, internet ou QR não interrompe a visita.
