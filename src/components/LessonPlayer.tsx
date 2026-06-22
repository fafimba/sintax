import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, IntroBeat, ShowBeat, TapBeat, SplitBeat, LessonRole } from '../types'
import { GroupBox, ROLE_STYLE } from './GroupBox'
import { TopBar } from './TopBar'
import { CheckIcon } from './icons'
import { SentenceStage } from './SentenceStage'
import { NucleoStage } from '../activities/NucleoActivity'
import { SujetoStage } from '../activities/SujetoActivity'
import { ConcordanciaStage } from '../activities/ConcordanciaActivity'
import { VozStage } from '../activities/VozActivity'

type Colored = Exclude<LessonRole, 'none'>

// Jerarquía: sujeto y predicado son las dos mitades; verbo y cd viven dentro
// del predicado.
const PARENT: Record<Colored, Colored | null> = {
  sujeto: null,
  predicado: null,
  verbo: 'predicado',
  cd: 'predicado',
}
const TOP_ORDER: Colored[] = ['sujeto', 'predicado']
const CHILD_ORDER: Colored[] = ['verbo', 'cd']

export function LessonPlayer({
  lesson,
  onBack,
  onComplete,
}: {
  lesson: Lesson
  onBack: () => void
  onComplete: () => void
}) {
  const [i, setI] = useState(0)
  const total = lesson.beats.length
  const finished = i >= total
  const advance = () => setI((n) => n + 1)
  const beat = finished ? null : lesson.beats[i]

  // Conceptos introducidos (show/tap) hasta ahora, para la leyenda.
  const intro = new Set<Colored>()
  const upto = finished ? total : i + 1
  for (let k = 0; k < upto; k++) {
    const b = lesson.beats[k]
    if (b.kind === 'show') {
      for (const id of b.reveal) {
        const r = b.groups.find((g) => g.id === id)?.role
        if (r && r !== 'none') intro.add(r)
      }
    } else if (b.kind === 'tap' && k < i) {
      const r = b.groups.find((g) => g.id === b.target)?.role
      if (r && r !== 'none') intro.add(r)
    }
  }

  const showLegend = !finished && (beat?.kind === 'intro' || beat?.kind === 'show' || beat?.kind === 'tap')

  return (
    <>
      <TopBar onBack={onBack} progress={i / total} />

      <div className="lesson-body">
        <AnimatePresence mode="wait">
          <motion.div
            key={finished ? 'done' : `b${i}`}
            className="beat-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
          >
            {beat?.kind === 'intro' && <IntroView beat={beat} onNext={advance} />}
            {beat?.kind === 'show' && <ShowView beat={beat} onNext={advance} />}
            {beat?.kind === 'split' && <SplitView beat={beat} onNext={advance} />}
            {beat?.kind === 'tap' && <TapView beat={beat} onSolved={advance} />}

            {beat?.kind === 'challengeCd' && <SentenceStage sentence={beat.sentence} onNext={advance} />}
            {beat?.kind === 'challengeNucleo' && <NucleoStage item={beat.item} onNext={advance} />}
            {beat?.kind === 'challengeSujeto' && <SujetoStage item={beat.item} onNext={advance} />}

            {beat?.kind === 'exploreConcordancia' && (
              <Embed onNext={advance}>
                <ConcordanciaStage item={beat.item} />
              </Embed>
            )}
            {beat?.kind === 'exploreVoz' && (
              <Embed onNext={advance}>
                <VozStage item={beat.item} />
              </Embed>
            )}

            {finished && <DoneView intro={intro} onComplete={onComplete} onAgain={() => setI(0)} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {showLegend && intro.size > 0 && <Legend intro={intro} />}
    </>
  )
}

function Embed({ children, onNext }: { children: React.ReactNode; onNext: () => void }) {
  return (
    <div className="lesson-embed">
      {children}
      <div className="lesson-cta">
        <button className="btn" onClick={onNext}>
          Continuar
        </button>
      </div>
    </div>
  )
}

function Legend({ intro }: { intro: Set<Colored> }) {
  // Muestra el padre como cabecera si alguno de sus hijos está introducido.
  const shownTop = TOP_ORDER.filter(
    (t) => intro.has(t) || CHILD_ORDER.some((c) => PARENT[c] === t && intro.has(c)),
  )
  const chip = (r: Colored, small?: boolean) => (
    <span
      className={`legend-chip ${small ? 'legend-chip-sm' : ''}`}
      style={{ background: ROLE_STYLE[r].fill, color: ROLE_STYLE[r].text, borderColor: ROLE_STYLE[r].border }}
    >
      {ROLE_STYLE[r].label}
    </span>
  )
  return (
    <div className="legend">
      {shownTop.map((top) => {
        const kids = CHILD_ORDER.filter((c) => PARENT[c] === top && intro.has(c))
        return (
          <div className="legend-group" key={top}>
            {chip(top)}
            {kids.map((c) => (
              <div className="legend-childrow" key={c}>
                <span className="legend-branch">↳</span>
                {chip(c, true)}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}

function IntroView({ beat, onNext }: { beat: IntroBeat; onNext: () => void }) {
  return (
    <motion.div className="lesson-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <h1>{beat.title}</h1>
      <p>{beat.body}</p>
      <button className="btn" onClick={onNext}>
        {beat.cta ?? 'Continuar'}
      </button>
    </motion.div>
  )
}

function ShowView({ beat, onNext }: { beat: ShowBeat; onNext: () => void }) {
  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area">
        <div className="sentence wrap">
          {beat.groups.map((g) => {
            const display = beat.reveal.includes(g.id) ? 'colored' : g.role === 'none' ? 'plain' : 'box'
            return <GroupBox key={g.id} group={g} display={display} />
          })}
        </div>
      </div>
      <p className="caption">{beat.caption}</p>
      <div className="lesson-cta">
        <button className="btn" onClick={onNext}>
          Continuar
        </button>
      </div>
    </motion.div>
  )
}

function SplitView({ beat, onNext }: { beat: SplitBeat; onNext: () => void }) {
  const [split, setSplit] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setSplit(true), 550)
    return () => window.clearTimeout(t)
  }, [])
  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area">
        <motion.div
          className="sentence"
          animate={{ gap: split ? 18 : 8 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {beat.parts.map((p) => (
            <motion.div
              key={p.id}
              layout
              className="box split-box"
              animate={{
                borderColor: split ? '#d3d1c7' : 'rgba(0,0,0,0)',
                y: split ? [0, -5, 0] : 0,
              }}
              transition={{ duration: 0.5 }}
            >
              {p.text}
            </motion.div>
          ))}
        </motion.div>
      </div>
      <p className="caption">{beat.caption}</p>
      <div className="lesson-cta">
        <motion.button className="btn" onClick={onNext} initial={{ opacity: 0 }} animate={{ opacity: split ? 1 : 0.35 }}>
          Continuar
        </motion.button>
      </div>
    </motion.div>
  )
}

function TapView({ beat, onSolved }: { beat: TapBeat; onSolved: () => void }) {
  const [solved, setSolved] = useState(false)
  const [wrongId, setWrongId] = useState<string | null>(null)

  const tap = (id: string) => {
    if (solved) return
    if (id === beat.target) {
      setSolved(true)
      window.setTimeout(onSolved, 900)
    } else {
      setWrongId(id)
      window.setTimeout(() => setWrongId(null), 450)
    }
  }

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="prompt tap-prompt">{beat.prompt}</p>
      <div className="sentence-area">
        <div className="sentence wrap">
          {beat.groups.map((g) => {
            const isSolvedTarget = solved && g.id === beat.target
            const display = isSolvedTarget ? 'colored' : g.role === 'none' ? 'plain' : 'box'
            const onTap = !solved && g.role !== 'none' ? () => tap(g.id) : undefined
            return <GroupBox key={g.id} group={g} display={display} onTap={onTap} shake={wrongId === g.id} />
          })}
        </div>
      </div>
      <div className="tap-feedback">
        {solved && (
          <motion.span className="fb-ok" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            <CheckIcon />
            {beat.teach}
          </motion.span>
        )}
      </div>
    </motion.div>
  )
}

function DoneView({
  intro,
  onComplete,
  onAgain,
}: {
  intro: Set<Colored>
  onComplete: () => void
  onAgain: () => void
}) {
  return (
    <motion.div className="lesson-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="done-check">
        <CheckIcon size={32} />
      </div>
      <h1>¡Capítulo completado!</h1>
      {intro.size > 0 && (
        <>
          <p>Ya manejas estas piezas:</p>
          <Legend intro={intro} />
        </>
      )}
      <div className="done-actions">
        <button className="btn-ghost" onClick={onAgain}>
          Repetir
        </button>
        <button className="btn" onClick={onComplete}>
          Seguir el camino
        </button>
      </div>
    </motion.div>
  )
}
