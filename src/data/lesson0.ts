import type { Lesson } from '../types'

// Capítulo 0 — el PRIMER de clases de palabra. Antes de las funciones (sujeto,
// predicado...), las piezas: de qué CLASE es cada palabra. Las palabras van
// sin corchete (todavía no hay funciones); solo el color de su clase.
// Las 4 clases de contenido se presentan; el determinante queda en gris (glue).
export const LESSON0: Lesson = {
  id: 'cap0',
  title: 'Las clases de palabras',
  beats: [
    {
      kind: 'intro',
      title: 'Las clases de palabras',
      body: 'Antes de las funciones, las *piezas*. Cada palabra es de una clase, y la reconocerás por su *color*.',
      cta: 'Empezar',
    },
    {
      kind: 'scene',
      groups: [
        { id: 'w1', role: 'none', words: [{ text: 'El', clase: 'determinante' }] },
        { id: 'w2', role: 'none', words: [{ text: 'perro', clase: 'sustantivo' }] },
        { id: 'w3', role: 'none', words: [{ text: 'negro', clase: 'adjetivo' }] },
        { id: 'w4', role: 'none', words: [{ text: 'ladra', clase: 'verbo' }] },
        { id: 'w5', role: 'none', words: [{ text: 'mucho', clase: 'adverbio' }] },
      ],
      steps: [
        { reveal: [], caption: 'Cinco palabras. Cada una es de una *clase*.' },
        { reveal: ['w2'], caption: '«perro» es un *sustantivo*: nombra seres o cosas.' },
        { reveal: ['w2', 'w3'], caption: '«negro» es un *adjetivo*: dice *cómo* es algo.' },
        { reveal: ['w2', 'w3', 'w4'], caption: '«ladra» es un *verbo*: una acción o un estado.' },
        {
          reveal: ['w2', 'w3', 'w4', 'w5'],
          caption: '«mucho» es un *adverbio*: dice *cuánto*, *cómo* o *cuándo*.',
        },
      ],
    },
    {
      kind: 'tap',
      groups: [
        { id: 'a', role: 'none', words: [{ text: 'La', clase: 'determinante' }] },
        { id: 'b', role: 'none', words: [{ text: 'niña', clase: 'sustantivo' }] },
        { id: 'c', role: 'none', words: [{ text: 'canta', clase: 'verbo' }] },
      ],
      target: 'c',
      prompt: 'Toca el *verbo*.',
      teach: 'Sí: «canta» es un verbo, una acción.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 'a', role: 'none', words: [{ text: 'El', clase: 'determinante' }] },
        { id: 'b', role: 'none', words: [{ text: 'perro', clase: 'sustantivo' }] },
        { id: 'c', role: 'none', words: [{ text: 'corre', clase: 'verbo' }] },
      ],
      target: 'b',
      prompt: 'Toca el *sustantivo*.',
      teach: 'Eso es: «perro» nombra un ser.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 'a', role: 'none', words: [{ text: 'El', clase: 'determinante' }] },
        { id: 'b', role: 'none', words: [{ text: 'café', clase: 'sustantivo' }] },
        { id: 'c', role: 'none', words: [{ text: 'está', clase: 'verbo' }] },
        { id: 'd', role: 'none', words: [{ text: 'caliente', clase: 'adjetivo' }] },
      ],
      target: 'd',
      prompt: 'Toca el *adjetivo*.',
      teach: 'Justo: «caliente» dice cómo está.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 'a', role: 'none', words: [{ text: 'El', clase: 'determinante' }] },
        { id: 'b', role: 'none', words: [{ text: 'tren', clase: 'sustantivo' }] },
        { id: 'c', role: 'none', words: [{ text: 'llegó', clase: 'verbo' }] },
        { id: 'd', role: 'none', words: [{ text: 'tarde', clase: 'adverbio' }] },
      ],
      target: 'd',
      prompt: 'Toca el *adverbio*.',
      teach: 'Eso: «tarde» dice cuándo.',
    },
  ],
}
