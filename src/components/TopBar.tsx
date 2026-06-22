import { motion } from 'framer-motion'
import { BackIcon } from './icons'

// progress -> barra de score (modo reto). counter -> "1 / 3" (modo explora).
export function TopBar({
  onBack,
  progress,
  counter,
}: {
  onBack: () => void
  progress?: number
  counter?: string
}) {
  return (
    <header className="topbar">
      <button className="back" onClick={onBack} aria-label="Volver al menú">
        <BackIcon />
      </button>
      {progress !== undefined ? (
        <div className="progress">
          <motion.div
            className="progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(1, Math.max(0, progress)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 26 }}
          />
        </div>
      ) : (
        <div className="topbar-spacer" />
      )}
      {counter && <span className="counter">{counter}</span>}
    </header>
  )
}
