import type { RouteDefinition } from '../types'

export const routes: RouteDefinition[] = [
  {
    id: '40-minutos',
    title: 'Rota 40 minutos',
    subtitle: 'Uma seleção da feira em 7 paradas',
    description: 'Uma seleção de experiências que atravessa história, ciência, tecnologia, memória e esporte em diferentes espaços da escola.',
    icon: '⏱',
    estimatedTime: 'cerca de 40 min',
    projectIds: ['muro-berlim', 'cesio-137', 'evolucao-computador', 'revolucao-imunologica', 'inovamente', 'historia-escola', '40-anos-movimento']
  },
  {
    id: 'completa',
    title: 'Rota completa',
    subtitle: 'Conheça todos os 15 projetos',
    description: 'Visite todos os projetos em uma sequência organizada por blocos e espaços da escola.',
    icon: '🧭',
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
