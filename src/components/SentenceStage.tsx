import { useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence, type PanInfo } from 'framer-motion'
import type { Sentence } from '../types'
import { Caja } from './Caja'
import { PronounChip } from './PronounChip'
import { fn } from '../theme'

type Phase = 'idle' | 'error' | 'revealing' | 'done'

export function SentenceStage({
  sentence,
  onNext,
}: {
  sentence: Sentence
  onNext: () => void
}) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [errorId, setErrorId] = useState<string | null>(null)
  const boxRefs = useRef<Map<string, HTMLElement>>(new Map())

  const verb = sentence.segments.find((s) => s.role === 'verbo')!
  const cd = sentence.segments.find((s) => s.role === 'cd')!

  const registerBox = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) boxRefs.current.set(id, el)
      else boxRefs.current.delete(id)
    },
    [],
  )

  const handleDrop = (info: PanInfo) => {
    if (phase === 'revealing' || phase === 'done') return
    const x = info.point.x - window.scrollX
    const y = info.point.y - window.scrollY
    let hit: string | null = null
    boxRefs.current.forEach((el, id) => {
      const r = el.getBoundingClientRect()
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) hit = id
    })
    if (!hit) return

    if (hit === cd.id) {
      setErrorId(null)
      setPhase('revealing')
      window.setTimeout(() => setPhase('done'), 700)
    } else {
      setErrorId(hit)
      setPhase('error')
      window.setTimeout(() => {
        setPhase('idle')
        setErrorId(null)
      }, 1000)
    }
  }

  // Orden de render. En 'done' se quita el CD y se inserta el pronombre
  // justo antes del verbo (posición preverbal).
  const items: { key: string; kind: 'box' | 'verb' | 'pronoun'; segId?: string }[] = []
  for (const seg of sentence.segments) {
    if (phase === 'done' && seg.id === cd.id) continue
    if (seg.id === verb.id && phase === 'done') items.push({ key: 'pronoun', kind: 'pronoun' })
    items.push({ key: seg.id, kind: seg.role === 'verbo' ? 'verb' : 'box', segId: seg.id })
  }

  const trayVisible = phase === 'idle' || phase === 'error'

  return (
    <div className="stage">
      <p className="prompt">{sentence.prompt}</p>
      <p className="subprompt">Arrastra el pronombre y suéltalo sobre el complemento directo.</p>

      <div className="sentence-area">
        <motion.div
          animate={phase === 'error' ? { x: [0, -8, 8, -6, 6, 0] } : { x: 0 }}
          transition={phase === 'error' ? { duration: 0.35 } : { duration: 0.2 }}
        >
          <motion.div className="sentence" layout>
            <AnimatePresence mode="popLayout">
              {items.map((it) => {
                if (it.kind === 'pronoun') {
                  return (
                    <motion.div
                      key="pronoun-landed"
                      layout
                      className="box-wrap"
                      initial={{ scale: 0.3, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: 'spring', stiffness: 480, damping: 22, delay: 0.05 }}
                    >
                      <span className="cat" style={{ color: fn.cd.border }}>
                        SN
                      </span>
                      <div
                        className="box"
                        style={{
                          background: fn.cd.fill,
                          color: fn.cd.text,
                          borderColor: fn.cd.border,
                        }}
                      >
                        {sentence.pronoun}
                      </div>
                      <span className="fnlabel" style={{ color: fn.cd.border }}>
                        CD
                      </span>
                    </motion.div>
                  )
                }
                const seg = sentence.segments.find((s) => s.id === it.segId)!
                if (it.kind === 'verb') {
                  return (
                    <motion.span layout key={it.key} className="verb">
                      {seg.text}
                    </motion.span>
                  )
                }
                const isCD = seg.id === cd.id
                const state: 'neutral' | 'reveal-cd' | 'error' =
                  errorId === seg.id ? 'error' : isCD && phase === 'revealing' ? 'reveal-cd' : 'neutral'
                return <Caja key={it.key} seg={seg} state={state} boxRef={registerBox(seg.id)} />
              })}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      <div className="tray">
        {trayVisible ? (
          <PronounChip text={sentence.pronoun} onDrop={handleDrop} />
        ) : phase === 'revealing' ? (
          <motion.span
            className="tray-hint"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ¡es el complemento directo!
          </motion.span>
        ) : null}
      </div>

      <div className="feedback">
        {phase === 'error' && (
          <span className="fb-error">ahí el pronombre no encaja — prueba con otro grupo</span>
        )}
        {phase === 'done' && (
          <motion.div
            className="fb-done"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <span className="fb-ok">
              <CheckIcon />
              «{cd.text}» es complemento directo
            </span>
            <button className="btn" onClick={onNext}>
              Continuar
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3B6D11"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}
