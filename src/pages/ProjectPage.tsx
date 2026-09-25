import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { projectById } from '../data/projects'
import { locationById } from '../data/locations'
import { routeById } from '../data/routes'
import { getProjectVisualTone, projectToneLabel } from '../utils/projectVisual'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = projectId ? projectById[projectId] : undefined
  const location = useLocation()
  const { visited, activeRoute, toggleVisited, setCurrentLocation } = useProgress()
  const [visitFeedback, setVisitFeedback] = useState('')

  const qrLocation = new URLSearchParams(location.search).get('local')
  useEffect(() => {
    if (qrLocation && locationById[qrLocation]) setCurrentLocation(qrLocation)
  }, [qrLocation, setCurrentLocation])

  if (!project) return <main id="conteudo" className="page"><PageHeader title="Projeto não encontrado" backTo="/projetos" /></main>

  const isVisited = visited.includes(project.id)
  const tone = getProjectVisualTone(project)
  const route = activeRoute ? routeById[activeRoute] : null
  const currentIndex = route?.projectIds.indexOf(project.id) ?? -1
  const projectIsInRoute = Boolean(route && currentIndex >= 0)
  const nextId = projectIsInRoute && route ? route.projectIds[currentIndex + 1] : null
  const nextProject = nextId ? projectById[nextId] : null
  const backTo = projectIsInRoute && route ? `/rotas/${route.id}` : '/projetos'

  const handleVisited = () => {
    const willMarkVisited = !isVisited
    toggleVisited(project.id)
    setVisitFeedback(willMarkVisited ? '✓ Projeto adicionado ao seu passaporte.' : 'Projeto removido do seu passaporte.')
  }

  return (
    <main id="conteudo" className={`page project-detail project-tone--${tone}`}>
      <PageHeader title={project.roomLabel} subtitle={project.blockLabel} backTo={backTo} />

      {qrLocation && locationById[qrLocation] && (
        <div className="location-confirm" role="status">⌖ Você está em <strong>{locationById[qrLocation].label}</strong></div>
      )}

      <section className="project-title-card project-title-card--poster">
        <div className="project-title-card__poster-head">
          <span className="project-title-card__theme">{projectToneLabel[tone]}</span>
          <span className="project-title-card__years">{project.timeAnchor}</span>
        </div>
        <div className="project-title-card__poster-mark" aria-hidden="true">40</div>
        <span className="eyebrow">{project.className}</span>
        <h2>{project.title}</h2>
        <p>{project.shortSummary}</p>
        <div className="project-title-card__footerline" aria-hidden="true">
          <span>1986</span><i /><span>2026</span><i /><span>Futuro</span>
        </div>
      </section>

      <section className="info-panel">
        <div><span>Local</span><strong>{project.blockLabel}<br />{project.roomLabel}</strong></div>
        <div><span>Turma</span><strong>{project.className}</strong></div>
      </section>

      <section className="content-card">
        <span className="eyebrow">O que você vai encontrar</span>
        <p className="encounter-text">{project.encounter}</p>
      </section>

      <div className="action-stack">
        <Link className="button button--secondary button--large" to={`/mapa?destino=${project.locationIds[0]}`}>⌖ Como chegar</Link>
        <button
          className={`button button--large ${isVisited ? 'button--done' : 'button--primary'}`}
          onClick={handleVisited}
          aria-pressed={isVisited}
        >
          {isVisited ? '✓ Projeto visitado' : 'Marcar como visitado'}
        </button>
        {visitFeedback && <div className="visit-feedback" role="status" aria-live="polite">{visitFeedback}</div>}
      </div>

      <details className="details-card">
        <summary>Saiba mais sobre o projeto</summary>
        <p>{project.description}</p>
      </details>

      {projectIsInRoute && route && (
        <section className="next-stop">
          <span className="eyebrow">{route.title}</span>
          {nextProject ? (
            <>
              <strong>Próxima parada: {nextProject.roomLabel}</strong>
              <span>{nextProject.title}</span>
              <Link to={`/projeto/${nextProject.id}`}>Continuar →</Link>
            </>
          ) : (
            <>
              <strong>Você chegou ao fim desta rota.</strong>
              <Link to="/passaporte">Ver meu passaporte →</Link>
            </>
          )}
        </section>
      )}
    </main>
  )
}
