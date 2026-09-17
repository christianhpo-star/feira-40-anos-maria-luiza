import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ProgressBar } from '../components/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { projects } from '../data/projects'

export function PassportPage() {
  const { visited, resetProgress } = useProgress()
  const complete = visited.length === projects.length
  const next = projects.find((project) => !visited.includes(project.id))

  return (
    <main id="conteudo" className="page">
      <PageHeader title="Meu passaporte" subtitle="Seu progresso fica somente neste dispositivo." />
      <section className={complete ? 'passport-hero is-complete' : 'passport-hero'}>
        <span className="passport-number">{visited.length}</span>
        <div>
          <strong>de {projects.length} projetos</strong>
          <span>{complete ? 'Percurso completo!' : 'visitados até agora'}</span>
        </div>
      </section>
      <ProgressBar value={visited.length} total={projects.length} />

      {complete ? (
        <section className="completion-card">
          <span className="completion-card__icon" aria-hidden="true">✦</span>
          <h2>Você completou a Feira do Conhecimento.</h2>
          <p>Você percorreu 40 anos de histórias, ciência, transformação e conhecimento.</p>
          <Link className="button button--primary" to="/capsula">Conhecer a Cápsula do Tempo</Link>
        </section>
      ) : next ? (
        <Link className="button button--primary button--full" to={`/projeto/${next.id}`}>Continuar meu percurso →</Link>
      ) : null}

      <section className="passport-list">
        {projects.map((project, index) => (
          <Link to={`/projeto/${project.id}`} key={project.id} className={visited.includes(project.id) ? 'passport-row is-done' : 'passport-row'}>
            <span className="passport-row__number">{String(index + 1).padStart(2, '0')}</span>
            <span><strong>{project.roomLabel}</strong><small>{project.title}</small></span>
            <span>{visited.includes(project.id) ? '✓' : '○'}</span>
          </Link>
        ))}
      </section>

      {visited.length > 0 && <button className="text-button danger-link" onClick={() => window.confirm('Apagar todo o progresso deste dispositivo?') && resetProgress()}>Reiniciar meu passaporte</button>}
    </main>
  )
}
