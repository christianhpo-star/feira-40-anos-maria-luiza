import { Link } from 'react-router-dom'
import type { Project } from '../types'

export function ProjectCard({ project, visited = false, compact = false }: { project: Project; visited?: boolean; compact?: boolean }) {
  return (
    <Link className={`project-card ${compact ? 'is-compact' : ''}`} to={`/projeto/${project.id}`}>
      <div className="project-card__topline">
        <span className="eyebrow">{project.blockLabel} · {project.roomLabel}</span>
        <span className={`status-dot ${visited ? 'is-done' : ''}`} aria-label={visited ? 'Visitado' : 'Não visitado'}>{visited ? '✓' : '○'}</span>
      </div>
      <h3>{project.title}</h3>
      {!compact && <p>{project.shortSummary}</p>}
      <span className="project-card__class">{project.className}</span>
    </Link>
  )
}
