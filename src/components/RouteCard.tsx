import { Link } from 'react-router-dom'
import type { RouteDefinition } from '../types'

export function RouteCard({ route }: { route: RouteDefinition }) {
  return (
    <Link className="route-card" to={`/rotas/${route.id}`}>
      <span className="route-card__icon" aria-hidden="true">{route.icon}</span>
      <div>
        <div className="route-card__titleline">
          <h3>{route.title}</h3>
          {route.estimatedTime && <span className="chip">{route.estimatedTime}</span>}
        </div>
        <p>{route.subtitle}</p>
        {route.provisional && <span className="mini-note">Roteiro provisório</span>}
      </div>
      <span aria-hidden="true">›</span>
    </Link>
  )
}
