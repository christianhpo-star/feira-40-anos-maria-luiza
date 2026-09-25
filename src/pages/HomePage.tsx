import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ProgressBar } from '../components/ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { projects } from '../data/projects'
import { routeById } from '../data/routes'
import { siteInfo } from '../data/site'
import { locationById } from '../data/locations'

export function HomePage() {
  const { visited, activeRoute, setCurrentLocation } = useProgress()
  const location = useLocation()
  const active = activeRoute ? routeById[activeRoute] : null
  const qrLocation = new URLSearchParams(location.search).get('local')
  const qrLocationData = qrLocation ? locationById[qrLocation] : null

  useEffect(() => {
    if (qrLocationData) setCurrentLocation(qrLocationData.id)
  }, [qrLocationData, setCurrentLocation])

  return (
    <main id="conteudo" className="page home-page">
      <section className="hero">
        <div className="hero__brandrow">
          <img src="/images/logo-escola.png" alt="40 anos da E.E. Maria Luiza Miranda Bastos" />
          <span>{siteInfo.period}</span>
        </div>
        <div className="event-pill" aria-label={`${siteInfo.date}, ${siteInfo.time}`}>
          <span aria-hidden="true">◷</span>
          <strong>{siteInfo.date}</strong>
          <span>•</span>
          <span>{siteInfo.time}</span>
        </div>
        {qrLocationData && <div className="location-confirm" role="status">⌖ Você está em <strong>{qrLocationData.label}</strong></div>}
        <p className="kicker">{siteInfo.eventName}</p>
        <h1>Uma viagem por<br /><span>40 anos de histórias.</span></h1>
        <p className="hero__lead">Descubra os projetos, encontre as salas e acompanhe seu percurso pela escola.</p>
        <Link className="button button--primary button--large" to={active ? `/rotas/${active.id}` : '/rotas'}>
          {active ? 'Continuar meu percurso' : 'Começar meu percurso'} <span aria-hidden="true">→</span>
        </Link>
        {visited.length > 0 && <ProgressBar value={visited.length} total={projects.length} />}
      </section>

      {active && (
        <section className="active-route-card" aria-label="Rota ativa">
          <span className="eyebrow">Seu percurso</span>
          <strong>{active.title}</strong>
          <span>{active.projectIds.filter((id) => visited.includes(id)).length} de {active.projectIds.length} paradas concluídas</span>
        </section>
      )}

      <section className="quick-grid" aria-label="Acessos rápidos">
        <Link to="/mapa" className="quick-card"><span aria-hidden="true">⌖</span><strong>Ver mapa</strong><small>Blocos, salas e áreas da feira</small></Link>
        <Link to="/rotas" className="quick-card"><span aria-hidden="true">🧭</span><strong>Escolher rota</strong><small>40 minutos, completa ou temática</small></Link>
        <Link to="/projetos" className="quick-card"><span aria-hidden="true">▦</span><strong>Todos os projetos</strong><small>15 experiências para conhecer</small></Link>
        <Link to="/tempo" className="quick-card"><span aria-hidden="true">◷</span><strong>Viagem no tempo</strong><small>1986 → 2026 → futuro</small></Link>
      </section>

      <section className="story-card">
        <span className="eyebrow">40 anos conectando histórias</span>
        <h2>Passado, presente e futuro no mesmo percurso</h2>
        <p>A feira conecta a trajetória da escola a transformações históricas, científicas, culturais e tecnológicas do Brasil e do mundo.</p>
      </section>
    </main>
  )
}
