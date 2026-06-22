import type { Lesson } from '../types'

// Capítulo 1. La apertura (sujeto/predicado) es UNA escena continua: la frase
// no desaparece entre pasos; se separa y se colorea pieza a pieza.
// Marca de texto: *negrita* y [rol] = chip de color del elemento.
export const LESSON1: Lesson = {
  id: 'cap1',
  title: 'Las piezas de la oración',
  beats: [
    {
      kind: 'intro',
      title: 'Las piezas de la oración',
      body: 'Vamos a destripar una oración, pieza a pieza. Empezamos por sus *dos mitades*.',
      cta: 'Empezar',
    },
    {
      kind: 'scene',
      groups: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'p', text: 'duerme', role: 'predicado' },
      ],
      steps: [
        { reveal: [], caption: 'Esta es una oración. Por dentro tiene una estructura.' },
        { reveal: [], separated: true, caption: 'Toda oración se parte en *dos mitades*.' },
        {
          reveal: ['s'],
          separated: true,
          caption: '«El gato» es el [sujeto]: de *quién* o de *qué* se habla.',
        },
        {
          reveal: ['s', 'p'],
          separated: true,
          caption: '«duerme» es el [predicado]: lo que se *dice* del sujeto.',
        },
      ],
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'La niña', role: 'sujeto' },
        { id: 'p', text: 'canta', role: 'predicado' },
      ],
      target: 's',
      prompt: 'Ahora tú. Toca el [sujeto].',
      teach: 'Sí: «La niña» es de *quién* se habla.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El perro', role: 'sujeto' },
        { id: 'p', text: 'ladra muy fuerte', role: 'predicado' },
      ],
      target: 'p',
      prompt: 'Toca el [predicado].',
      teach: 'Eso es: lo que se *dice* del sujeto.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', text: 'El niño', role: 'sujeto' },
        {
          id: 'pred',
          text: 'come pan',
          role: 'predicado',
          children: [
            { id: 'v', text: 'come', role: 'verbo' },
            { id: 'o', text: 'pan', role: 'none' },
          ],
        },
      ],
      reveal: ['s', 'v'],
      caption: 'Dentro del predicado manda una palabra: el [verbo], el *motor* de la oración.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'Los pájaros', role: 'sujeto' },
        { id: 'v', text: 'vuelan', role: 'verbo' },
      ],
      target: 'v',
      prompt: 'Toca el [verbo].',
      teach: 'Justo: el *motor* de la oración.',
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
      caption: 'Algo nuevo: «un libro» es el [cd].',
      arrow: { from: 'v', to: 'c', label: '¿qué?' },
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', text: 'El gato', role: 'sujeto' },
        { id: 'v', text: 'bebe', role: 'verbo' },
        { id: 'c', text: 'leche', role: 'cd' },
      ],
      target: 'c',
      prompt: 'Toca el [cd].',
      teach: 'Eso es: lo que *recibe* la acción del verbo.',
    },
  ],
}
