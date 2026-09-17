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
      <section className="notice notice--soft">
        <strong>Viagem no tempo</strong>
        <p>Prefere explorar por marcos históricos em vez de salas?</p>
        <a href="/tempo">Abrir linha do tempo →</a>
      </section>
    </main>
  )
}
