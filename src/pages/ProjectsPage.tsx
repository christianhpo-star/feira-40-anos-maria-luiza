import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { ProjectCard } from '../components/ProjectCard'
import { useProgress } from '../context/ProgressContext'
import { projects } from '../data/projects'

const filters = [
  ['todos', 'Todos'],
  ['bloco-01', 'Bloco 1'],
  ['bloco-02', 'Bloco 2'],
  ['bloco-03', 'Bloco 3'],
  ['area-externa', 'Área externa'],
  ['refeitorio', 'Refeitório']
] as const

export function ProjectsPage() {
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState('todos')
  const { visited } = useProgress()

  const filtered = useMemo(() => {
    const q = query.trim().toLocaleLowerCase('pt-BR')
    return projects.filter((project) => {
      const matchesQuery = !q || [project.title, project.className, project.roomLabel, project.blockLabel, project.shortSummary].some((value) => value.toLocaleLowerCase('pt-BR').includes(q))
      const matchesFilter = filter === 'todos' || project.blockId === filter
      return matchesQuery && matchesFilter
    })
  }, [query, filter])

  return (
    <main id="conteudo" className="page">
      <PageHeader title="Todos os projetos" subtitle="Pesquise por tema, turma, sala ou título." />
      <label className="search-box">
        <span aria-hidden="true">⌕</span>
        <span className="sr-only">Pesquisar projetos</span>
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex.: Sala 04, vacinas, informática..." autoComplete="off" />
      </label>
      <div className="filter-row" role="group" aria-label="Filtrar por bloco">
        {filters.map(([id, label]) => (
          <button type="button" key={id} aria-pressed={filter === id} className={filter === id ? 'filter-chip is-active' : 'filter-chip'} onClick={() => setFilter(id)}>{label}</button>
        ))}
      </div>
      <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}</p>
      <section className="project-list">
        {filtered.length > 0 ? filtered.map((project) => (
          <div className="project-result" key={project.id}>
            <ProjectCard project={project} visited={visited.includes(project.id)} />
            <Link className="project-map-link" to={`/mapa?destino=${project.locationIds[0]}`} aria-label={`Ver ${project.roomLabel} no mapa`}>
              <span aria-hidden="true">⌖</span> Ver no mapa
            </Link>
          </div>
        )) : (
          <div className="empty-state" role="status">
            <strong>Nenhum projeto encontrado.</strong>
            <span>Tente outro termo ou volte para a lista completa.</span>
            <button type="button" className="text-button" onClick={() => { setQuery(''); setFilter('todos') }}>Limpar busca</button>
          </div>
        )}
      </section>
    </main>
  )
}
