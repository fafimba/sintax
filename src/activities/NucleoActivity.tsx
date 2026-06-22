import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { NucleoItem } from '../types'
import { NUCLEOS } from '../data/nucleos'
import { TopBar } from '../components/TopBar'
import { Done } from '../components/Done'
import { CheckIcon } from '../components/icons'
import { fn, neutral, errorColor } from '../theme'

type Phase = 'idle' | 'done'

function NucleoStage({ item, onNext }: { item: NucleoItem; onNext: () => void }) {
  const nucleus = item.chips.find((c) => c.isNucleus)!
  const [present, setPresent] = useState<string[]>(item.chips.map((c) => c.id))
  const [shakeId, setShakeId] = useState<string | null>(null)
  const [phase, setPhase] = useState<Phase>('idle')

  const tap = (id: string) => {
    if (phase === 'done') return
    const chip = item.chips.find((c) => c.id === id)!
    if (chip.isNucleus) {
      setShakeId(id)
      window.setTimeout(() => setShakeId(null), 700)
      return
    }
    setPresent((prev) => prev.filter((p) => p !== id))
  }

  // Cuando solo queda el núcleo, se completa.
  useEffect(() => {
    if (phase === 'idle' && present.length === 1 && present[0] === nucleus.id) {
      const t = window.setTimeout(() => setPhase('done'), 260)
      return () => window.clearTimeout(t)
    }
  }, [present, phase, nucleus.id])

  const nucleusShaking = shakeId === nucleus.id

  return (
    <motion.div
      className="stage"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="prompt">Quita lo que sobra. ¿Qué palabra no se puede borrar?</p>
      <p className="subprompt">Toca las palabras para eliminarlas. El núcleo es lo único que queda en pie.</p>

      <div className="sentence-area">
        <motion.div
          layout
          className="sn-box"
          animate={nucleusShaking ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }}
          transition={nucleusShaking ? { duration: 0.4 } : { duration: 0.2 }}
        >
          <span
            className="cat sn-cat"
            style={{ color: phase === 'done' ? fn.cd.border : neutral.border }}
          >
            SN
          </span>
          <div className="chips">
            <AnimatePresence mode="popLayout">
              {item.chips
                .filter((c) => present.includes(c.id))
                .map((c) => {
                  const isNuc = c.isNucleus
                  const done = phase === 'done' && isNuc
                  const errored = shakeId === c.id
                  const bg = errored ? errorColor.fill : done ? fn.cd.fill : '#ffffff'
                  const fg = errored ? errorColor.text : done ? fn.cd.text : '#2c2c2a'
                  const bd = errored ? errorColor.border : done ? fn.cd.border : '#d3d1c7'
                  return (
                    <motion.button
                      key={c.id}
                      layout
                      type="button"
                      className="chip"
                      onClick={() => tap(c.id)}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1, backgroundColor: bg, color: fg, borderColor: bd }}
                      exit={{ scale: 0.2, opacity: 0, y: -28 }}
                      transition={{ type: 'spring', stiffness: 420, damping: 26 }}
                      whileHover={phase === 'idle' ? { scale: 1.06 } : undefined}
                      whileTap={phase === 'idle' ? { scale: 0.94 } : undefined}
                    >
                      {c.text}
                    </motion.button>
                  )
                })}
            </AnimatePresence>
          </div>
          {phase === 'done' && (
            <motion.span
              className="nuc-label"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ color: fn.cd.border }}
            >
              núcleo
            </motion.span>
          )}
        </motion.div>
      </div>

      <div className="feedback">
        {nucleusShaking && (
          <span className="fb-error">sin núcleo no hay sintagma — esa no se puede quitar</span>
        )}
        {phase === 'done' && (
          <motion.div className="fb-done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <span className="fb-ok">
              <CheckIcon />«{nucleus.text}» es el núcleo: la palabra obligatoria
            </span>
            <button className="btn" onClick={onNext}>
              Continuar
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export function NucleoActivity({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const item = NUCLEOS[idx]
  return (
    <>
      <TopBar onBack={onBack} progress={idx / NUCLEOS.length} />
      {item ? (
        <NucleoStage key={item.id} item={item} onNext={() => setIdx((i) => i + 1)} />
      ) : (
        <Done total={NUCLEOS.length} label="sintagmas" onRestart={() => setIdx(0)} onBack={onBack} />
      )}
    </>
  )
}
