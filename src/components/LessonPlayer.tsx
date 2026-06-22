import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, IntroBeat, ShowBeat, TapBeat, SceneBeat, LessonRole, LGroup } from '../types'
import { GroupBox, ConstituentBox, ROLE_STYLE } from './GroupBox'
import { RichText } from './RichText'
import { TopBar } from './TopBar'
import { CheckIcon } from './icons'
import { SentenceStage } from './SentenceStage'
import { NucleoStage } from '../activities/NucleoActivity'
import { SujetoStage } from '../activities/SujetoActivity'
import { ConcordanciaStage } from '../activities/ConcordanciaActivity'
import { VozStage } from '../activities/VozActivity'

type Colored = Exclude<LessonRole, 'none'>

const PARENT: Record<Colored, Colored | null> = {
  sujeto: null,
  predicado: null,
  verbo: 'predicado',
  cd: 'predicado',
}
const TOP_ORDER: Colored[] = ['sujeto', 'predicado']
const CHILD_ORDER: Colored[] = ['verbo', 'cd']

function flattenGroups(groups: LGroup[]): LGroup[] {
  const out: LGroup[] = []
  for (const g of groups) {
    out.push(g)
    if (g.children) out.push(...flattenGroups(g.children))
  }
  return out
}

function rolesOf(ids: string[], groups: { id: string; role: LessonRole }[]): Colored[] {
  return ids
    .map((id) => groups.find((g) => g.id === id)?.role)
    .filter((r): r is Colored => !!r && r !== 'none')
}

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
  const [introduced, setIntroduced] = useState<Set<Colored>>(() => new Set())
  const total = lesson.beats.length
  const finished = i >= total
  const advance = () => setI((n) => n + 1)
  const restart = () => {
    setIntroduced(new Set())
    setI(0)
  }
  const introduce = useCallback((roles: Colored[]) => {
    if (roles.length === 0) return
    setIntroduced((prev) => {
      const next = new Set(prev)
      roles.forEach((r) => next.add(r))
      return next
    })
  }, [])

  const beat = finished ? null : lesson.beats[i]
  const teachingBeat =
    beat?.kind === 'intro' || beat?.kind === 'show' || beat?.kind === 'scene' || beat?.kind === 'tap'

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
            {beat?.kind === 'show' && <ShowView beat={beat} onNext={advance} onIntroduce={introduce} />}
            {beat?.kind === 'scene' && <SceneView beat={beat} onNext={advance} onIntroduce={introduce} />}
            {beat?.kind === 'tap' && <TapView beat={beat} onSolved={advance} onIntroduce={introduce} />}

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

            {finished && <DoneView intro={introduced} onComplete={onComplete} onAgain={restart} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {teachingBeat && introduced.size > 0 && <Legend intro={introduced} />}
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
      <p>
        <RichText text={beat.body} />
      </p>
      <button className="btn" onClick={onNext}>
        {beat.cta ?? 'Continuar'}
      </button>
    </motion.div>
  )
}

function ShowView({
  beat,
  onNext,
  onIntroduce,
}: {
  beat: ShowBeat
  onNext: () => void
  onIntroduce: (r: Colored[]) => void
}) {
  useEffect(() => {
    const flat = flattenGroups(beat.groups)
    const containerRoles = beat.groups
      .filter((g) => g.children?.length)
      .map((g) => g.role)
      .filter((r): r is Colored => r !== 'none')
    onIntroduce([...rolesOf(beat.reveal, flat), ...containerRoles])
  }, [beat, onIntroduce])
  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area">
        <div className="sentence wrap topalign">
          {beat.groups.map((g) => (
            <ConstituentBox key={g.id} group={g} reveal={beat.reveal} separated />
          ))}
        </div>
      </div>
      <p className="caption">
        <RichText text={beat.caption} />
      </p>
      <div className="lesson-cta">
        <button className="btn" onClick={onNext}>
          Continuar
        </button>
      </div>
    </motion.div>
  )
}

function SceneView({
  beat,
  onNext,
  onIntroduce,
}: {
  beat: SceneBeat
  onNext: () => void
  onIntroduce: (r: Colored[]) => void
}) {
  const [step, setStep] = useState(0)
  const s = beat.steps[step]

  useEffect(() => {
    onIntroduce(rolesOf(s.reveal, beat.groups))
  }, [step, s, beat, onIntroduce])

  const next = () => {
    if (step < beat.steps.length - 1) setStep((n) => n + 1)
    else onNext()
  }

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area">
        <motion.div className="sentence" animate={{ gap: s.separated ? 16 : 7 }} transition={{ duration: 0.45 }}>
          {beat.groups.map((g) => {
            const display = s.reveal.includes(g.id) ? 'colored' : s.separated ? 'box' : 'flush'
            return <GroupBox key={g.id} group={g} display={display} />
          })}
        </motion.div>
      </div>
      <div className="caption-slot">
        <AnimatePresence mode="wait">
          <motion.p
            key={step}
            className="caption"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <RichText text={s.caption} />
          </motion.p>
        </AnimatePresence>
      </div>
      <div className="lesson-cta">
        <button className="btn" onClick={next}>
          Continuar
        </button>
      </div>
    </motion.div>
  )
}

function TapView({
  beat,
  onSolved,
  onIntroduce,
}: {
  beat: TapBeat
  onSolved: () => void
  onIntroduce: (r: Colored[]) => void
}) {
  const [solved, setSolved] = useState(false)
  const [wrongId, setWrongId] = useState<string | null>(null)

  const tap = (id: string) => {
    if (solved) return
    if (id === beat.target) {
      setSolved(true)
      onIntroduce(rolesOf([beat.target], beat.groups))
      window.setTimeout(onSolved, 900)
    } else {
      setWrongId(id)
      window.setTimeout(() => setWrongId(null), 450)
    }
  }

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <p className="prompt tap-prompt">
        <RichText text={beat.prompt} />
      </p>
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
            <RichText text={beat.teach} />
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
