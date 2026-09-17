export function ProgressBar({ value, total, label }: { value: number; total: number; label?: string }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100)
  return (
    <div className="progress-wrap" aria-label={label ?? `${value} de ${total}`}>
      <div className="progress-meta">
        <span>{label ?? `${value} de ${total} projetos visitados`}</span>
        <strong>{percent}%</strong>
      </div>
      <div className="progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={value}>
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
