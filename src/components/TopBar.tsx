import { motion } from 'framer-motion'
import { BackIcon } from './icons'

export function TopBar({ onBack, progress }: { onBack: () => void; progress: number }) {
  return (
    <header className="topbar">
      <button className="back" onClick={onBack} aria-label="Volver al menú">
        <BackIcon />
      </button>
      <div className="progress">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(1, Math.max(0, progress)) * 100}%` }}
          transition={{ type: 'spring', stiffness: 200, damping: 26 }}
        />
      </div>
    </header>
  )
}
