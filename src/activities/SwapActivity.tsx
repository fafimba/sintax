import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SwapItem, SwapSlot, LessonRole } from '../types'
import { ROLE_STYLE } from '../components/GroupBox'
import { MorphText } from '../components/MorphText'
import { SwapIcon } from '../components/icons'

type Colored = Exclude<LessonRole, 'none'>

const SHAPE: Record<Colored, string> = {
  sujeto: 'shape-sujeto',
  predicado: 'shape-verb',
  verbo: 'shape-verb',
  cd: 'shape-cd',
  ci: 'shape-ci',
  atributo: 'shape-atributo',
  cc: 'shape-cc',
}

// Explorable libre: cada hueco cambia su palabra por otra que ENCAJA (curada a
// mano). El color, la forma y la etiqueta de la función NO cambian: cambia la
// palabra, no la estructura. La mutación se anima con MorphText.
export function SwapStage({ item }: { item: SwapItem }) {
  const [idxs, setIdxs] = useState<number[]>(() => item.slots.map(() => 0))
  const cycle = (i: number) =>
    setIdxs((prev) => prev.map((v, j) => (j === i ? (v + 1) % item.slots[i].alts.length : v)))

  return (
    <div className="swap">
      <p className="prompt tap-prompt">Cambia las palabras. ¿Cambia la estructura?</p>
      <div className="swap-sentence">
        {item.slots.map((slot, i) => (
          <SwapChip key={i} slot={slot} text={slot.alts[idxs[i]]} onCycle={() => cycle(i)} />
        ))}
      </div>
      <p className="creci-note">Cambia la palabra, no la función.</p>
    </div>
  )
}

function SwapChip({ slot, text, onCycle }: { slot: SwapSlot; text: string; onCycle: () => void }) {
  const st = ROLE_STYLE[slot.role as Colored]
  const swappable = slot.alts.length > 1
  return (
    <div className="swap-slot">
      {swappable ? (
        <button className="swap-refresh" onClick={onCycle} aria-label={`cambiar el ${st.label}`}>
          <SwapIcon />
        </button>
      ) : (
        <span className="swap-spacer" />
      )}
      <motion.div
        layout
        className={`box swap-box ${SHAPE[slot.role as Colored]}`}
        style={{ background: st.fill, color: st.text, borderColor: st.border }}
      >
        <MorphText text={text} />
      </motion.div>
      <span className="fnlabel" style={{ color: st.border }}>
        {st.label}
      </span>
    </div>
  )
}
