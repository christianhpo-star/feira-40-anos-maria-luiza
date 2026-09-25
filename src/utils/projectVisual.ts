import type { Project } from '../types'

export type ProjectVisualTone = 'heritage' | 'science' | 'tech' | 'movement'

export function getProjectVisualTone(project: Pick<Project, 'themes'>): ProjectVisualTone {
  const primary = project.themes[0]

  if (primary === 'historia-memoria') return 'heritage'
  if (primary === 'ciencia-saude') return 'science'
  if (primary === 'esporte-sociedade') return 'movement'
  return 'tech'
}

export const projectToneLabel: Record<ProjectVisualTone, string> = {
  heritage: 'História & memória',
  science: 'Ciência & saúde',
  tech: 'Tecnologia & futuro',
  movement: 'Esporte & sociedade'
}
