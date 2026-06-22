import { useState } from 'react'
import { motion } from 'framer-motion'
import type { SujetoItem, SujetoPart } from '../types'
import { SUJETOS } from '../data/sujetos'
import { TopBar } from '../components/TopBar'
import { Done } from '../components/Done'
import { MorphText } from '../components/MorphText'
import { CheckIcon, SwapIcon } from '../components/icons'
import { fn, neutral } from '../theme'

type Num = 's' | 'p'
type Phase = 'idle' | 'wrong' | 'done'

function SujetoStage({ item, onNext }: { item: SujetoItem; onNext: () => void }) {
  const subject = item.parts.find((p) => p.kind === 'sujeto')!
  const [subjNum, setSubjNum] = useState<Num>('s')
  const [distNum, setDistNum] = useState<Num>('s')
  const [phase, setPhase] = useState<Phase>('idle')
  const [wrongId, setWrongId] = useState<string | null>(null)

  // El verbo concuerda con el sujeto: su número SIEMPRE sigue al del sujeto.
  const verbNum: Num = subjNum

  const display = (part: SujetoPart): string => {
    let n: Num = 's'
    if (part.kind === 'verbo') n = verbNum
    else if (part.kind === 'sujeto') n = subjNum
    else n = distNum
    return n === 'p' ? part.plural : part.singular
  }

  const tap = (part: SujetoPart) => {
    if (phase === 'done' || part.kind === 'verbo') return
    if (part.kind === 'sujeto') {
      setSubjNum((n) => (n === 's' ? 'p' : 's'))
      setPhase('done')
    } else {
      setDistNum((n) => (n === 's' ? 'p' : 's'))
      setWrongId(part.id)
      setPhase('wrong')
      window.setTimeout(() => {
        setDistNum('s')
        setWrongId(null)
        setPhase('idle')
      }, 1500)
    }
  }

  return (
    <div className="stage">
      <p className="prompt">¿Cuál es el sujeto?</p>
      <p className="subprompt">Cambia el número de un grupo. El sujeto arrastra al verbo: cambia con él.</p>

      <div className="sentence-area">
        <div className="sentence">
          {item.parts.map((part) => {
            const isVerb = part.kind === 'verbo'
            const isSubj = part.kind === 'sujeto'
            const num: Num = isVerb ? verbNum : isSubj ? subjNum : distNum
            const subjDone = phase === 'done' && isSubj
            const verbDone = phase === 'done' && isVerb
            const wrong = wrongId === part.id

            const style = subjDone
              ? { background: fn.sujeto.fill, color: fn.sujeto.text, borderColor: fn.sujeto.border }
              : verbDone
                ? { background: '#ffffff', color: fn.sujeto.text, borderColor: fn.sujeto.border }
                : wrong
                  ? { background: '#ffffff', color: neutral.text, borderColor: '#EF9F27' }
                  : { background: '#ffffff', color: '#2c2c2a', borderColor: neutral.border }

            return (
              <div className="num-wrap" key={part.id}>
                <motion.button
                  type="button"
                  className={`box num-box ${isVerb ? 'is-verb' : ''}`}
                  onClick={() => tap(part)}
                  disabled={isVerb || phase === 'done'}
                  animate={{ ...style, scale: subjDone || verbDone ? [1, 1.08, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={!isVerb && phase !== 'done' ? { scale: 1.04 } : undefined}
                >
                  <MorphText text={display(part)} />
                </motion.button>

                {!isVerb && (
                  <span className={`toggle ${phase === 'done' && isSubj ? 'toggle-done' : ''}`}>
                    <SwapIcon />
                    {num === 'p' ? 'plural' : 'singular'}
                  </span>
                )}
                {subjDone && (
                  <motion.span
                    className="fnlabel"
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ color: fn.sujeto.border }}
                  >
                    Sujeto
                  </motion.span>
                )}
                {isVerb && <span className="toggle-spacer" />}
              </div>
            )
          })}
        </div>
      </div>

      <div className="feedback">
        {phase === 'wrong' && (
          <span className="fb-error">el verbo no se inmuta → ese grupo no es el sujeto</span>
        )}
        {phase === 'done' && (
          <motion.div className="fb-done" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
            <span className="fb-ok" style={{ color: fn.sujeto.border }}>
              <CheckIcon color={fn.sujeto.border} />
              concuerda con el verbo: «{subjNum === 'p' ? subject.plural : subject.singular}» es el sujeto
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

export function SujetoActivity({ onBack }: { onBack: () => void }) {
  const [idx, setIdx] = useState(0)
  const item = SUJETOS[idx]
  return (
    <>
      <TopBar onBack={onBack} progress={idx / SUJETOS.length} />
      {item ? (
        <SujetoStage key={item.id} item={item} onNext={() => setIdx((i) => i + 1)} />
      ) : (
        <Done total={SUJETOS.length} label="oraciones" onRestart={() => setIdx(0)} onBack={onBack} />
      )}
    </>
  )
}
