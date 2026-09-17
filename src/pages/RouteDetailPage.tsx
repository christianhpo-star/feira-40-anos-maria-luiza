import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { ProgressBar } from '../components/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { projectById } from '../data/projects'
import { routeById } from '../data/routes'

export function RouteDetailPage() {
  const { routeId } = useParams()
  const route = routeId ? routeById[routeId] : undefined
  const { visited, activeRoute, setActiveRoute } = useProgress()

  if (!route) return <main id="conteudo" className="page"><PageHeader title="Rota não encontrada" backTo="/rotas" /></main>

  const routeProjects = route.projectIds.map((id) => projectById[id]).filter(Boolean)
  const done = route.projectIds.filter((id) => visited.includes(id)).length
  const next = routeProjects.find((project) => !visited.includes(project.id))
  const complete = done === route.projectIds.length

  return (
    <main id="conteudo" className="page">
      <PageHeader title={route.title} subtitle={route.subtitle} backTo="/rotas" />
      <section className="route-hero-card">
        <span className="route-hero-card__icon" aria-hidden="true">{route.icon}</span>
        <div>
          <p>{route.description}</p>
          <div className="chip-row">
            <span className="chip">{route.projectIds.length} paradas</span>
            {route.estimatedTime && <span className="chip">{route.estimatedTime}</span>}
          </div>
        </div>
      </section>

      <ProgressBar value={done} total={route.projectIds.length} label={`${done} de ${route.projectIds.length} paradas concluídas`} />

      <div className="action-row">
        <button className={activeRoute === route.id ? 'button button--done' : 'button button--primary'} onClick={() => setActiveRoute(route.id)}>
          {activeRoute === route.id ? '✓ Rota selecionada' : 'Usar esta rota'}
        </button>
        {complete ? (
          <Link className="button button--secondary" to="/passaporte">Ver meu passaporte</Link>
        ) : next ? (
          <Link className="button button--secondary" to={`/projeto/${next.id}`}>Ir para próxima parada</Link>
        ) : null}
      </div>

      <section className="section-block">
        <h2 className="section-title">Sequência sugerida</h2>
        <ol className="route-steps">
          {routeProjects.map((project, index) => (
            <li key={project.id}>
              <span className="route-step__number">{index + 1}</span>
              <ProjectCard project={project} visited={visited.includes(project.id)} compact />
            </li>
          ))}
        </ol>
      </section>
    </main>
  )
}
