import { useState, useEffect } from 'react'
import { motion, useAnimationControls } from 'framer-motion'
import type { ConcItem } from '../types'
import { CONCORDANCIA } from '../data/concordancia'
import { TopBar } from '../components/TopBar'
import { MorphText } from '../components/MorphText'
import { fn, neutral } from '../theme'

type Num = 's' | 'p'

// Palabra que obedece al sujeto: muta su forma y da un pulso (escala)
// cuando cambia el número, para que veas QUÉ ha obedecido.
function AgreeWord({ text, pulse, tinted }: { text: string; pulse: number; tinted: boolean }) {
  const controls = useAnimationControls()
  useEffect(() => {
    if (pulse > 0) controls.start({ scale: [1, 1.14, 1], transition: { duration: 0.34 } })
  }, [pulse, controls])
  return (
    <motion.span
      className="word"
      animate={controls}
      style={
        tinted
          ? { background: fn.sujeto.fill, color: fn.sujeto.text, borderColor: fn.sujeto.border }
          : { background: '#ffffff', color: '#2c2c2a', borderColor: neutral.border }
      }
    >
      <MorphText text={text} />
    </motion.span>
  )
}

function ConcordanciaStage({ item }: { item: ConcItem }) {
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
    <motion.div
      className="stage explora"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <p className="prompt">¿Qué pasa si cambias el número del sujeto?</p>
      <p className="subprompt">Mueve el interruptor y observa quién le obedece… y quién no.</p>

      <div className="sentence-area">
        <div className="sentence wrap">
          {item.art && <AgreeWord text={f(item.art)} pulse={pulse} tinted={nota} />}
          <AgreeWord text={f(item.nucleo)} pulse={pulse} tinted={nota} />
          {item.adj && <AgreeWord text={f(item.adj)} pulse={pulse} tinted={nota} />}
          <AgreeWord text={f(item.verbo)} pulse={pulse} tinted={false} />
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

      <div className="nota-slot">
        {nota && (
          <motion.p className="nota" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            Lo que cambia contigo es tu territorio: el artículo, el adjetivo… y el verbo. Eso es la{' '}
            <b>concordancia</b>. El complemento «{item.cola}» no depende del sujeto.
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export function ConcordanciaActivity({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const item = CONCORDANCIA[idx % CONCORDANCIA.length]
  return (
    <>
      <TopBar onBack={onBack} counter={`${(idx % CONCORDANCIA.length) + 1} / ${CONCORDANCIA.length}`} />
      <ConcordanciaStage key={item.id} item={item} />
      <div className="explora-nav">
        <button className="btn-ghost" onClick={() => setIdx((i) => i + 1)}>
          Otra frase
        </button>
      </div>
    </>
  )
}
