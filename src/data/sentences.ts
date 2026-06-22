import type { Sentence } from '../types'

// Contenido como DATOS, separado del motor desde el día 1.
// Cada frase declara sus constituyentes; el motor no sabe gramática,
// solo cuál segmento es el CD y por qué pronombre se sustituye.

export const SENTENCES: Sentence[] = [
  {
    id: 's1',
    prompt: '¿Qué compró Ana?',
    pronoun: 'lo',
    segments: [
      { id: 's1-suj', text: 'Ana', role: 'sujeto', category: 'SN' },
      { id: 's1-v', text: 'compró', role: 'verbo', category: 'SV' },
      { id: 's1-cd', text: 'un libro', role: 'cd', category: 'SN' },
    ],
  },
  {
    id: 's2',
    prompt: '¿Qué entregó el cartero?',
    pronoun: 'la',
    segments: [
      { id: 's2-suj', text: 'El cartero', role: 'sujeto', category: 'SN' },
      { id: 's2-v', text: 'entregó', role: 'verbo', category: 'SV' },
      { id: 's2-cd', text: 'la carta', role: 'cd', category: 'SN' },
    ],
  },
  {
    id: 's3',
    prompt: '¿A quién vio María?',
    pronoun: 'lo',
    segments: [
      { id: 's3-suj', text: 'María', role: 'sujeto', category: 'SN' },
      { id: 's3-v', text: 'vio', role: 'verbo', category: 'SV' },
      { id: 's3-cd', text: 'a su hermano', role: 'cd', category: 'SPrep' },
    ],
  },
  {
    id: 's4',
    prompt: '¿Qué compró Ana? Ojo: «ayer» no es lo que buscas.',
    pronoun: 'lo',
    segments: [
      { id: 's4-suj', text: 'Ana', role: 'sujeto', category: 'SN' },
      { id: 's4-v', text: 'compró', role: 'verbo', category: 'SV' },
      { id: 's4-cd', text: 'un libro', role: 'cd', category: 'SN' },
      { id: 's4-cc', text: 'ayer', role: 'cc', category: 'SAdv' },
    ],
  },
  {
    id: 's5',
    prompt: '¿Qué persiguió el gato?',
    pronoun: 'lo',
    segments: [
      { id: 's5-suj', text: 'El gato', role: 'sujeto', category: 'SN' },
      { id: 's5-v', text: 'persiguió', role: 'verbo', category: 'SV' },
      { id: 's5-cd', text: 'al ratón', role: 'cd', category: 'SPrep' },
      { id: 's5-cc', text: 'por el jardín', role: 'cc', category: 'SPrep' },
    ],
  },
  {
    id: 's6',
    prompt: '¿Qué rompieron los niños?',
    pronoun: 'la',
    segments: [
      { id: 's6-suj', text: 'Los niños', role: 'sujeto', category: 'SN' },
      { id: 's6-v', text: 'rompieron', role: 'verbo', category: 'SV' },
      { id: 's6-cd', text: 'la ventana', role: 'cd', category: 'SN' },
    ],
  },
]
