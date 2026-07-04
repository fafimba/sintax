import type { Chapter, Lesson } from '../types'
import { CONCORDANCIA } from './concordancia'
import { SUJETOS } from './sujetos'
import { VOZ } from './voz'
import { SWAP } from './swap'
import { NUCLEOS } from './nucleos'
import { ANALIZA } from './analiza'
import { CLASES, SUSTITUIR, CIRCUNSTANCIAS, ZOOM } from './explorables'
import { FRONTERA } from './frontera'
import { CRECIMIENTO } from './crecimiento'

// Filosofía del camino: cada capítulo EXPLICA con una escena animada y deja
// JUGAR con uno o más explorables (reversibles, sin fallo). Nada de exámenes
// por el medio; el único sitio donde el alumno "hace el análisis" es el
// capítulo de cierre.

// Cap 1 — las piezas: de qué CLASE es cada palabra. Escena que colorea una
// frase palabra a palabra + explorable de tocar-y-descubrir con otra frase.
const LESSON0: Lesson = {
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
    { kind: 'exploreClases', item: CLASES[1] },
  ],
}

// Cap 2 — las dos mitades. Escena del corte + el explorable de crecimiento
// (el favorito: cada palabra cae en su mitad) + colocar la frontera.
const LESSON1: Lesson = {
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
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'gato', clase: 'sustantivo' },
          ],
        },
        { id: 'p', role: 'predicado', words: [{ text: 'duerme', clase: 'verbo' }] },
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
    { kind: 'exploreCrecimiento', item: CRECIMIENTO[0] },
    // El corte con las manos: mueve el divisor y ve pintarse cada mitad.
    { kind: 'challengeFrontera', items: FRONTERA.slice(0, 2) },
  ],
}

// Cap 3 — el verbo manda (y dentro del sujeto, su núcleo). Exposición breve +
// laboratorio de concordancia + dos experimentos: borrar hasta el núcleo y
// encontrar el sujeto moviendo el número.
const LESSON2: Lesson = {
  id: 'cap2',
  title: 'El verbo y la concordancia',
  beats: [
    {
      kind: 'intro',
      title: 'El verbo y la concordancia',
      body: 'El *motor* del predicado es el verbo. Y manda más de lo que parece.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'niño', clase: 'sustantivo' },
          ],
        },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'come', clase: 'verbo' }] },
            { id: 'o', role: 'none', words: [{ text: 'pan', clase: 'sustantivo' }] },
          ],
        },
      ],
      reveal: ['s', 'v'],
      caption: 'Dentro del predicado manda una palabra: el [verbo], el *motor* de la oración.',
    },
    { kind: 'exploreConcordancia', item: CONCORDANCIA[0] },
    {
      kind: 'show',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'perro', clase: 'sustantivo' },
            { text: 'negro', clase: 'adjetivo' },
          ],
        },
        { id: 'v', role: 'verbo', words: [{ text: 'ladra', clase: 'verbo' }] },
      ],
      reveal: ['s', 'v'],
      caption:
        'Dentro del [sujeto] también manda una palabra: su *núcleo*. Es la que no se puede quitar… y la que concuerda con el verbo.',
    },
    { kind: 'challengeNucleo', item: NUCLEOS[0] },
    { kind: 'challengeSujeto', item: SUJETOS[0] },
  ],
}

// Cap 4 — el CD. La flecha «¿qué?» + el interruptor de sustitución (la prueba
// del pronombre, reversible) + swap + el giro de voz.
const LESSON3: Lesson = {
  id: 'cap3',
  title: 'El complemento directo',
  beats: [
    {
      kind: 'intro',
      title: 'El complemento directo',
      body: 'Una pieza recibe la acción del verbo. Vamos a verla de cerca.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'compró', clase: 'verbo' }] },
            {
              id: 'c',
              role: 'cd',
              words: [
                { text: 'un', clase: 'determinante' },
                { text: 'libro', clase: 'sustantivo' },
              ],
            },
          ],
        },
      ],
      reveal: ['s', 'v', 'c'],
      caption: 'El [cd] responde a *¿qué?*. ¿Cómo reconocerlo sin dudar?',
      arrow: { from: 'v', to: 'c', label: '¿qué?' },
    },
    { kind: 'exploreSustituir', item: SUSTITUIR.cd },
    { kind: 'exploreSwap', item: SWAP[0] },
    { kind: 'exploreVoz', item: VOZ[0] },
  ],
}

// Cap 5 — el CI. Dos flechas contrastadas + el interruptor con «le».
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
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'dio', clase: 'verbo' }] },
            {
              id: 'c',
              role: 'cd',
              words: [
                { text: 'un', clase: 'determinante' },
                { text: 'libro', clase: 'sustantivo' },
              ],
            },
            {
              id: 'i',
              role: 'ci',
              words: [
                { text: 'a', clase: 'preposicion' },
                { text: 'su', clase: 'determinante' },
                { text: 'hermano', clase: 'sustantivo' },
              ],
            },
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
    { kind: 'exploreSustituir', item: SUSTITUIR.ci },
  ],
}

// Cap 6 — el atributo. El verbo-puente + swap de cópulas + el pliegue en «lo».
const LESSON6: Lesson = {
  id: 'cap6',
  title: 'El atributo',
  beats: [
    {
      kind: 'intro',
      title: 'El atributo',
      body: 'Con *ser*, *estar* o *parecer* el verbo no es acción: es un *puente*. ¿Qué hay al otro lado?',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'cielo', clase: 'sustantivo' },
          ],
        },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'es', clase: 'verbo' }] },
            { id: 'a', role: 'atributo', words: [{ text: 'azul', clase: 'adjetivo' }] },
          ],
        },
      ],
      reveal: ['s', 'v', 'a'],
      caption: '«azul» es el [atributo]: dice *cómo es* el sujeto.',
      arrow: { from: 's', to: 'a', label: '¿cómo es?' },
    },
    { kind: 'exploreSwap', item: SWAP[1] },
    { kind: 'exploreSustituir', item: SUSTITUIR.atributo },
  ],
}

// Cap 7 — el CC. Una flecha de muestra y, sobre todo, el panel de encender,
// apagar y mover circunstancias.
const LESSON7: Lesson = {
  id: 'cap7',
  title: 'El complemento circunstancial',
  beats: [
    {
      kind: 'intro',
      title: 'El complemento circunstancial',
      body: 'Cuándo, dónde, cómo, por qué… las *circunstancias* que rodean a la acción.',
      cta: 'Empezar',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'cantó', clase: 'verbo' }] },
            {
              id: 'l',
              role: 'cc',
              words: [
                { text: 'en', clase: 'preposicion' },
                { text: 'el', clase: 'determinante' },
                { text: 'teatro', clase: 'sustantivo' },
              ],
            },
          ],
        },
      ],
      reveal: ['s', 'v', 'l'],
      caption: '«en el teatro» es un [cc]: dice *dónde*.',
      arrow: { from: 'v', to: 'l', label: '¿dónde?' },
    },
    { kind: 'exploreCircunstancias', item: CIRCUNSTANCIAS[0] },
  ],
}

// Cap 8 — subordinación. La escena de apertura + la caja que se abre (zoom).
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
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v1', role: 'verbo', words: [{ text: 'sabe', clase: 'verbo' }] },
            {
              id: 'cdsub',
              role: 'cd',
              children: [
                { id: 'que', role: 'none', words: [{ text: 'que', clase: 'conjuncion' }] },
                { id: 'v2', role: 'verbo', words: [{ text: 'vendió', clase: 'verbo' }] },
                {
                  id: 'cd2',
                  role: 'cd',
                  words: [
                    { text: 'el', clase: 'determinante' },
                    { text: 'libro', clase: 'sustantivo' },
                  ],
                },
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
    { kind: 'exploreZoom', item: ZOOM[0] },
  ],
}

// Cap 9 — cierre: el análisis completo, guiado y acumulativo. El único sitio
// del camino donde se pide "hacerlo tú"; todo lo demás es jugar.
const LESSON8: Lesson = {
  id: 'cap8',
  title: 'El análisis completo',
  beats: [
    {
      kind: 'intro',
      title: 'El análisis completo',
      body: 'Ya has jugado con todas las piezas. Para cerrar, monta *tú* el análisis de unas frases enteras.',
      cta: 'Vamos',
    },
    { kind: 'challengeAnaliza', items: ANALIZA },
  ],
}

// El camino, de lo simple a lo compuesto: piezas (clases) -> las dos mitades ->
// el verbo manda -> complementos uno a uno (CD, CI, atributo, CC) -> la
// recursión (subordinación) -> el análisis completo como cierre.
export const CHAPTERS: Chapter[] = [
  { id: 'cap0', num: 1, title: 'Las clases de palabras', subtitle: 'Sustantivo, verbo, adjetivo, adverbio', lesson: LESSON0 },
  { id: 'cap1', num: 2, title: 'Las dos mitades', subtitle: 'Sujeto y predicado', lesson: LESSON1 },
  { id: 'cap2', num: 3, title: 'El verbo y la concordancia', subtitle: 'El motor del predicado; el sujeto manda', lesson: LESSON2 },
  { id: 'cap3', num: 4, title: 'El complemento directo', subtitle: 'La prueba del pronombre: lo / la', lesson: LESSON3 },
  { id: 'cap5', num: 5, title: 'El complemento indirecto', subtitle: 'A quién llega la acción: le / les', lesson: LESSON5 },
  { id: 'cap6', num: 6, title: 'El atributo', subtitle: 'Ser, estar, parecer: cómo es el sujeto', lesson: LESSON6 },
  { id: 'cap7', num: 7, title: 'El complemento circunstancial', subtitle: 'Cuándo, dónde, cómo: las circunstancias', lesson: LESSON7 },
  { id: 'cap4', num: 8, title: 'Una oración dentro de otra', subtitle: 'La subordinación: cajas dentro de cajas', lesson: LESSON4 },
  { id: 'cap8', num: 9, title: 'El análisis completo', subtitle: 'Frases enteras: tú montas el análisis', lesson: LESSON8 },
]
