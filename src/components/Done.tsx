import { CheckIcon } from './icons'

export function Done({
  total,
  label,
  onRestart,
  onBack,
}: {
  total: number
  label: string
  onRestart: () => void
  onBack: () => void
}) {
  return (
    <div className="done-screen">
      <div className="done-check">
        <CheckIcon size={32} />
      </div>
      <h1>¡Lo tienes!</h1>
      <p>
        Has completado {total} {label}.
      </p>
      <div className="done-actions">
        <button className="btn-ghost" onClick={onRestart}>
          Otra vez
        </button>
        <button className="btn" onClick={onBack}>
          Volver al menú
        </button>
      </div>
    </div>
  )
}
