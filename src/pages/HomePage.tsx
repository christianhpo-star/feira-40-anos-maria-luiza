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
          <div className="hero__identity">
            <span className="hero__passport-label">Passaporte digital</span>
            <span className="hero__period">{siteInfo.period}</span>
          </div>
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
        <p className="hero__theme">{siteInfo.theme}</p>
        <div className="era-track" aria-label="1986 a 2026 e futuro">
          <span><strong>1986</strong><small>memória</small></span>
          <i aria-hidden="true" />
          <span><strong>2026</strong><small>celebração</small></span>
          <i aria-hidden="true" />
          <span><strong>Futuro</strong><small>possibilidades</small></span>
        </div>
        <p className="hero__lead">Descubra os projetos, encontre as salas e acompanhe seu percurso pela escola.</p>
        <div className="hero__actions">
          <Link className="button button--primary button--large" to={active ? `/rotas/${active.id}` : '/rotas'}>
            {active ? 'Continuar meu percurso' : 'Começar meu percurso'} <span aria-hidden="true">→</span>
          </Link>
          <Link className="button button--secondary button--large hero__map-button" to="/mapa">
            <span aria-hidden="true">⌖</span> Ver mapa da feira
          </Link>
        </div>
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
        <Link to="/mapa" className="quick-card quick-card--map"><span className="quick-card__icon" aria-hidden="true">⌖</span><strong>Ver mapa</strong><small>Blocos, salas e áreas da feira</small></Link>
        <Link to="/rotas" className="quick-card quick-card--route"><span className="quick-card__icon" aria-hidden="true">🧭</span><strong>Escolher rota</strong><small>Percursos completos ou por tema</small></Link>
        <Link to="/projetos" className="quick-card quick-card--projects"><span className="quick-card__icon" aria-hidden="true">▦</span><strong>Todos os projetos</strong><small>15 experiências para conhecer</small></Link>
        <Link to="/tempo" className="quick-card quick-card--time"><span className="quick-card__icon" aria-hidden="true">◷</span><strong>Viagem no tempo</strong><small>1986 → 2026 → futuro</small></Link>
      </section>

      <section className="story-card story-card--celebration">
        <span className="eyebrow">40 anos conectando histórias</span>
        <h2>Passado, presente e futuro no mesmo percurso</h2>
        <p>A feira conecta a trajetória da escola a transformações históricas, científicas, culturais e tecnológicas do Brasil e do mundo.</p>
        <div className="story-card__marks" aria-hidden="true"><span>1986</span><i /><span>2026</span><i /><span>∞</span></div>
      </section>
    </main>
  )
}
