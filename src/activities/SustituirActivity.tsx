import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { SustituirItem, LGroup } from '../types'
import { TwoLevelBox, ROLE_STYLE } from '../components/GroupBox'
import { Explora } from '../components/Explora'
import { SegToggle } from '../components/SegToggle'

type Colored = Exclude<LGroup['role'], 'none'>

// Explorable "sustituir": el constituyente entero <-> su pronombre, con un
// interruptor reversible. Al activar el pronombre, la pieza colapsa y el
// pronombre aparece DELANTE del verbo, pero conserva corchete y rótulo:
// cambia la forma, no la función. Se puede ir y volver cuantas veces quieras.
export function SustituirStage({ item, onTouch }: { item: SustituirItem; onTouch?: () => void }) {
  const [sub, setSub] = useState(false)
  const [touched, setTouched] = useState(false)

  const target = item.groups.find((g) => g.id === item.targetId)!
  const targetText = target.words.map((w) => w.text).join(' ')

  // Estado "pronombre": el objetivo desaparece y en su lugar aparece el
  // pronombre justo delante del verbo, con el MISMO rol (corchete + rótulo).
  const shown: LGroup[] = []
  for (const g of item.groups) {
    if (sub && g.id === item.targetId) continue
    if (sub && g.id === item.verbId) {
      shown.push({
        id: 'pro',
        role: target.role,
        words: [{ text: item.pronoun, clase: item.clasePronombre ?? 'pronombre' }],
      })
    }
    shown.push(g)
  }
  const allIds = shown.map((g) => g.id)
  const label = ROLE_STYLE[target.role as Colored].label

  return (
    <Explora
      title={`¿Cabe «${targetText}» en una sola palabra? Prueba el interruptor.`}
      note={
        touched
          ? sub
            ? item.note
            : 'Y vuelta atrás: la frase completa otra vez. El rótulo no se ha movido.'
          : null
      }
    >
      <div className="sentence-area">
        <div className="sentence topalign">
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

      <div className="knob">
        <span className="knob-label">{label}:</span>
        <SegToggle
          options={[
            { value: 'full', label: targetText },
            { value: 'pro', label: item.pronoun },
          ]}
          value={sub ? 'pro' : 'full'}
          onChange={(v) => {
            setSub(v === 'pro')
            setTouched(true)
            onTouch?.()
          }}
        />
      </div>
    </Explora>
  )
}
