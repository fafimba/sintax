import type { ClasesItem, SustituirItem, CircItem, ZoomItem } from '../types'

// --- Clases de palabras: toca y descubre (cap. 1) ---
export const CLASES: ClasesItem[] = [
  {
    words: [
      { text: 'El', clase: 'determinante', name: 'determinante', desc: 'acompaña al sustantivo y lo concreta.' },
      { text: 'perro', clase: 'sustantivo', name: 'sustantivo', desc: 'nombra seres y cosas.' },
      { text: 'negro', clase: 'adjetivo', name: 'adjetivo', desc: 'dice cómo es el sustantivo.' },
      { text: 'ladra', clase: 'verbo', name: 'verbo', desc: 'la acción o el estado.' },
      { text: 'mucho', clase: 'adverbio', name: 'adverbio', desc: 'matiza al verbo: cuánto, cómo, cuándo.' },
    ],
  },
  {
    words: [
      { text: 'Mi', clase: 'determinante', name: 'determinante', desc: 'acompaña al sustantivo: de quién es.' },
      { text: 'hermana', clase: 'sustantivo', name: 'sustantivo', desc: 'nombra a una persona.' },
      { text: 'pequeña', clase: 'adjetivo', name: 'adjetivo', desc: 'dice cómo es ella.' },
      { text: 'llegó', clase: 'verbo', name: 'verbo', desc: 'la acción.' },
      { text: 'tarde', clase: 'adverbio', name: 'adverbio', desc: 'dice cuándo.' },
    ],
  },
]

// --- Sustitución pronominal reversible: CD, CI y atributo ---
export const SUSTITUIR: Record<'cd' | 'ci' | 'atributo', SustituirItem> = {
  cd: {
    id: 'su-cd',
    groups: [
      { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
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
    targetId: 'c',
    verbId: 'v',
    pronoun: 'lo',
    note: 'El [cd] entero cabe en *una* palabra —«lo»— y salta *delante* del verbo. Esa es su prueba: lo que se deja cambiar por lo/la, es CD.',
  },
  ci: {
    id: 'su-ci',
    groups: [
      { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
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
    targetId: 'i',
    verbId: 'v',
    pronoun: 'le',
    note: 'El [ci] tiene su propio pronombre: *le* (o *les*). Esa es su huella: el CD se cambia por lo/la; el CI, por le.',
  },
  atributo: {
    id: 'su-at',
    groups: [
      {
        id: 's',
        role: 'sujeto',
        words: [
          { text: 'El', clase: 'determinante' },
          { text: 'cielo', clase: 'sustantivo' },
        ],
      },
      { id: 'v', role: 'verbo', words: [{ text: 'es', clase: 'verbo' }] },
      { id: 'a', role: 'atributo', words: [{ text: 'azul', clase: 'adjetivo' }] },
    ],
    targetId: 'a',
    verbId: 'v',
    pronoun: 'lo',
    note: 'También el [atributo] se pliega en «lo»: el cielo *lo* es. Solo pasa con *ser*, *estar* y *parecer*.',
  },
}

// --- Circunstancias: enciende, apaga y mueve (cap. CC) ---
export const CIRCUNSTANCIAS: CircItem[] = [
  {
    id: 'ci1',
    core: [
      { id: 's', role: 'sujeto', words: [{ text: 'Ana', clase: 'sustantivo' }] },
      { id: 'v', role: 'verbo', words: [{ text: 'cantó', clase: 'verbo' }] },
    ],
    extras: [
      { id: 't', q: '¿cuándo?', words: [{ text: 'ayer', clase: 'adverbio' }] },
      {
        id: 'l',
        q: '¿dónde?',
        words: [
          { text: 'en', clase: 'preposicion' },
          { text: 'el', clase: 'determinante' },
          { text: 'teatro', clase: 'sustantivo' },
        ],
      },
      {
        id: 'm',
        q: '¿cómo?',
        words: [
          { text: 'con', clase: 'preposicion' },
          { text: 'ganas', clase: 'sustantivo' },
        ],
      },
    ],
  },
]

// --- Zoom: la subordinada se abre y se cierra (cap. subordinación) ---
export const ZOOM: ZoomItem[] = [
  {
    id: 'z1',
    s: [{ text: 'Ana', clase: 'sustantivo' }],
    v: [{ text: 'sabe', clase: 'verbo' }],
    collapsed: [{ text: 'eso', clase: 'pronombre' }],
    expanded: [
      { id: 'zq', role: 'none', words: [{ text: 'que', clase: 'conjuncion' }] },
      { id: 'zv2', role: 'verbo', words: [{ text: 'vendió', clase: 'verbo' }] },
      {
        id: 'zc2',
        role: 'cd',
        words: [
          { text: 'el', clase: 'determinante' },
          { text: 'libro', clase: 'sustantivo' },
        ],
      },
    ],
    note: 'Dentro del [cd] vive una oración *entera*, con su propio verbo y su propio CD. Cajas dentro de cajas: eso es la *subordinación*.',
  },
]
