import { Link } from 'react-router-dom'

export function PageHeader({ title, subtitle, backTo }: { title: string; subtitle?: string; backTo?: string }) {
  return (
    <header className="page-header">
      <div className="page-header__row">
        {backTo ? <Link className="icon-button" to={backTo} aria-label="Voltar">←</Link> : <div className="brand-dot" aria-hidden="true">40</div>}
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}
