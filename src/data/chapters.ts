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
      body: 'Mueve una pieza… y mira qué se mueve con ella.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El perro', role: 'sujeto' },
        {
          id: 'pred',
          text: 'ladra',
          role: 'predicado',
          children: [{ id: 'v', text: 'ladra', role: 'verbo' }],
        },
      ],
      reveal: ['s', 'v'],
      caption: 'El [sujeto] y el [verbo]. ¿Quién manda sobre quién?',
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
      body: 'Una pieza recibe la acción del verbo. Vamos a cazarla.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        {
          id: 'pred',
          text: 'compró un libro',
          role: 'predicado',
          children: [
            { id: 'v', text: 'compró', role: 'verbo' },
            { id: 'c', text: 'un libro', role: 'cd' },
          ],
        },
      ],
      reveal: ['s', 'v', 'c'],
      caption: '¿Cómo reconocemos el [cd] sin dudar?',
      arrow: { from: 'v', to: 'c', label: '¿qué?' },
    },
    { kind: 'challengeCd', sentence: SENTENCES[0] },
    { kind: 'exploreVoz', item: VOZ[0] },
  ],
}

// Cap 4: subordinación — una oración dentro de otra (corchetes anidados).
const LESSON4: Lesson = {
  id: 'cap4',
  title: 'Una oración dentro de otra',
  beats: [
    {
      kind: 'intro',
      title: 'Una oración dentro de otra',
      body: 'A veces una pieza de la oración no es una palabra… es *otra oración entera*.',
      cta: 'Empezar',
    },
    {
      kind: 'scene',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        {
          id: 'pred',
          text: 'sabe que vendió el libro',
          role: 'predicado',
          children: [
            { id: 'v1', text: 'sabe', role: 'verbo' },
            {
              id: 'cdsub',
              text: 'que vendió el libro',
              role: 'cd',
              children: [
                { id: 'que', text: 'que', role: 'none' },
                { id: 'v2', text: 'vendió', role: 'verbo' },
                { id: 'cd2', text: 'el libro', role: 'cd' },
              ],
            },
          ],
        },
      ],
      steps: [
        {
          reveal: ['s', 'v1'],
          separated: true,
          caption: 'Ana sabe algo. Lo que sabe es el [cd] del verbo «sabe».',
        },
        {
          reveal: ['s', 'v1', 'cdsub'],
          separated: true,
          caption: 'Pero ese [cd] no es una palabra: es una *oración entera*.',
        },
        {
          reveal: ['s', 'v1', 'cdsub', 'v2', 'cd2'],
          separated: true,
          caption:
            'Y dentro tiene su propio [verbo] y su propio [cd]. Una oración cabe dentro de otra: la *subordinación*.',
        },
      ],
    },
  ],
}

// Cap 5: el complemento indirecto. Dos flechas contrastadas (verbo->CD "¿qué?"
// y verbo->CI "¿a quién?") hacen el trabajo que haría un párrafo. La regla
// le/les va al final como prueba (distingue del CD = lo/la).
const LESSON5: Lesson = {
  id: 'cap5',
  title: 'El complemento indirecto',
  beats: [
    {
      kind: 'intro',
      title: 'El complemento indirecto',
      body: 'La acción produce algo… y va a parar a *alguien*. ¿A quién?',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        {
          id: 'pred',
          text: 'dio un libro a su hermano',
          role: 'predicado',
          children: [
            { id: 'v', text: 'dio', role: 'verbo' },
            { id: 'c', text: 'un libro', role: 'cd' },
            { id: 'i', text: 'a su hermano', role: 'ci' },
          ],
        },
      ],
      reveal: ['s', 'v', 'c', 'i'],
      caption: 'Lo que se da es el [cd]. A quién llega, el [ci].',
      arrow: [
        { from: 'v', to: 'c', label: '¿qué?' },
        { from: 'v', to: 'i', label: '¿a quién?' },
      ],
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El cartero', role: 'sujeto' },
        { id: 'v', text: 'entregó', role: 'verbo' },
        { id: 'c', text: 'una carta', role: 'cd' },
        { id: 'i', text: 'a la vecina', role: 'ci' },
      ],
      target: 'i',
      prompt: 'Toca el [ci].',
      teach: 'Sí: «a la vecina» es a *quién* llega la carta.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El cartero', role: 'sujeto' },
        { id: 'v', text: 'entregó', role: 'verbo' },
        { id: 'c', text: 'una carta', role: 'cd' },
        { id: 'i', text: 'a la vecina', role: 'ci' },
      ],
      target: 'c',
      prompt: 'En la misma frase: toca el [cd].',
      teach: 'Eso es: *qué* entregó.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        {
          id: 'pred',
          text: 'le dio un libro',
          role: 'predicado',
          children: [
            { id: 'i', text: 'le', role: 'ci' },
            { id: 'v', text: 'dio', role: 'verbo' },
            { id: 'c', text: 'un libro', role: 'cd' },
          ],
        },
      ],
      reveal: ['s', 'v', 'c', 'i'],
      caption: 'Prueba: el [ci] se cambia por *le* / *les*.',
    },
  ],
}

export const CHAPTERS: Chapter[] = [
  { id: 'cap1', num: 1, title: 'Las piezas de la oración', subtitle: 'Sujeto, predicado, verbo y CD', lesson: LESSON1 },
  { id: 'cap2', num: 2, title: 'La concordancia', subtitle: 'El sujeto manda sobre el verbo', lesson: LESSON2 },
  { id: 'cap3', num: 3, title: 'El complemento directo', subtitle: 'Reconócelo con el pronombre', lesson: LESSON3 },
  { id: 'cap4', num: 4, title: 'Una oración dentro de otra', subtitle: 'La subordinación: cajas dentro de cajas', lesson: LESSON4 },
  { id: 'cap5', num: 5, title: 'El complemento indirecto', subtitle: 'A quién llega la acción: le / les', lesson: LESSON5 },
]
