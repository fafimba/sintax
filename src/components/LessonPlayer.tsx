import { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Lesson, IntroBeat, ShowBeat, SceneBeat, LessonRole, LGroup } from '../types'
import { TwoLevelBox, ROLE_STYLE } from './GroupBox'
import { RelArrow } from './RelArrow'
import { RichText } from './RichText'
import { TopBar } from './TopBar'
import { CheckIcon } from './icons'
import { FronteraStage } from '../activities/FronteraActivity'
import { NucleoStage } from '../activities/NucleoActivity'
import { SujetoStage } from '../activities/SujetoActivity'
import { ConcordanciaStage } from '../activities/ConcordanciaActivity'
import { CrecimientoStage } from '../activities/CrecimientoActivity'
import { SwapStage } from '../activities/SwapActivity'
import { VozStage } from '../activities/VozActivity'
import { AnalizaStage } from '../activities/AnalizaActivity'
import { ClasesStage } from '../activities/ClasesActivity'
import { SustituirStage } from '../activities/SustituirActivity'
import { CircunstanciasStage } from '../activities/CircunstanciasActivity'
import { ZoomStage } from '../activities/ZoomActivity'

type Colored = Exclude<LessonRole, 'none'>

function flattenGroups(groups: LGroup[]): LGroup[] {
  const out: LGroup[] = []
  for (const g of groups) {
    out.push(g)
    if (g.children) out.push(...flattenGroups(g.children))
  }
  return out
}

export function LessonPlayer({
  lesson,
  onBack,
  onComplete,
  initialBeat = 0,
  onBeat,
}: {
  lesson: Lesson
  onBack: () => void
  onComplete: () => void
  initialBeat?: number
  onBeat?: (i: number) => void
}) {
  const [i, setI] = useState(initialBeat)

  // Reporta el paso actual para poder reanudar al volver a abrir la app.
  useEffect(() => {
    onBeat?.(i)
  }, [i, onBeat])
  const total = lesson.beats.length
  const finished = i >= total
  const advance = () => setI((n) => n + 1)

  const beat = finished ? null : lesson.beats[i]

  return (
    <>
      <TopBar onBack={onBack} progress={i / total} />

      <div className="lesson-body">
        {/* Sin AnimatePresence aquí: envolver beats que llevan su propio
            AnimatePresence anidado colgaba la salida y dejaba el siguiente
            paso en blanco. Fundido de entrada con motion keyed, sin animación
            de salida. */}
        <motion.div
          key={finished ? 'done' : `b${i}`}
          className="beat-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
            {beat?.kind === 'intro' && <IntroView beat={beat} onNext={advance} />}
            {beat?.kind === 'show' && <ShowView beat={beat} onNext={advance} />}
            {beat?.kind === 'scene' && <SceneView beat={beat} onNext={advance} />}

            {beat?.kind === 'challengeFrontera' && <FronteraStage items={beat.items} onNext={advance} />}
            {beat?.kind === 'challengeNucleo' && <NucleoStage item={beat.item} onNext={advance} />}
            {beat?.kind === 'challengeSujeto' && <SujetoStage item={beat.item} onNext={advance} />}
            {beat?.kind === 'challengeAnaliza' && <AnalizaStage items={beat.items} onNext={advance} />}

            {beat?.kind === 'exploreClases' && (
              <Embed onNext={advance}>{(touch) => <ClasesStage item={beat.item} onTouch={touch} />}</Embed>
            )}
            {beat?.kind === 'exploreCrecimiento' && (
              <Embed onNext={advance}>{(touch) => <CrecimientoStage item={beat.item} onTouch={touch} />}</Embed>
            )}
            {beat?.kind === 'exploreSwap' && (
              <Embed onNext={advance}>{(touch) => <SwapStage item={beat.item} onTouch={touch} />}</Embed>
            )}
            {beat?.kind === 'exploreSustituir' && (
              <Embed onNext={advance}>{(touch) => <SustituirStage item={beat.item} onTouch={touch} />}</Embed>
            )}
            {beat?.kind === 'exploreCircunstancias' && (
              <Embed onNext={advance}>
                {(touch) => <CircunstanciasStage item={beat.item} onTouch={touch} />}
              </Embed>
            )}
            {beat?.kind === 'exploreZoom' && (
              <Embed onNext={advance}>{(touch) => <ZoomStage item={beat.item} onTouch={touch} />}</Embed>
            )}
            {beat?.kind === 'exploreConcordancia' && (
              <Embed onNext={advance}>
                {(touch) => <ConcordanciaStage item={beat.item} onTouch={touch} />}
              </Embed>
            )}
            {beat?.kind === 'exploreVoz' && (
              <Embed onNext={advance}>{(touch) => <VozStage item={beat.item} onTouch={touch} />}</Embed>
            )}

            {finished && <DoneView onComplete={onComplete} />}
        </motion.div>
      </div>
    </>
  )
}

// Envuelve un explorable. El botón de continuar NO está de entrada: aparece
// cuando el explorable avisa (onTouch) de que ya se ha experimentado. Así
// nadie pasa de largo sin jugar; mientras tanto, una pista suave lo dice.
function Embed({
  children,
  onNext,
}: {
  children: (touch: () => void) => React.ReactNode
  onNext: () => void
}) {
  const [ready, setReady] = useState(false)
  const touch = useCallback(() => setReady(true), [])
  return (
    <div className="lesson-embed">
      {children(touch)}
      <div className="lesson-cta">
        <AnimatePresence mode="wait" initial={false}>
          {ready ? (
            <motion.button
              key="btn"
              className="btn"
              onClick={onNext}
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 420, damping: 28 }}
            >
              Continuar
            </motion.button>
          ) : (
            <motion.span
              key="hint"
              className="cta-hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              pruébalo para seguir
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Encaja la frase en una sola línea en pantallas estrechas: si su ancho natural
// supera el del contenedor, la escala. Así sujeto y predicado no se parten en
// líneas distintas y los arcos de relación suben a espacio limpio.
function FitRow({ className, children }: { className?: string; children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useLayoutEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current
      const inner = innerRef.current
      if (!wrap || !inner) return
      const avail = wrap.clientWidth
      const natural = inner.scrollWidth
      setScale(natural > avail && natural > 0 ? Math.max(0.62, avail / natural) : 1)
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [children])
  return (
    <div ref={wrapRef} className="fitrow">
      <div ref={innerRef} className={className} style={{ transform: `scale(${scale})`, transformOrigin: 'center top' }}>
        {children}
      </div>
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

function ShowView({ beat, onNext }: { beat: ShowBeat; onNext: () => void }) {
  const areaRef = useRef<HTMLDivElement>(null)
  const flat = flattenGroups(beat.groups)
  // Una o varias flechas. Cada una se tiñe con la función de su destino.
  const arrows = beat.arrow ? (Array.isArray(beat.arrow) ? beat.arrow : [beat.arrow]) : []
  const arrowColor = (a: { to: string; color?: string }) => {
    if (a.color) return a.color
    const role = flat.find((g) => g.id === a.to)?.role
    return role && role !== 'none' ? ROLE_STYLE[role as Colored].border : '#3b6d11'
  }
  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area" ref={areaRef} style={{ position: 'relative' }}>
        <FitRow className="sentence topalign">
          {beat.groups.map((g) => (
            <TwoLevelBox key={g.id} group={g} reveal={beat.reveal} separated />
          ))}
        </FitRow>
        {arrows.map((a, idx) => (
          <RelArrow
            key={`${a.from}-${a.to}-${idx}`}
            containerRef={areaRef}
            fromId={a.from}
            toId={a.to}
            label={a.label}
            color={arrowColor(a)}
            lift={idx * 22}
          />
        ))}
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

function SceneView({ beat, onNext }: { beat: SceneBeat; onNext: () => void }) {
  const [step, setStep] = useState(0)
  const s = beat.steps[step]

  const next = () => {
    if (step < beat.steps.length - 1) setStep((n) => n + 1)
    else onNext()
  }

  return (
    <motion.div className="lesson-stage" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="sentence-area">
        <motion.div
          className="sentence topalign"
          animate={{ gap: s.separated ? 16 : 7 }}
          transition={{ duration: 0.45 }}
        >
          {beat.groups.map((g) => (
            <TwoLevelBox key={g.id} group={g} reveal={s.reveal} separated={!!s.separated} />
          ))}
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

// Momento de cierre, breve y sin botones: el check celebra y la app sigue sola
// hacia el mapa (donde el camino avanza al siguiente capítulo).
function DoneView({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onComplete, 1500)
    return () => window.clearTimeout(t)
  }, [onComplete])
  return (
    <motion.div className="lesson-intro" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <motion.div
        className="done-check"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ type: 'spring', stiffness: 380, damping: 18 }}
      >
        <CheckIcon size={32} />
      </motion.div>
      <h1>¡Capítulo completado!</h1>
    </motion.div>
  )
}
