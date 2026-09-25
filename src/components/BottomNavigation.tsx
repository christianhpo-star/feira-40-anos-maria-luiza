import { NavLink } from 'react-router-dom'

const items = [
  { to: '/', label: 'Início', icon: '⌂', end: true },
  { to: '/mapa', label: 'Mapa', icon: '⌖' },
  { to: '/projetos', label: 'Projetos', icon: '▦' },
  { to: '/passaporte', label: 'Passaporte', icon: '✓' }
]

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => {
            if (item.to === '/') {
              window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
            }
          }}
          className={({ isActive }) => isActive ? 'bottom-nav__item is-active' : 'bottom-nav__item'}
        >
          <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
