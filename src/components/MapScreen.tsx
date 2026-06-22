import { motion } from 'framer-motion'
import type { Chapter } from '../types'
import { CheckIcon, LockIcon } from './icons'

type NodeState = 'done' | 'open' | 'locked'

export function MapScreen({
  chapters,
  completed,
  onPlay,
  onFree,
}: {
  chapters: Chapter[]
  completed: string[]
  onPlay: (id: string) => void
  onFree: () => void
}) {
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
          return (
            <div className={`map-node map-${state}`} key={ch.id}>
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
                    <CheckIcon color="#ffffff" size={22} />
                  ) : state === 'locked' ? (
                    <LockIcon size={18} />
                  ) : (
                    <span className="map-num">{ch.num}</span>
                  )}
                </motion.button>
              </div>
              <button className="map-info" disabled={locked} onClick={() => !locked && onPlay(ch.id)}>
                <span className="map-title">{ch.title}</span>
                <span className="map-sub">{state === 'open' ? 'Empezar' : ch.subtitle}</span>
              </button>
            </div>
          )
        })}
      </div>

      <button className="map-free" onClick={onFree}>
        Práctica libre →
      </button>
    </div>
  )
}
