import { motion } from 'framer-motion'

export type ActivityId = 'cd' | 'nucleo' | 'sujeto' | 'concordancia' | 'voz'
export type HomeTarget = ActivityId | 'lesson'

interface Card {
  id: string
  name: string
  teaches: string
  tag: string
  color: string
  ready: boolean
}

interface Section {
  title: string
  subtitle: string
  cards: Card[]
}

const SECTIONS: Section[] = [
  {
    title: 'El camino',
    subtitle: 'aprende paso a paso',
    cards: [
      {
        id: 'lesson',
        name: 'Volver al mapa de capítulos',
        teaches: 'El recorrido guiado, de lo básico a lo avanzado',
        tag: 'camino',
        color: '#185FA5',
        ready: true,
      },
    ],
  },
  {
    title: 'Explora',
    subtitle: 'mueve algo y observa qué pasa',
    cards: [
      {
        id: 'concordancia',
        name: 'Laboratorio de concordancia',
        teaches: 'Cambia el número y mira quién obedece',
        tag: 'explora',
        color: '#185FA5',
        ready: true,
      },
      {
        id: 'voz',
        name: 'Activa ↔ pasiva',
        teaches: 'La misma frase, otro sujeto',
        tag: 'explora',
        color: '#534AB7',
        ready: true,
      },
    ],
  },
  {
    title: 'Practica',
    subtitle: 'retos para afianzar',
    cards: [
      {
        id: 'nucleo',
        name: 'Borra hasta el núcleo',
        teaches: 'La palabra obligatoria del sintagma',
        tag: 'reto',
        color: '#888780',
        ready: true,
      },
      {
        id: 'sujeto',
        name: 'Encuentra el sujeto',
        teaches: 'Concordancia con el verbo',
        tag: 'reto',
        color: '#185FA5',
        ready: true,
      },
      {
        id: 'cd',
        name: 'Encuentra el complemento directo',
        teaches: 'Sustituye por «lo» / «la»',
        tag: 'reto',
        color: '#3B6D11',
        ready: true,
      },
    ],
  },
  {
    title: 'Pronto',
    subtitle: '',
    cards: [
      {
        id: 'valencia',
        name: 'El verbo-motor',
        teaches: 'Cuántos huecos pide cada verbo',
        tag: 'pronto',
        color: '#993C1D',
        ready: false,
      },
      {
        id: 'orden',
        name: 'Reordena y observa',
        teaches: 'Mover cambia el énfasis, no la función',
        tag: 'pronto',
        color: '#0F6E56',
        ready: false,
      },
      {
        id: 'recursividad',
        name: 'Zoom recursivo',
        teaches: 'Una oración dentro de una palabra',
        tag: 'pronto',
        color: '#854F0B',
        ready: false,
      },
    ],
  },
]

export function Home({ onPick }: { onPick: (id: HomeTarget) => void }) {
  let i = 0
  return (
    <div className="home">
      <div className="home-head">
        <h1>Sintax</h1>
        <p>Aprende sintaxis tocando la oración.</p>
      </div>

      {SECTIONS.map((section) => (
        <div className="home-section" key={section.title}>
          <div className="home-section-head">
            <span className="home-section-title">{section.title}</span>
            {section.subtitle && <span className="home-section-sub">{section.subtitle}</span>}
          </div>
          <div className="home-list">
            {section.cards.map((c) => {
              const delay = i++ * 0.04
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  className={`home-card ${c.ready ? '' : 'home-card-soon'}`}
                  onClick={() => c.ready && onPick(c.id as HomeTarget)}
                  disabled={!c.ready}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay, duration: 0.3 }}
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
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
