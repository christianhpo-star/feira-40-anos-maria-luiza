# Operação da Feira — checklist de véspera

## Prioridade

Não adicionar novas funcionalidades de alto risco no dia da feira. A partir deste ponto, priorizar correções de conteúdo, orientação, legibilidade e bugs críticos.

## QR principal

Depois de confirmar a URL pública de produção no Netlify, usar:

```
https://mlml2.netlify.app/?local=entrada-pais
```

Esse parâmetro faz o Passaporte registrar a entrada principal como localização inicial.

## QR por exposição

Formato:

```
https://mlml2.netlify.app/projeto/{ID_DO_PROJETO}?local={ID_DA_LOCALIZACAO}
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
- Bloco 1 · 1º andar: Laboratório de Química → Sala dos Professores → Vice-direção → Secretaria.
- O acesso ao 2º andar é por escadas.
- A escola não possui elevador ou rampa para esse pavimento.

Não atribuir andar específico a uma sala enquanto essa informação não estiver confirmada.

## Plano B

Manter na entrada:
- um mapa impresso simples;
- lista impressa de projetos por bloco/sala;
- URL curta da aplicação escrita abaixo do QR.

Assim, uma falha de câmera, internet ou QR não interrompe a visita.


## Modelo atual do mapa

A página de mapa possui dois modos:

1. **Mapa geral**
   - sub-abas **2º andar** e **1º andar**;
   - os três blocos usam o mesmo formato retangular e a mesma escala entre os pavimentos;
   - 2º andar: Bloco 1 salas 01–06; Bloco 2 salas 07–12 e 16; Bloco 3 salas 14, 15, 13 e 17;
   - 1º andar:
     - Bloco 1: Laboratório de Química → Sala dos Professores → Vice-direção → Secretaria;
     - Bloco 2: Cantina → Refeitório (com escada) → Xerox / Sala de Reunião;
     - Bloco 3: Biblioteca + Escada do Bloco 3.

2. **Salas de apresentação**
   - seleção dinâmica por Bloco 1, 2 ou 3;
   - mostra somente as salas usadas como referência de apresentação;
   - mantém os estados de exposição, visitado, localização atual e destino.

Não voltar a misturar 1º e 2º andar no mesmo desenho do Bloco 1.
