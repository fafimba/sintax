import { motion } from 'framer-motion'

export type ActivityId = 'cd' | 'nucleo' | 'sujeto'

interface Card {
  id: string
  name: string
  teaches: string
  tag: string
  color: string
  ready: boolean
}

const CARDS: Card[] = [
  {
    id: 'nucleo',
    name: 'Borra hasta el núcleo',
    teaches: 'La palabra obligatoria del sintagma',
    tag: 'tocar',
    color: '#888780',
    ready: true,
  },
  {
    id: 'sujeto',
    name: 'Encuentra el sujeto',
    teaches: 'Concordancia: arrastra al verbo',
    tag: 'interruptor',
    color: '#185FA5',
    ready: true,
  },
  {
    id: 'cd',
    name: 'Encuentra el complemento directo',
    teaches: 'Sustituye por «lo» / «la»',
    tag: 'arrastrar',
    color: '#3B6D11',
    ready: true,
  },
  {
    id: 'rodear',
    name: 'Rodea el sintagma',
    teaches: 'Qué palabras forman una unidad',
    tag: 'pronto',
    color: '#534AB7',
    ready: false,
  },
  {
    id: 'arbol',
    name: 'Construye el árbol',
    teaches: 'La estructura jerárquica de la oración',
    tag: 'pronto',
    color: '#0F6E56',
    ready: false,
  },
  {
    id: 'compuesta',
    name: 'Parte la oración compuesta',
    teaches: 'Cuenta los verbos, corta por el nexo',
    tag: 'pronto',
    color: '#854F0B',
    ready: false,
  },
]

export function Home({ onPick }: { onPick: (id: ActivityId) => void }) {
  return (
    <div className="home">
      <div className="home-head">
        <h1>Sintax</h1>
        <p>Aprende sintaxis tocando la oración. Elige una mecánica.</p>
      </div>
      <div className="home-list">
        {CARDS.map((c, i) => (
          <motion.button
            key={c.id}
            type="button"
            className={`home-card ${c.ready ? '' : 'home-card-soon'}`}
            onClick={() => c.ready && onPick(c.id as ActivityId)}
            disabled={!c.ready}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.3 }}
            whileHover={c.ready ? { scale: 1.015 } : undefined}
            whileTap={c.ready ? { scale: 0.985 } : undefined}
          >
            <span className="home-dot" style={{ background: c.color }} />
            <span className="home-text">
              <span className="home-name">{c.name}</span>
              <span className="home-teaches">{c.teaches}</span>
            </span>
            <span className={`home-tag ${c.ready ? '' : 'home-tag-soon'}`}>{c.tag}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
