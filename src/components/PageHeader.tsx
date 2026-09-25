import { Link } from 'react-router-dom'

export function PageHeader({ title, subtitle, backTo }: { title: string; subtitle?: string; backTo?: string }) {
  return (
    <header className="page-header">
      <div className="page-header__row">
        {backTo ? (
          <Link className="icon-button" to={backTo} aria-label="Voltar">←</Link>
        ) : (
          <img className="header-logo" src="/images/logo-escola.png?v=20260925-4" alt="" aria-hidden="true" />
        )}
        <div className="page-header__text">
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
