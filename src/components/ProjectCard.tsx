import { Link } from 'react-router-dom'
import type { Project } from '../types'

export function ProjectCard({
  project,
  visited = false,
  compact = false,
  showMapAction = false
}: {
  project: Project
  visited?: boolean
  compact?: boolean
  showMapAction?: boolean
}) {
  return (
    <article className={`project-tile project-tile--${project.blockId} ${showMapAction ? 'has-map-action' : ''}`}>
      <Link className={`project-card ${compact ? 'is-compact' : ''}`} to={`/projeto/${project.id}`}>
        <div className="project-card__topline">
          <span className="eyebrow">{project.blockLabel} · {project.roomLabel}</span>
          <span className={`status-dot ${visited ? 'is-done' : ''}`} aria-label={visited ? 'Visitado' : 'Não visitado'}>{visited ? '✓' : '○'}</span>
        </div>
        <div className="project-card__time">{project.timeAnchor}</div>
        <h3>{project.title}</h3>
        {!compact && <p>{project.shortSummary}</p>}
        <span className="project-card__class">{project.className}</span>
      </Link>

      {showMapAction && (
        <Link
          className="project-card__map-action"
          to={`/mapa?destino=${project.locationIds[0]}`}
          aria-label={`Ver ${project.roomLabel} no mapa`}
        >
          <span aria-hidden="true">⌖</span>
          <span>Ver no mapa</span>
          <span className="project-card__map-arrow" aria-hidden="true">→</span>
        </Link>
      )}
    </article>
  )
}
