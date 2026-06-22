import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CrecimientoItem } from '../types'
import { fn, elem } from '../theme'

// Explorable libre: añade/quita palabras a cada mitad y mira crecer o encoger
// el sujeto y el predicado. El color, la etiqueta y el pronombre del sujeto NO
// cambian con el tamaño: la FUNCIÓN no depende de la LONGITUD (el invariante).
export function CrecimientoStage({ item }: { item: CrecimientoItem }) {
  const { sujeto, predicado } = item
  const [sCount, setSCount] = useState(0)
  const [pCount, setPCount] = useState(0)

  const sWords = [sujeto.base, ...sujeto.adjuncts.slice(0, sCount)]
  const pWords = [predicado.base, ...predicado.adjuncts.slice(0, pCount)]

  return (
    <div className="creci">
      <p className="prompt tap-prompt">Añade o quita palabras a cada mitad.</p>

      <div className="creci-sentence">
        <Half
          words={sWords}
          fill={fn.sujeto.fill}
          text={fn.sujeto.text}
          border={fn.sujeto.border}
          label="Sujeto"
          tag={`= ${sujeto.pro}`}
        />
        <Half
          words={pWords}
          fill={elem.predicado.fill}
          text={elem.predicado.text}
          border={elem.predicado.border}
          label="Predicado"
        />
      </div>

      <div className="creci-controls">
        <Stepper
          color={fn.sujeto.border}
          label="Sujeto"
          count={sCount}
          max={sujeto.adjuncts.length}
          onLess={() => setSCount((c) => Math.max(0, c - 1))}
          onMore={() => setSCount((c) => Math.min(sujeto.adjuncts.length, c + 1))}
        />
        <Stepper
          color={elem.predicado.border}
          label="Predicado"
          count={pCount}
          max={predicado.adjuncts.length}
          onLess={() => setPCount((c) => Math.max(0, c - 1))}
          onMore={() => setPCount((c) => Math.min(predicado.adjuncts.length, c + 1))}
        />
      </div>

      <p className="creci-note">Cambia el tamaño, no la función.</p>
    </div>
  )
}

function Half({
  words,
  fill,
  text,
  border,
  label,
  tag,
}: {
  words: string[]
  fill: string
  text: string
  border: string
  label: string
  tag?: string
}) {
  return (
    <div className="pred-zone creci-zone" style={{ ['--pred-border' as string]: border }}>
      <motion.div className="pred-kids creci-kids" layout>
        <AnimatePresence initial={false} mode="popLayout">
          {words.map((w, i) => (
            <motion.span
              key={`${i}-${w}`}
              layout
              className="creci-word"
              style={{ background: fill, color: text }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 460, damping: 28 }}
            >
              {w}
            </motion.span>
          ))}
        </AnimatePresence>
      </motion.div>
      <div className="pred-bracket" />
      <span className="pred-label" style={{ color: border }}>
        {label}
        {tag && <span className="creci-tag"> {tag}</span>}
      </span>
    </div>
  )
}

function Stepper({
  color,
  label,
  count,
  max,
  onLess,
  onMore,
}: {
  color: string
  label: string
  count: number
  max: number
  onLess: () => void
  onMore: () => void
}) {
  return (
    <div className="creci-step">
      <span className="creci-step-label" style={{ color }}>
        {label}
      </span>
      <button className="nudge-btn" onClick={onLess} disabled={count === 0} aria-label={`quitar del ${label}`}>
        −
      </button>
      <button className="nudge-btn" onClick={onMore} disabled={count === max} aria-label={`añadir al ${label}`}>
        +
      </button>
    </div>
  )
}
