import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { projectById } from '../data/projects'
import { timeline } from '../data/timeline'

export function TimelinePage() {
  return (
    <main id="conteudo" className="page">
      <PageHeader title="Viagem no tempo" subtitle="1986 → 2026 → futuro" backTo="/" />
      <section className="timeline-intro">
        <p>Explore a feira por marcos temporais. Alguns projetos atravessam várias décadas e aparecem em mais de um momento.</p>
      </section>
      <ol className="timeline">
        {timeline.map((item) => (
          <li key={`${item.period}-${item.label}`}>
            <div className="timeline__marker" aria-hidden="true" />
            <div className="timeline__content">
              <span className="timeline__period">{item.period}</span>
              <h2>{item.label}</h2>
              <div className="timeline__links">
                {item.projectIds.map((id) => {
                  const project = projectById[id]
                  return <Link key={id} to={`/projeto/${id}`}><span>{project.roomLabel}</span>{project.title}</Link>
                })}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </main>
  )
}
