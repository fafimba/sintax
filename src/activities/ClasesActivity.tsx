import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ClasesItem } from '../types'
import { Explora } from '../components/Explora'
import { clase as claseColor } from '../theme'

// Explorable "clases": toca cada palabra y descubre de qué clase es. No hay
// respuesta incorrecta: todas las palabras cuentan algo. El color es la
// recompensa; la nota, la explicación.
export function ClasesStage({ item }: { item: ClasesItem }) {
  const [found, setFound] = useState<Set<number>>(() => new Set())
  const [last, setLast] = useState<number | null>(null)

  const tap = (i: number) => {
    setFound((prev) => new Set(prev).add(i))
    setLast(i)
  }

  const w = last !== null ? item.words[last] : null
  const allFound = found.size === item.words.length
  const note = w
    ? `*${w.name}* — ${w.desc}${allFound ? ' Ya conoces todas las piezas.' : ''}`
    : null

  return (
    <Explora title="Toca cada palabra: cada una es de una *clase*." note={note}>
      <div className="clases-row">
        {item.words.map((word, i) => {
          const on = found.has(i)
          const isLast = last === i
          return (
            <motion.button
              key={i}
              type="button"
              className={`clases-word ${on ? 'is-on' : ''} ${isLast ? 'is-last' : ''}`}
              onClick={() => tap(i)}
              animate={{
                color: on ? claseColor[word.clase] : '#3c3b36',
                scale: isLast ? [1, 1.12, 1] : 1,
              }}
              transition={{ duration: 0.3 }}
              whileTap={{ scale: 0.94 }}
            >
              {word.text}
            </motion.button>
          )
        })}
      </div>
      <div className="clases-progress" aria-hidden="true">
        {item.words.map((word, i) => (
          <motion.span
            key={i}
            className="clases-tick"
            animate={{ background: found.has(i) ? claseColor[word.clase] : '#e4e2d9' }}
            transition={{ duration: 0.25 }}
          />
        ))}
      </div>
    </Explora>
  )
}
