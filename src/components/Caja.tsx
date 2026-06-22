import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import type { Segment } from '../types'
import { fn, neutral, errorColor } from '../theme'

type State = 'neutral' | 'reveal-cd' | 'error'

const ROLE_LABEL: Record<string, string> = { cd: 'CD' }

// Primitiva reutilizable: un constituyente como caja.
// Nace neutra; se tiñe de verde + etiqueta "CD" al revelarse; rojo al fallar.
// forwardRef: AnimatePresence (mode="popLayout") necesita una ref en cada hijo
// directo para medirlo al animar la salida; sin ella, el layout se rompe.
export const Caja = forwardRef<
  HTMLDivElement,
  {
    seg: Segment
    state: State
    boxRef?: (el: HTMLElement | null) => void
  }
>(function Caja({ seg, state, boxRef }, ref) {
  const c = state === 'error' ? errorColor : state === 'reveal-cd' ? fn.cd : neutral
  const showFn = state === 'reveal-cd'

  return (
    <motion.div
      ref={ref}
      layout
      className="box-wrap"
      initial={false}
      exit={{ scale: 0, opacity: 0 }}
      animate={{ scale: state === 'error' ? [1, 1.06, 0.95, 1] : 1 }}
      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
    >
      <span className="cat" style={{ color: c.border }}>
        {seg.category ?? ''}
      </span>
      <motion.div
        ref={boxRef as never}
        className={`box ${state === 'reveal-cd' ? 'shape-cd' : ''}`}
        animate={{ backgroundColor: c.fill, color: c.text, borderColor: c.border }}
        transition={{ duration: 0.25 }}
      >
        {seg.text}
      </motion.div>
      <span className="fnlabel" style={{ color: c.border, opacity: showFn ? 1 : 0 }}>
        {showFn ? ROLE_LABEL[seg.role] ?? '' : ''}
      </span>
    </motion.div>
  )
})
