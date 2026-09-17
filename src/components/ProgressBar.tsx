export function ProgressBar({ value, total, label }: { value: number; total: number; label?: string }) {
  const percent = total === 0 ? 0 : Math.round((value / total) * 100)
  const text = label ?? `${value} de ${total} projetos visitados`

  return (
    <div className="progress-wrap">
      <div className="progress-meta">
        <span>{text}</span>
        <strong>{percent}%</strong>
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={text}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={value}
        aria-valuetext={`${percent}% concluído`}
      >
        <span style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
