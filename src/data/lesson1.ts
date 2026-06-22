import type { Lesson } from '../types'
import { FRONTERA } from './frontera'
import { CRECIMIENTO } from './crecimiento'

// Capítulo 1. La apertura (sujeto/predicado) es UNA escena continua: la frase
// no desaparece entre pasos; se separa y se colorea pieza a pieza.
// Marca de texto: *negrita* y [rol] = chip de color del elemento.
export const LESSON1: Lesson = {
  id: 'cap1',
  title: 'Las dos mitades',
  beats: [
    {
      kind: 'intro',
      title: 'Las dos mitades',
      body: 'Toda oración se parte en *dos mitades*: el sujeto y el predicado. Vamos a verlas.',
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
      kind: 'exploreCrecimiento',
      item: CRECIMIENTO[0],
    },
    {
      kind: 'challengeFrontera',
      items: FRONTERA.slice(0, 3),
    },
  ],
}
