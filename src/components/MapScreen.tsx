import { useEffect } from 'react'
import { motion } from 'framer-motion'
import type { Chapter } from '../types'
import { CheckIcon, LockIcon } from './icons'

type NodeState = 'done' | 'open' | 'locked'

// El mapa es un CAMINO, no un menú. Al completar un capítulo se pasa por aquí
// solo un momento: el check aparece, el tramo se pinta, el siguiente nodo se
// enciende y la app sigue sola (autoNext). Tocar cualquier nodo sigue
// funcionando para rejugar o salirse del riel.
export function MapScreen({
  chapters,
  completed,
  justCompleted,
  autoNext,
  onPlay,
}: {
  chapters: Chapter[]
  completed: string[]
  justCompleted?: string | null
  autoNext?: string | null
  onPlay: (id: string) => void
}) {
  // Camino natural: tras la celebración, entra solo al siguiente capítulo.
  useEffect(() => {
    if (!autoNext) return
    const t = window.setTimeout(() => onPlay(autoNext), 2600)
    return () => window.clearTimeout(t)
  }, [autoNext, onPlay])

  return (
    <div className="map">
      <div className="map-head">
        <h1>Sintax</h1>
        <p>Tu camino por la sintaxis.</p>
      </div>

      <div className="map-path">
        {chapters.map((ch, idx) => {
          const isDone = completed.includes(ch.id)
          const prevDone = idx === 0 || completed.includes(chapters[idx - 1].id)
          const state: NodeState = isDone ? 'done' : prevDone ? 'open' : 'locked'
          const locked = state === 'locked'
          const celebrate = ch.id === justCompleted
          const isNext = ch.id === autoNext
          const isLast = idx === chapters.length - 1

          return (
            <motion.div
              className={`map-node map-${state}`}
              key={ch.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.32 }}
            >
              <div className="map-rail" aria-hidden="true">
                <motion.button
                  type="button"
                  className="map-dot"
                  disabled={locked}
                  onClick={() => !locked && onPlay(ch.id)}
                  whileHover={!locked ? { scale: 1.06 } : undefined}
                  whileTap={!locked ? { scale: 0.94 } : undefined}
                >
                  {state === 'done' ? (
                    <motion.span
                      initial={celebrate ? { scale: 0 } : false}
                      animate={celebrate ? { scale: [0, 1.3, 1] } : { scale: 1 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 16, delay: 0.3 }}
                      style={{ display: 'flex' }}
                    >
                      <CheckIcon color="#ffffff" size={22} />
                    </motion.span>
                  ) : state === 'locked' ? (
                    <LockIcon size={18} />
                  ) : (
                    <span className="map-num">{ch.num}</span>
                  )}
                </motion.button>
                {/* El tramo del camino se pinta hacia el siguiente nodo. */}
                {celebrate && !isLast && (
                  <motion.div
                    className="map-rail-fill"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ delay: 0.75, duration: 0.55, ease: 'easeInOut' }}
                  />
                )}
              </div>
              <motion.button
                className="map-info"
                disabled={locked}
                onClick={() => !locked && onPlay(ch.id)}
                initial={isNext ? { opacity: 0.45, scale: 0.96 } : false}
                animate={isNext ? { opacity: 1, scale: 1 } : {}}
                transition={{ type: 'spring', stiffness: 320, damping: 22, delay: 1.45 }}
              >
                <span className="map-title">{ch.title}</span>
                <span className="map-sub">
                  {isNext ? 'seguimos aquí…' : state === 'open' ? 'Empezar' : ch.subtitle}
                </span>
              </motion.button>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
