import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Lesson, IntroBeat, ShowBeat, TapBeat, LessonRole } from '../types'
import { GroupBox, ROLE_STYLE } from './GroupBox'
import { TopBar } from './TopBar'
import { CheckIcon } from './icons'

type Colored = Exclude<LessonRole, 'none'>

export function LessonPlayer({ lesson, onExit }: { lesson: Lesson; onExit: () => void }) {
  const [i, setI] = useState(0)
  const total = lesson.beats.length
  const finished = i >= total
  const advance = () => setI((n) => n + 1)

  // Colores/conceptos introducidos hasta ahora (la leyenda que crece).
  const introduced: Colored[] = []
  const seen = new Set<string>()
  const upto = finished ? total : i + 1
  for (let k = 0; k < upto; k++) {
    const b = lesson.beats[k]
    const roles: LessonRole[] =
      b.kind === 'show'
        ? b.reveal.map((id) => b.groups.find((g) => g.id === id)?.role ?? 'none')
        : b.kind === 'tap' && k < i
          ? [b.groups.find((g) => g.id === b.target)?.role ?? 'none']
          : []
    for (const r of roles) {
      if (r !== 'none' && !seen.has(r)) {
        seen.add(r)
        introduced.push(r)
      }
    }
  }

  const beat = finished ? null : lesson.beats[i]

  return (
    <>
      <TopBar onBack={onExit} progress={i / total} />

      <div className="lesson-body">
        {beat?.kind === 'intro' && <IntroView key={i} beat={beat} onNext={advance} />}
        {beat?.kind === 'show' && <ShowView key={i} beat={beat} onNext={advance} />}
        {beat?.kind === 'tap' && <TapView key={i} beat={beat} onSolved={advance} />}
        {finished && <DoneView introduced={introduced} onExit={onExit} onAgain={() => setI(0)} />}
      </div>

      {introduced.length > 0 && !finished && (
        <div className="legend">
          {introduced.map((r) => (
            <span
              key={r}
              className="legend-chip"
              style={{ background: ROLE_STYLE[r].fill, color: ROLE_STYLE[r].text, borderColor: ROLE_STYLE[r].border }}
            >
              {ROLE_STYLE[r].label}
            </span>
          ))}
        </div>
      )}
    </>
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
  introduced,
  onExit,
  onAgain,
}: {
  introduced: Colored[]
  onExit: () => void
  onAgain: () => void
}) {
  return (
    <motion.div className="lesson-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <div className="done-check">
        <CheckIcon size={32} />
      </div>
      <h1>¡Capítulo 1 completado!</h1>
      <p>Ya conoces estas piezas:</p>
      <div className="legend">
        {introduced.map((r) => (
          <span
            key={r}
            className="legend-chip"
            style={{ background: ROLE_STYLE[r].fill, color: ROLE_STYLE[r].text, borderColor: ROLE_STYLE[r].border }}
          >
            {ROLE_STYLE[r].label}
          </span>
        ))}
      </div>
      <div className="done-actions">
        <button className="btn-ghost" onClick={onAgain}>
          Repetir
        </button>
        <button className="btn" onClick={onExit}>
          Practicar
        </button>
      </div>
    </motion.div>
  )
}
