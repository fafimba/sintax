import { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import type { ConcItem } from '../types'
import { MorphText } from '../components/MorphText'
import { Explora } from '../components/Explora'
import { fn, neutral, elem } from '../theme'

type Num = 's' | 'p'

// Palabra que obedece al sujeto: muta su forma y da un pulso (escala)
// cuando cambia el número, para que veas QUÉ ha obedecido.
function AgreeWord({
  text,
  pulse,
  tinted,
  isVerb,
}: {
  text: string
  pulse: number
  tinted: boolean
  isVerb?: boolean
}) {
  const controls = useAnimationControls()
  useEffect(() => {
    if (pulse > 0) controls.start({ scale: [1, 1.14, 1], transition: { duration: 0.34 } })
  }, [pulse, controls])
  const style = isVerb
    ? { background: elem.verbo.fill, color: elem.verbo.text, borderColor: elem.verbo.border }
    : tinted
      ? { background: fn.sujeto.fill, color: fn.sujeto.text, borderColor: fn.sujeto.border }
      : { background: '#ffffff', color: '#2c2c2a', borderColor: neutral.border }
  return (
    <motion.span className={`word ${isVerb ? 'shape-verb' : ''}`} animate={controls} style={style}>
      <MorphText text={text} />
    </motion.span>
  )
}

export function ConcordanciaStage({ item }: { item: ConcItem }) {
  const [num, setNum] = useState<Num>('s')
  const [pulse, setPulse] = useState(0)
  const toggles = pulse
  const nota = toggles >= 2

  const flip = () => {
    setNum((n) => (n === 's' ? 'p' : 's'))
    setPulse((p) => p + 1)
  }

  const f = (form: { s: string; p: string }) => (num === 'p' ? form.p : form.s)

  return (
    <Explora
      title="Cambia el *número* del sujeto y mira quién le obedece."
      note={
        nota
          ? `Lo que cambia contigo es tu territorio: el artículo, el adjetivo… y el *verbo*. Eso es la concordancia. «${item.cola}» no depende del sujeto.`
          : null
      }
    >
      <div className="sentence-area">
        <div className="sentence wrap">
          {item.art && <AgreeWord text={f(item.art)} pulse={pulse} tinted={nota} />}
          <AgreeWord text={f(item.nucleo)} pulse={pulse} tinted={nota} />
          {item.adj && <AgreeWord text={f(item.adj)} pulse={pulse} tinted={nota} />}
          <AgreeWord text={f(item.verbo)} pulse={pulse} tinted={false} isVerb />
          <span className="word word-still">{item.cola}</span>
        </div>
      </div>

      <div className="knob">
        <span className="knob-label">número del sujeto</span>
        <button type="button" className="num-switch" onClick={flip} aria-label="Cambiar número">
          <span className={`num-dot ${num === 's' ? 'on' : ''}`}>•</span>
          <span className={`num-dot ${num === 'p' ? 'on' : ''}`}>••</span>
        </button>
        <span className="knob-value">{num === 'p' ? 'plural' : 'singular'}</span>
      </div>
    </Explora>
  )
}
