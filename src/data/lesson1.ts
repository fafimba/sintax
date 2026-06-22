import type { Lesson } from '../types'

// Capítulo 1: empieza con dos conceptos (sujeto / predicado), los hace tocar,
// y va añadiendo verbo y complemento directo (color nuevo). Cada concepto
// se MUESTRA antes de PEDIRSE.
export const LESSON1: Lesson = {
  id: 'cap1',
  title: 'Las piezas de la oración',
  beats: [
    {
      kind: 'intro',
      title: 'Las piezas de la oración',
      body: 'Vamos a destripar una oración, pieza a pieza. Empezamos por sus dos mitades.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [{ id: 'a', text: 'El gato duerme', role: 'none' }],
      reveal: [],
      caption: 'Esta es una oración. Por dentro tiene una estructura. Vamos a verla.',
    },
    {
      kind: 'split',
      parts: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'p', text: 'duerme', role: 'predicado' },
      ],
      caption: 'Lo primero: toda oración se parte en dos mitades.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'p', text: 'duerme', role: 'predicado' },
      ],
      reveal: ['s'],
      caption: '«El gato» es el sujeto: de quien o de qué se habla.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'p', text: 'duerme', role: 'predicado' },
      ],
      reveal: ['s', 'p'],
      caption: '«duerme» es el predicado: lo que se dice del sujeto.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'La niña', role: 'sujeto' },
        { id: 'p', text: 'canta', role: 'predicado' },
      ],
      target: 's',
      prompt: 'Ahora tú. Toca el sujeto.',
      teach: 'Sí: «La niña» es de quien se habla.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El perro', role: 'sujeto' },
        { id: 'p', text: 'ladra muy fuerte', role: 'predicado' },
      ],
      target: 'p',
      prompt: 'Toca el predicado.',
      teach: 'Eso es: lo que se dice del sujeto.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El niño', role: 'sujeto' },
        { id: 'v', text: 'come', role: 'verbo' },
        { id: 'o', text: 'pan', role: 'none' },
      ],
      reveal: ['s', 'v'],
      caption: 'Dentro del predicado manda una palabra: el verbo, el motor de la oración.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'Los pájaros', role: 'sujeto' },
        { id: 'v', text: 'vuelan', role: 'verbo' },
      ],
      target: 'v',
      prompt: 'Toca el verbo.',
      teach: 'Justo: el motor de la oración.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'Ana', role: 'sujeto' },
        { id: 'v', text: 'compró', role: 'verbo' },
        { id: 'c', text: 'un libro', role: 'cd' },
      ],
      reveal: ['s', 'v', 'c'],
      caption: 'Y algo nuevo: «un libro» es el complemento directo, lo que recibe la acción. Llega con su color: el verde.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'v', text: 'bebe', role: 'verbo' },
        { id: 'c', text: 'leche', role: 'cd' },
      ],
      target: 'c',
      prompt: 'Toca el complemento directo.',
      teach: 'Eso es: lo que recibe la acción del verbo.',
    },
  ],
}
