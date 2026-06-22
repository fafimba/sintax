import type { Chapter, Lesson } from '../types'
import { LESSON1 } from './lesson1'
import { CONCORDANCIA } from './concordancia'
import { SUJETOS } from './sujetos'
import { SENTENCES } from './sentences'
import { VOZ } from './voz'

// Cap 2: integra el explorable de concordancia + el reto de encontrar el sujeto.
const LESSON2: Lesson = {
  id: 'cap2',
  title: 'La concordancia',
  beats: [
    {
      kind: 'intro',
      title: 'La concordancia',
      body: 'El sujeto manda sobre el verbo: si el sujeto cambia, el verbo le sigue. Vamos a moverlo y verlo.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El perro', role: 'sujeto' },
        { id: 'v', text: 'ladra', role: 'verbo' },
      ],
      reveal: ['s', 'v'],
      caption: 'Ya conoces el sujeto y el verbo. Fíjate ahora en cómo se relacionan.',
    },
    { kind: 'exploreConcordancia', item: CONCORDANCIA[0] },
    { kind: 'challengeSujeto', item: SUJETOS[0] },
  ],
}

// Cap 3: integra el reto del CD (sustitución) + el explorable de voz.
const LESSON3: Lesson = {
  id: 'cap3',
  title: 'El complemento directo',
  beats: [
    {
      kind: 'intro',
      title: 'El complemento directo',
      body: 'Lo que recibe la acción del verbo. Y un truco infalible para reconocerlo: el pronombre.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        { id: 'v', text: 'compró', role: 'verbo' },
        { id: 'c', text: 'un libro', role: 'cd' },
      ],
      reveal: ['s', 'v', 'c'],
      caption: '«un libro» es el complemento directo. ¿Cómo lo reconocemos sin dudar? Pruébalo.',
    },
    { kind: 'challengeCd', sentence: SENTENCES[0] },
    { kind: 'exploreVoz', item: VOZ[0] },
  ],
}

export const CHAPTERS: Chapter[] = [
  { id: 'cap1', num: 1, title: 'Las piezas de la oración', subtitle: 'Sujeto, predicado, verbo y CD', lesson: LESSON1 },
  { id: 'cap2', num: 2, title: 'La concordancia', subtitle: 'El sujeto manda sobre el verbo', lesson: LESSON2 },
  { id: 'cap3', num: 3, title: 'El complemento directo', subtitle: 'Reconócelo con el pronombre', lesson: LESSON3 },
]
