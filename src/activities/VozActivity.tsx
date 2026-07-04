import { useState } from 'react'
import { motion } from 'framer-motion'
import type { VozItem } from '../types'
import { SegToggle } from '../components/SegToggle'
import { MorphText } from '../components/MorphText'
import { Explora } from '../components/Explora'
import { fn, elem } from '../theme'

type Voz = 'activa' | 'pasiva'

const AGENTE = { fill: '#E7D3C3', text: '#5a4632', border: '#9c7a5c' }
const VERB = { fill: elem.verbo.fill, text: elem.verbo.text, border: elem.verbo.border }

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

interface PieceData {
  text: string
  color: { fill: string; text: string; border: string }
  label: string
}

function pieceData(id: string, item: VozItem, voz: Voz): PieceData {
  if (id === 'agt') {
    return voz === 'activa'
      ? { text: item.sujeto, color: fn.sujeto, label: 'Sujeto' }
      : { text: `por ${item.sujeto}`, color: AGENTE, label: 'C. Agente' }
  }
  if (id === 'obj') {
    return voz === 'activa'
      ? { text: item.cd, color: fn.cd, label: 'CD' }
      : { text: item.cd, color: fn.sujeto, label: 'Sujeto' }
  }
  return {
    text: voz === 'activa' ? item.verboActiva : item.verboPasiva,
    color: VERB,
    label: 'verbo',
  }
}

export function VozStage({ item }: { item: VozItem }) {
  const [voz, setVoz] = useState<Voz>('activa')
  const [seen, setSeen] = useState(false)

  const order = voz === 'activa' ? ['agt', 'vrb', 'obj'] : ['obj', 'vrb', 'agt']

  return (
    <Explora
      title={`Gira la voz y no pierdas de vista a «${item.cd}».`}
      note={
        seen
          ? `«${item.cd}» dice lo mismo, pero cambia de papel: era *complemento directo* y ahora es *sujeto*. La función es un papel que se reparte, no una etiqueta pegada a la palabra.`
          : null
      }
    >
      <div className="sentence-area">
        <motion.div className="sentence" layout>
          {order.map((id, i) => {
            const d = pieceData(id, item, voz)
            const text = i === 0 ? cap(d.text) : d.text
            const shapeClass =
              d.label === 'Sujeto'
                ? 'shape-sujeto'
                : d.label === 'CD'
                  ? 'shape-cd'
                  : d.label === 'verbo'
                    ? 'shape-verb'
                    : ''
            return (
              <motion.div
                key={id}
                layout
                className="voz-piece"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              >
                <motion.div
                  className={`box ${shapeClass}`}
                  animate={{ backgroundColor: d.color.fill, color: d.color.text, borderColor: d.color.border }}
                  transition={{ duration: 0.3 }}
                >
                  <MorphText text={text} />
                </motion.div>
                <span className="fnlabel" style={{ color: d.color.border }}>
                  <MorphText text={d.label} />
                </span>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      <div className="knob">
        <SegToggle
          options={[
            { value: 'activa', label: 'activa' },
            { value: 'pasiva', label: 'pasiva' },
          ]}
          value={voz}
          onChange={(v) => {
            setVoz(v as Voz)
            if (v === 'pasiva') setSeen(true)
          }}
          accent="#534AB7"
        />
      </div>
    </Explora>
  )
}
