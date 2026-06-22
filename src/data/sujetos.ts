import type { SujetoItem } from '../types'

// El alumno cambia el número de cada grupo. Solo el sujeto "arrastra"
// al verbo: al cambiarlo, el verbo cambia con él (concordancia).
export const SUJETOS: SujetoItem[] = [
  {
    id: 'su1',
    parts: [
      { id: 'su1-s', singular: 'El perro', plural: 'Los perros', kind: 'sujeto' },
      { id: 'su1-v', singular: 'persigue', plural: 'persiguen', kind: 'verbo' },
      { id: 'su1-d', singular: 'al gato', plural: 'a los gatos', kind: 'distractor' },
    ],
  },
  {
    id: 'su2',
    parts: [
      { id: 'su2-s', singular: 'La niña', plural: 'Las niñas', kind: 'sujeto' },
      { id: 'su2-v', singular: 'lee', plural: 'leen', kind: 'verbo' },
      { id: 'su2-d', singular: 'un cuento', plural: 'unos cuentos', kind: 'distractor' },
    ],
  },
  {
    id: 'su3',
    parts: [
      { id: 'su3-s', singular: 'mi vecino', plural: 'mis vecinos', kind: 'sujeto' },
      { id: 'su3-v', singular: 'riega', plural: 'riegan', kind: 'verbo' },
      { id: 'su3-d', singular: 'la planta', plural: 'las plantas', kind: 'distractor' },
    ],
  },
]
