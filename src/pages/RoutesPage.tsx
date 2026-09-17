import { Link } from 'react-router-dom'
import { PageHeader } from '../components/PageHeader'
import { RouteCard } from '../components/RouteCard'
import { routes } from '../data/routes'

export function RoutesPage() {
  return (
    <main id="conteudo" className="page">
      <PageHeader title="Escolha seu percurso" subtitle="Você pode mudar de rota a qualquer momento." backTo="/" />
      <section className="section-block">
        <h2 className="section-title">Percursos principais</h2>
        <div className="route-list">
          {routes.slice(0, 2).map((route) => <RouteCard key={route.id} route={route} />)}
        </div>
      </section>
      <section className="section-block">
        <h2 className="section-title">Rotas temáticas</h2>
        <div className="route-list">
          {routes.slice(2).map((route) => <RouteCard key={route.id} route={route} />)}
        </div>
      </section>
      <section className="feature-link-card">
        <div>
          <span className="eyebrow">Outra forma de explorar</span>
          <strong>Viagem no tempo</strong>
          <p>Conheça os projetos pelos acontecimentos e transformações que marcaram diferentes épocas.</p>
        </div>
        <Link className="button button--secondary" to="/tempo">Abrir linha do tempo</Link>
      </section>
    </main>
  )
}
