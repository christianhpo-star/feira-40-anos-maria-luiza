# Decisões do projeto — MVP

## 1. Static-first

Não há backend, banco de dados ou autenticação no MVP. Projetos e rotas são dados estáticos. Progresso, rota ativa e localização atual ficam no `localStorage` do dispositivo.

## 2. Projeto ≠ localização

Um projeto pode ter mais de uma localização. Isso evita acoplar conteúdo à sala e resolve casos como “InovaMENTE” (Salas 12 e 16) e Química Forense (Sala 13 / Laboratório de Ciências).

## 3. Localização sem GPS

A posição atual é inferida a partir do QR Code. Um QR pode abrir:

`/projeto/cesio-137?local=sala-04`

O app salva `sala-04` como localização atual. Isso é mais confiável dentro da escola do que GPS e não exige sensores adicionais.

## 4. Mapas esquemáticos

Os materiais recebidos são referências de orientação, não plantas arquitetônicas. Por isso, o app usa dois SVGs complementares e não proporcionais:

- **Mapa geral:** preserva pátio, cantina/refeitório, quadra, quadra de areia e a ligação por escada mostrados no croqui inicial.
- **Blocos e salas:** segue o mapa de blocos mais recente: Bloco 1 (salas 1–6), Bloco 2 (7, 8, 9, 10, 11, 12 e 16), Bloco 3 (14, 15, 13 e 17), com passarela entre Blocos 1 e 2.
- O Portão de Entrada de pais/responsáveis é separado do Portão da Secretaria.
- Cantina = Refeitório.

## 5. Acessibilidade

A escola informou que não há elevador ou rampa e que as salas de aula ficam geralmente no 2º andar. O app não promete “rota acessível” onde ela não existe; em vez disso, exibe um aviso explícito de circulação. O pavimento exato de cada sala ainda precisa ser confirmado individualmente.

## 6. Rota 40 minutos

Ainda não há duração confirmada para as apresentações. A rota existe como composição editorial provisória de sete paradas. Ela deve ser cronometrada em um ensaio e recalibrada antes da impressão definitiva dos materiais.

## 7. Cápsula do Tempo

Nenhuma mensagem é enviada ou armazenada publicamente. O recurso fica conceitualmente pronto, mas desativado até existir decisão sobre moderação, privacidade e destino das respostas.


## Atualização de mapa — mapa de blocos

- A aplicação passou a usar dois mapas complementares, sem tentar forçar uma única planta arquitetônica.
- O mapa geral preserva pátio, cantina/refeitório, quadra, quadra de areia e a ligação entre prédios do croqui inicial.
- O mapa de blocos segue o mapeamento confirmado pela escola: Bloco 1 (1–6), Bloco 2 (7, 8, 9, 10, 11, 12 e 16), Bloco 3 (14, 15, 13 e 17), com passarela entre Blocos 1 e 2.
- O Portão de Entrada de pais/responsáveis é o ponto inicial do passaporte; o Portão da Secretaria é apresentado separadamente.
- Salas 09, 10 e 17 aparecem apenas como referência espacial, pois não há projeto da feira cadastrado nelas.
- As salas ficam geralmente no 2º andar; esse dado é tratado como referência geral, não como confirmação individual de cada sala.
- Cantina/Refeitório permanece como o mesmo espaço, com referência de 1º andar.
- Não há elevador nem rampa acessível, então a interface alerta sobre a limitação de circulação em vez de prometer uma rota acessível inexistente.
