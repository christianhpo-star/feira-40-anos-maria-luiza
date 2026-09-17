import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { projectById } from '../data/projects'
import { locationById } from '../data/locations'
import { routeById } from '../data/routes'

export function ProjectPage() {
  const { projectId } = useParams()
  const project = projectId ? projectById[projectId] : undefined
  const location = useLocation()
  const { visited, activeRoute, toggleVisited, setCurrentLocation } = useProgress()

  const qrLocation = new URLSearchParams(location.search).get('local')
  useEffect(() => {
    if (qrLocation && locationById[qrLocation]) setCurrentLocation(qrLocation)
  }, [qrLocation, setCurrentLocation])

  if (!project) return <main id="conteudo" className="page"><PageHeader title="Projeto não encontrado" backTo="/projetos" /></main>

  const isVisited = visited.includes(project.id)
  const route = activeRoute ? routeById[activeRoute] : null
  const currentIndex = route?.projectIds.indexOf(project.id) ?? -1
  const nextId = route && currentIndex >= 0 ? route.projectIds[currentIndex + 1] : null
  const nextProject = nextId ? projectById[nextId] : null
  const primaryLocation = locationById[project.locationIds[0]]

  return (
    <main id="conteudo" className="page project-detail">
      <PageHeader title={project.roomLabel} subtitle={project.blockLabel} backTo="/projetos" />

      {qrLocation && locationById[qrLocation] && (
        <div className="location-confirm" role="status">⌖ Localização atualizada: <strong>{locationById[qrLocation].label}</strong></div>
      )}

      <section className="project-title-card">
        <span className="eyebrow">{project.className}</span>
        <h2>{project.title}</h2>
        <p>{project.shortSummary}</p>
      </section>

      <section className="info-panel info-panel--three">
        <div><span>Local</span><strong>{project.blockLabel}<br />{project.roomLabel}</strong></div>
        <div><span>Pavimento</span><strong>{primaryLocation?.floor ?? 'A confirmar'}</strong></div>
        <div><span>Duração</span><strong>A confirmar</strong></div>
      </section>

      <section className="content-card">
        <span className="eyebrow">O que você vai encontrar</span>
        <p className="encounter-text">{project.encounter}</p>
      </section>

      {project.pendingNote && <section className="notice"><strong>Informação pendente</strong><p>{project.pendingNote}</p></section>}

      <div className="action-stack">
        <Link className="button button--secondary button--large" to={`/mapa?destino=${project.locationIds[0]}`}>⌖ Como chegar</Link>
        <button className={`button button--large ${isVisited ? 'button--done' : 'button--primary'}`} onClick={() => toggleVisited(project.id)}>
          {isVisited ? '✓ Projeto visitado' : 'Marcar como visitado'}
        </button>
      </div>

      <details className="details-card">
        <summary>Saiba mais</summary>
        <p>{project.description}</p>
      </details>

      {route && (
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
              <strong>Fim desta rota</strong>
              <Link to="/passaporte">Ver meu passaporte →</Link>
            </>
          )}
        </section>
      )}
    </main>
  )
}
