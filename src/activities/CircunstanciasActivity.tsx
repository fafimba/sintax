import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { CircItem, LGroup } from '../types'
import { TwoLevelBox } from '../components/GroupBox'
import { Explora } from '../components/Explora'
import { fn } from '../theme'

// Explorable "circunstancias": enciende y apaga circunstancias y muévelas de
// sitio. Lo que enseña jugando: los CC son opcionales (la frase funciona sin
// ellos), acumulables (puede haber varios) y móviles (delante o detrás).
export function CircunstanciasStage({ item, onTouch }: { item: CircItem; onTouch?: () => void }) {
  const [active, setActive] = useState<string[]>([])
  const [front, setFront] = useState(false)

  const toggle = (id: string) => {
    setActive((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
    onTouch?.()
  }

  const extras: LGroup[] = active.map((id) => {
    const e = item.extras.find((x) => x.id === id)!
    return { id: e.id, role: 'cc', words: e.words }
  })
  const shown: LGroup[] = front ? [...extras, ...item.core] : [...item.core, ...extras]
  const allIds = shown.map((g) => g.id)

  const note =
    active.length === 0
      ? null
      : front
        ? 'Y se pueden *mover*: delante o detrás, la frase sigue funcionando. Esa movilidad delata al CC.'
        : active.length === 1
          ? 'La frase funcionaba sin ella; la circunstancia *añade* información.'
          : 'Puede haber *varias* a la vez: cada una responde a una pregunta distinta.'

  return (
    <Explora title="Enciende circunstancias y mira crecer la frase." note={note}>
      <div className="sentence-area">
        <div className="sentence wrap topalign">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((g) => (
              <motion.div
                key={g.id}
                layout
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              >
                <TwoLevelBox group={g} reveal={allIds} separated />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="circ-controls">
        <div className="circ-chips">
          {item.extras.map((e) => {
            const on = active.includes(e.id)
            return (
              <motion.button
                key={e.id}
                type="button"
                className={`circ-chip ${on ? 'is-on' : ''}`}
                onClick={() => toggle(e.id)}
                aria-pressed={on}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundColor: on ? fn.cc.fill : '#ffffff',
                  color: on ? fn.cc.text : '#5f5e5a',
                  borderColor: on ? fn.cc.border : '#dddbd2',
                }}
              >
                <span className="circ-chip-q">{e.q}</span>
                {e.words.map((w) => w.text).join(' ')}
              </motion.button>
            )
          })}
        </div>

        <AnimatePresence>
          {active.length > 0 && (
            <motion.button
              type="button"
              className="circ-move"
              onClick={() => setFront((f) => !f)}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              whileTap={{ scale: 0.95 }}
            >
              <MoveIcon />
              {front ? 'devuélvelas al final' : 'muévelas delante'}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </Explora>
  )
}

function MoveIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 8L3 12l4 4M17 8l4 4-4 4M3 12h18"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
