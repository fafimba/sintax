import { useRef, useState, useLayoutEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import type { FronteraItem } from '../types'
import { fn, elem } from '../theme'
import { CheckIcon } from '../components/icons'
import { RichText } from '../components/RichText'

type Phase = 'idle' | 'wrong' | 'solved'

// Tintes suaves para previsualizar el corte mientras se mueve el slider.
const SUJ_SOFT = '#EAF2FB'
const PRED_SOFT = '#FBEDE7'

// Ronda de "frontera": varias frases seguidas, con progreso en puntos.
export function FronteraStage({ items, onNext }: { items: FronteraItem[]; onNext: () => void }) {
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
      <p className="prompt tap-prompt">
        ¿Dónde acaba el <b style={{ color: fn.sujeto.border }}>sujeto</b> y empieza el{' '}
        <b style={{ color: elem.predicado.border }}>predicado</b>?
      </p>
      {items.length > 1 && (
        <div className="frontera-dots">
          {items.map((_, i) => (
            <span key={i} className={`fdot ${i < idx ? 'done' : i === idx ? 'current' : ''}`} />
          ))}
        </div>
      )}
      <FronteraOne key={idx} item={items[idx]} onSolved={next} />
    </motion.div>
  )
}

// Una sola frase: el slider va APARTE (banda propia bajo la frase) y, al moverlo,
// PINTA las palabras. Al soltar / pulsar Comprobar se valida contra `boundary`.
function FronteraOne({ item, onSolved }: { item: FronteraItem; onSolved: () => void }) {
  const { words, boundary, sujetoPro } = item
  const N = words.length
  const unitRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const wordRefs = useRef<(HTMLElement | null)[]>([])
  const [gaps, setGaps] = useState<number[]>([]) // x-centro de cada hueco 1..N-1, relativo a la unidad
  const [pos, setPos] = useState<number>(() => (boundary === 1 ? Math.min(2, N - 1) : 1))
  const posRef = useRef(pos)
  const [phase, setPhase] = useState<Phase>('idle')
  const dragging = useRef(false)

  useLayoutEffect(() => {
    const measure = () => {
      const unit = unitRef.current
      if (!unit) return
      const u = unit.getBoundingClientRect()
      const xs: number[] = []
      for (let k = 1; k < N; k++) {
        const a = wordRefs.current[k - 1]?.getBoundingClientRect()
        const b = wordRefs.current[k]?.getBoundingClientRect()
        if (a && b) xs[k] = (a.right + b.left) / 2 - u.left
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
    applyPos(k)
    if (k === boundary) {
      setPhase('solved')
      window.setTimeout(onSolved, 1500)
    } else {
      setPhase('wrong')
      window.setTimeout(() => setPhase('idle'), 650)
    }
  }

  const fromClientX = (clientX: number) => {
    const track = trackRef.current
    if (!track) return
    applyPos(nearest(clientX - track.getBoundingClientRect().left))
  }

  const onDown = (e: React.PointerEvent) => {
    if (phase === 'solved') return
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    setPhase('idle')
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

  const thumbX = gaps[pos] ?? 0
  const ready = gaps.length > 0

  return (
    <>
      <div className="sentence-area">
        <div className="frontera-unit" ref={unitRef}>
          <div className="frontera-row">
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
              const color =
                phase === 'solved' ? (inSujeto ? fn.sujeto.text : elem.predicado.text) : '#2c2c2a'
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
          </div>

          {/* Slider aparte: banda propia, alineada bajo los huecos de la frase. */}
          <div
            className={`frontera-track ${phase}`}
            ref={trackRef}
            role="slider"
            aria-valuemin={1}
            aria-valuemax={N - 1}
            aria-valuenow={pos}
            aria-valuetext={`corte tras «${words[pos - 1]}»`}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <div className="frontera-rail" />
            {ready && (
              <motion.div
                className="frontera-thumb"
                animate={{ x: thumbX - 13 }}
                transition={{ type: 'spring', stiffness: 600, damping: 34 }}
              >
                <span className="frontera-thumb-grip" />
              </motion.div>
            )}
          </div>
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
          <button className="btn frontera-check" onClick={() => evaluate(posRef.current)}>
            Comprobar
          </button>
          <button className="nudge-btn" onClick={() => nudge(1)} aria-label="mover el corte a la derecha">
            ›
          </button>
        </div>
      )}
    </>
  )
}
