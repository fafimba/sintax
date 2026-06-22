import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { FronteraItem } from '../types'
import { fn, elem } from '../theme'
import { CheckIcon } from '../components/icons'
import { RichText } from '../components/RichText'

type Phase = 'idle' | 'wrong' | 'solved'

// Tintes muy suaves para previsualizar el corte mientras se mueve.
const SUJ_SOFT = '#EAF2FB'
const PRED_SOFT = '#FBEDE7'

// Mecánica "frontera": coloca el corte SUJETO|PREDICADO. El divisor SALTA de
// hueco en hueco; al soltarlo se comprueba. Tap para colocar, arrastrar para
// deslizar, y flechas + Comprobar como vía sin arrastre (accesibilidad).
export function FronteraStage({ item, onNext }: { item: FronteraItem; onNext: () => void }) {
  const { words, boundary, sujetoPro } = item
  const N = words.length
  const rowRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLElement | null)[]>([])
  const [gaps, setGaps] = useState<number[]>([]) // x-centro por hueco 1..N-1
  // Empieza en un hueco que NO es la solución.
  const [pos, setPos] = useState<number>(() => (boundary === 1 ? Math.min(2, N - 1) : 1))
  const posRef = useRef(pos)
  const [phase, setPhase] = useState<Phase>('idle')
  const dragging = useRef(false)

  useLayoutEffect(() => {
    const measure = () => {
      const row = rowRef.current
      if (!row) return
      const r0 = row.getBoundingClientRect()
      const xs: number[] = []
      for (let k = 1; k < N; k++) {
        const a = wordRefs.current[k - 1]?.getBoundingClientRect()
        const b = wordRefs.current[k]?.getBoundingClientRect()
        if (a && b) xs[k] = (a.right + b.left) / 2 - r0.left
      }
      setGaps(xs)
    }
    measure()
    const t = window.setTimeout(measure, 60)
    window.addEventListener('resize', measure)
    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', measure)
    }
  }, [N, words])

  const nearest = useCallback(
    (relX: number) => {
      let best = 1
      let bd = Infinity
      for (let k = 1; k < N; k++) {
        const d = Math.abs((gaps[k] ?? 0) - relX)
        if (d < bd) {
          bd = d
          best = k
        }
      }
      return best
    },
    [gaps, N],
  )

  const applyPos = (k: number) => {
    posRef.current = k
    setPos(k)
  }

  const evaluate = (k: number) => {
    if (k === boundary) {
      applyPos(k)
      setPhase('solved')
      window.setTimeout(onNext, 1900)
    } else {
      applyPos(k)
      setPhase('wrong')
      window.setTimeout(() => setPhase('idle'), 650)
    }
  }

  const fromClientX = (clientX: number) => {
    const row = rowRef.current
    if (!row) return
    applyPos(nearest(clientX - row.getBoundingClientRect().left))
  }

  const onDown = (e: React.PointerEvent) => {
    if (phase === 'solved') return
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    fromClientX(e.clientX)
  }
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return
    fromClientX(e.clientX)
  }
  const onUp = () => {
    if (!dragging.current) return
    dragging.current = false
    evaluate(posRef.current)
  }

  const nudge = (d: number) => {
    if (phase === 'solved') return
    applyPos(Math.max(1, Math.min(N - 1, posRef.current + d)))
    setPhase('idle')
  }

  const dividerX = gaps[pos] ?? 0
  const ready = gaps.length > 0

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="prompt tap-prompt">
        ¿Dónde acaba el <b style={{ color: fn.sujeto.border }}>sujeto</b> y empieza el{' '}
        <b style={{ color: elem.predicado.border }}>predicado</b>?
      </p>

      <div className="sentence-area">
        <div
          className={`frontera-row ${phase}`}
          ref={rowRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          {words.map((w, i) => {
            const inSujeto = i < pos
            const bg =
              phase === 'solved'
                ? inSujeto
                  ? fn.sujeto.fill
                  : elem.predicado.fill
                : inSujeto
                  ? SUJ_SOFT
                  : PRED_SOFT
            const color = phase === 'solved' ? (inSujeto ? fn.sujeto.text : elem.predicado.text) : '#2c2c2a'
            return (
              <span
                key={i}
                ref={(el) => (wordRefs.current[i] = el)}
                className="frontera-word"
                style={{ backgroundColor: bg, color }}
              >
                {w}
              </span>
            )
          })}

          {ready && (
            <motion.div
              className={`frontera-divider ${phase}`}
              role="slider"
              aria-valuemin={1}
              aria-valuemax={N - 1}
              aria-valuenow={pos}
              aria-valuetext={`corte tras «${words[pos - 1]}»`}
              animate={{ x: dividerX - 1.5 }}
              transition={{ type: 'spring', stiffness: 600, damping: 34 }}
            >
              <span className="frontera-knob" />
            </motion.div>
          )}
        </div>
      </div>

      {phase === 'solved' ? (
        <motion.div className="frontera-fb" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
          <span className="fb-ok">
            <CheckIcon />
            <RichText
              text={`«${words.slice(0, boundary).join(' ')}» es el [sujeto] → lo cambias por *${sujetoPro}*.`}
            />
          </span>
        </motion.div>
      ) : (
        <div className="frontera-controls">
          <button className="nudge-btn" onClick={() => nudge(-1)} aria-label="mover el corte a la izquierda">
            ‹
          </button>
          <button className="btn frontera-check" onClick={() => evaluate(pos)}>
            Comprobar
          </button>
          <button className="nudge-btn" onClick={() => nudge(1)} aria-label="mover el corte a la derecha">
            ›
          </button>
        </div>
      )}
    </motion.div>
  )
}
