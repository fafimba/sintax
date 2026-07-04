import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RichText } from './RichText'

// Marco común de TODOS los explorables: mismo lenguaje visual en todo el
// camino. Un distintivo arriba («para jugar»: aquí no se falla), la consigna,
// el área de juego y una ranura de nota que reacciona a lo que haces.
export function Explora({
  title,
  children,
  note,
}: {
  title: string
  children: ReactNode
  /** Observación que aparece/cambia según lo que el usuario toca. */
  note?: string | null
}) {
  return (
    <div className="explora-frame">
      <div className="explora-head">
        <span className="explora-kicker">
          <PlayDot /> para jugar
        </span>
        <p className="explora-title">
          <RichText text={title} />
        </p>
      </div>

      <div className="explora-body">{children}</div>

      <div className="nota-slot">
        <AnimatePresence mode="wait">
          {note && (
            <motion.p
              key={note}
              className="nota"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <RichText text={note} />
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function PlayDot() {
  return (
    <motion.span
      className="explora-dot"
      animate={{ scale: [1, 1.25, 1] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
    />
  )
}
