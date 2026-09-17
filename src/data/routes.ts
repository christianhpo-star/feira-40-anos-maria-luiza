import type { RouteDefinition } from '../types'

export const routes: RouteDefinition[] = [
  {
    id: '40-minutos',
    title: 'Rota 40 minutos',
    subtitle: 'Uma amostra da feira em 7 paradas',
    description: 'Seleção provisória que parte da entrada dos pais, percorre os blocos em sequência e termina na área externa. O tempo será recalibrado quando a duração real das apresentações for confirmada.',
    icon: '⏱',
    estimatedTime: '≈ 40 min',
    provisional: true,
    projectIds: ['muro-berlim', 'cesio-137', 'evolucao-computador', 'revolucao-imunologica', 'inovamente', 'historia-escola', '40-anos-movimento']
  },
  {
    id: 'completa',
    title: 'Rota completa',
    subtitle: 'Conheça todos os 15 projetos',
    description: 'Percurso organizado por blocos: Bloco 1, passagem para o Bloco 2, Refeitório/Cantina, Bloco 3 e área externa. As salas ficam geralmente no 2º andar; o pavimento exato de cada sala ainda será confirmado.',
    icon: '🧭',
    provisional: true,
    projectIds: ['muro-berlim', 'math-infection', 'analogico-algoritmo', 'cesio-137', 'navegando-conhecimento', 'evolucao-computador', 'revolucao-imunologica', 'analogico-digital', 'genoma-hiv', 'inovamente', 'senai-maria-luiza', 'historia-escola', 'futuro-movimento', 'quimica-forense', '40-anos-movimento']
  },
  {
    id: 'historia-memoria',
    title: 'História e memória',
    subtitle: 'Passado, escola e sociedade',
    description: 'Projetos que ajudam a compreender mudanças históricas, memórias da escola e transformações sociais.',
    icon: '◷',
    theme: 'historia-memoria',
    projectIds: ['muro-berlim', 'analogico-algoritmo', 'navegando-conhecimento', 'historia-escola', '40-anos-movimento']
  },
  {
    id: 'ciencia-saude',
    title: 'Ciência e saúde',
    subtitle: 'Descobertas, crises e evidências',
    description: 'Vacinas, epidemias, radioatividade, HIV e Química Forense em experiências de investigação científica.',
    icon: '⚗',
    theme: 'ciencia-saude',
    projectIds: ['math-infection', 'cesio-137', 'navegando-conhecimento', 'revolucao-imunologica', 'genoma-hiv', 'quimica-forense']
  },
  {
    id: 'tecnologia-futuro',
    title: 'Tecnologia e futuro',
    subtitle: 'Do analógico à Inteligência Artificial',
    description: 'Computação, audiovisual, automação, IA e formação técnica em uma rota sobre transformação tecnológica.',
    icon: '⌁',
    theme: 'tecnologia-futuro',
    projectIds: ['analogico-algoritmo', 'evolucao-computador', 'analogico-digital', 'inovamente', 'futuro-movimento', 'senai-maria-luiza']
  }
]

export const routeById = Object.fromEntries(routes.map((route) => [route.id, route])) as Record<string, RouteDefinition>
