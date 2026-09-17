export type BlockId = 'bloco-01' | 'bloco-02' | 'bloco-03' | 'area-externa' | 'refeitorio'

export type ThemeId = 'historia-memoria' | 'ciencia-saude' | 'tecnologia-futuro' | 'esporte-sociedade'

export interface Project {
  id: string
  title: string
  className: string
  blockId: BlockId
  blockLabel: string
  roomLabel: string
  locationIds: string[]
  description: string
  shortSummary: string
  encounter: string
  themes: ThemeId[]
  timeAnchor: string
  pendingNote?: string
}

export interface Location {
  id: string
  label: string
  shortLabel: string
  description: string
  zone: 'west' | 'central' | 'right' | 'external' | 'connector' | 'unknown'
  floor?: string
  pending?: boolean
}

export interface RouteDefinition {
  id: string
  title: string
  subtitle: string
  description: string
  icon: string
  projectIds: string[]
  estimatedTime?: string
  provisional?: boolean
  theme?: ThemeId
}
