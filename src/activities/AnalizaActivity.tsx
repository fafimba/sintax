import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { AnalizaItem } from '../types'
import { TwoLevelBox } from '../components/GroupBox'
import { RichText } from '../components/RichText'
import { CheckIcon } from '../components/icons'

// Reto "análisis completo": la frase se queda en pantalla y el alumno toca
// cada función en orden (sujeto -> verbo -> complementos). Lo acertado queda
// revelado y etiquetado: el análisis se construye de forma acumulativa.
// Ronda de varias frases con puntos de progreso (mismo patrón que frontera).
export function AnalizaStage({ items, onNext }: { items: AnalizaItem[]; onNext: () => void }) {
  const [idx, setIdx] = useState(0)
  const next = useCallback(() => {
    setIdx((n) => {
      if (n < items.length - 1) return n + 1
      onNext()
      return n
    })
  }, [items.length, onNext])

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      {items.length > 1 && (
        <div className="frontera-dots">
          {items.map((_, i) => (
            <span key={i} className={`fdot ${i < idx ? 'done' : i === idx ? 'current' : ''}`} />
          ))}
        </div>
      )}
      <AnalizaOne key={idx} item={items[idx]} onSolved={next} />
    </motion.div>
  )
}

function AnalizaOne({ item, onSolved }: { item: AnalizaItem; onSolved: () => void }) {
  const [step, setStep] = useState(0)
  const [wrongId, setWrongId] = useState<string | null>(null)
  const [teach, setTeach] = useState<string | null>(null)
  const done = step >= item.steps.length
  // Lo ya acertado se deriva del paso: esos grupos quedan revelados.
  const revealed = item.steps.slice(0, step).map((s) => s.target)
  const current = item.steps[step]

  const tap = (id: string) => {
    if (done || revealed.includes(id)) return
    if (id === current.target) {
      setTeach(current.teach)
      const last = step === item.steps.length - 1
      setStep((s) => s + 1)
      if (last) window.setTimeout(onSolved, 1600)
    } else {
      setWrongId(id)
      window.setTimeout(() => setWrongId(null), 450)
    }
  }

  return (
    <>
      <div className="analiza-prompt-slot">
        <AnimatePresence mode="wait">
          <motion.p
            key={done ? 'done' : `p${step}`}
            className="prompt tap-prompt"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {done ? '¡Frase analizada!' : <RichText text={current.prompt} />}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="sentence-area">
        <div className="sentence wrap topalign">
          {item.groups.map((g) => (
            <TwoLevelBox
              key={g.id}
              group={g}
              reveal={revealed}
              separated
              onTap={done ? undefined : tap}
              solvedId={null}
              wrongId={wrongId}
            />
          ))}
        </div>
      </div>

      <div className="tap-feedback">
        <AnimatePresence mode="wait">
          {teach && (
            <motion.span
              key={teach}
              className="fb-ok"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <CheckIcon />
              <RichText text={teach} />
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
