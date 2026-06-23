import type { Chapter, Lesson } from '../types'
import { LESSON0 } from './lesson0'
import { LESSON1 } from './lesson1'
import { CONCORDANCIA } from './concordancia'
import { SUJETOS } from './sujetos'
import { SENTENCES } from './sentences'
import { VOZ } from './voz'
import { SWAP } from './swap'

// Cap 2: el verbo (núcleo del predicado) + el explorable de concordancia + el
// reto de encontrar el sujeto.
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
    {
      kind: 'tap',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'Los', clase: 'determinante' },
            { text: 'pájaros', clase: 'sustantivo' },
          ],
        },
        { id: 'v', role: 'verbo', words: [{ text: 'vuelan', clase: 'verbo' }] },
      ],
      target: 'v',
      prompt: 'Toca el [verbo].',
      teach: 'Justo: el *motor* de la oración.',
    },
    {
      kind: 'show',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'perro', clase: 'sustantivo' },
          ],
        },
        {
          id: 'pred',
          role: 'predicado',
          children: [{ id: 'v', role: 'verbo', words: [{ text: 'ladra', clase: 'verbo' }] }],
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
      caption: '¿Cómo reconocemos el [cd] sin dudar?',
      arrow: { from: 'v', to: 'c', label: '¿qué?' },
    },
    { kind: 'challengeCd', sentence: SENTENCES[0] },
    { kind: 'exploreSwap', item: SWAP[0] },
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
    {
      kind: 'tap',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'cartero', clase: 'sustantivo' },
          ],
        },
        { id: 'v', role: 'verbo', words: [{ text: 'entregó', clase: 'verbo' }] },
        {
          id: 'c',
          role: 'cd',
          words: [
            { text: 'una', clase: 'determinante' },
            { text: 'carta', clase: 'sustantivo' },
          ],
        },
        {
          id: 'i',
          role: 'ci',
          words: [
            { text: 'a', clase: 'preposicion' },
            { text: 'la', clase: 'determinante' },
            { text: 'vecina', clase: 'sustantivo' },
          ],
        },
      ],
      target: 'i',
      prompt: 'Toca el [ci].',
      teach: 'Sí: «a la vecina» es a *quién* llega la carta.',
    },
    {
      kind: 'tap',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'El', clase: 'determinante' },
            { text: 'cartero', clase: 'sustantivo' },
          ],
        },
        { id: 'v', role: 'verbo', words: [{ text: 'entregó', clase: 'verbo' }] },
        {
          id: 'c',
          role: 'cd',
          words: [
            { text: 'una', clase: 'determinante' },
            { text: 'carta', clase: 'sustantivo' },
          ],
        },
        {
          id: 'i',
          role: 'ci',
          words: [
            { text: 'a', clase: 'preposicion' },
            { text: 'la', clase: 'determinante' },
            { text: 'vecina', clase: 'sustantivo' },
          ],
        },
      ],
      target: 'c',
      prompt: 'En la misma frase: toca el [cd].',
      teach: 'Eso es: *qué* entregó.',
    },
    {
      kind: 'show',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'i', role: 'ci', words: [{ text: 'le', clase: 'pronombre' }] },
            { id: 'v', role: 'verbo', words: [{ text: 'dio', clase: 'verbo' }] },
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
      reveal: ['s', 'v', 'c', 'i'],
      caption: 'Prueba: el [ci] se cambia por *le* / *les*.',
    },
  ],
}

// Cap 6: el atributo. Con ser/estar/parecer el verbo es un PUENTE; el atributo
// describe al sujeto. Por eso la flecha va sujeto->atributo "¿cómo es?" (no
// verbo->X como en CD/CI). Regla: se sustituye por "lo".
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
    {
      kind: 'tap',
      groups: [
        {
          id: 's',
          role: 'sujeto',
          words: [
            { text: 'La', clase: 'determinante' },
            { text: 'sopa', clase: 'sustantivo' },
          ],
        },
        { id: 'v', role: 'verbo', words: [{ text: 'está', clase: 'verbo' }] },
        { id: 'a', role: 'atributo', words: [{ text: 'caliente', clase: 'adjetivo' }] },
      ],
      target: 'a',
      prompt: 'Toca el [atributo].',
      teach: 'Sí: «caliente» dice *cómo está* la sopa.',
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
            { id: 'a', role: 'atributo', words: [{ text: 'lo', clase: 'pronombre' }] },
            { id: 'v', role: 'verbo', words: [{ text: 'es', clase: 'verbo' }] },
          ],
        },
      ],
      reveal: ['s', 'v', 'a'],
      caption: 'Prueba: el [atributo] se cambia por *lo*. El cielo *lo* es.',
    },
  ],
}

// Cap 7: el complemento circunstancial. No tiene pronombre fijo; lo que lo
// define es la VARIEDAD de circunstancias (cuándo/dónde/cómo). Periférico, no
// "opcional": mismo peso visual. Puede haber varios -> dos flechas.
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
    {
      kind: 'show',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        {
          id: 'pred',
          role: 'predicado',
          children: [
            { id: 'v', role: 'verbo', words: [{ text: 'cantó', clase: 'verbo' }] },
            { id: 't', role: 'cc', words: [{ text: 'ayer', clase: 'adverbio' }] },
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
      reveal: ['s', 'v', 't', 'l'],
      caption: 'Puede haber *varios*: cada uno, una circunstancia.',
      arrow: [
        { from: 'v', to: 't', label: '¿cuándo?' },
        { from: 'v', to: 'l', label: '¿dónde?' },
      ],
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        { id: 'v', role: 'verbo', words: [{ text: 'compró', clase: 'verbo' }] },
        { id: 'c', role: 'cd', words: [{ text: 'pan', clase: 'sustantivo' }] },
        { id: 'cc', role: 'cc', words: [{ text: 'ayer', clase: 'adverbio' }] },
      ],
      target: 'cc',
      prompt: 'Toca el [cc].',
      teach: 'Eso: «ayer» dice *cuándo*.',
    },
    {
      kind: 'tap',
      groups: [
        { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
        { id: 'v', role: 'verbo', words: [{ text: 'compró', clase: 'verbo' }] },
        { id: 'c', role: 'cd', words: [{ text: 'pan', clase: 'sustantivo' }] },
        { id: 'cc', role: 'cc', words: [{ text: 'ayer', clase: 'adverbio' }] },
      ],
      target: 'c',
      prompt: 'En la misma frase: toca el [cd].',
      teach: 'Eso: *qué* compró.',
    },
  ],
}

export const CHAPTERS: Chapter[] = [
  { id: 'cap0', num: 1, title: 'Las clases de palabras', subtitle: 'Sustantivo, verbo, adjetivo, adverbio', lesson: LESSON0 },
  { id: 'cap1', num: 2, title: 'Las dos mitades', subtitle: 'Sujeto y predicado', lesson: LESSON1 },
  { id: 'cap2', num: 3, title: 'El verbo y la concordancia', subtitle: 'El motor del predicado; el sujeto manda', lesson: LESSON2 },
  { id: 'cap3', num: 4, title: 'El complemento directo', subtitle: 'Reconócelo con el pronombre', lesson: LESSON3 },
  { id: 'cap4', num: 5, title: 'Una oración dentro de otra', subtitle: 'La subordinación: cajas dentro de cajas', lesson: LESSON4 },
  { id: 'cap5', num: 6, title: 'El complemento indirecto', subtitle: 'A quién llega la acción: le / les', lesson: LESSON5 },
  { id: 'cap6', num: 7, title: 'El atributo', subtitle: 'Ser, estar, parecer: cómo es el sujeto', lesson: LESSON6 },
  { id: 'cap7', num: 8, title: 'El complemento circunstancial', subtitle: 'Cuándo, dónde, cómo: las circunstancias', lesson: LESSON7 },
]
