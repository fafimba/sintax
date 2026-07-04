import type { AnalizaItem } from '../types'

// Ronda final: análisis guiado de frases completas. Cada frase se analiza en
// el ORDEN canónico (sujeto -> verbo -> complementos) y lo acertado queda
// marcado en pantalla. Las frases suben de dificultad y varían el tipo de
// verbo: transitivo, ditransitivo, copulativo e intransitivo (sin CD).
export const ANALIZA: AnalizaItem[] = [
  {
    id: 'an1',
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
      { id: 't', role: 'cc', words: [{ text: 'ayer', clase: 'adverbio' }] },
    ],
    steps: [
      { target: 's', prompt: '¿De quién se habla? Toca el [sujeto].', teach: 'Sí: «Ana» realiza la acción.' },
      { target: 'v', prompt: 'Ahora el *motor*: toca el [verbo].', teach: 'Eso: «compró» es la acción.' },
      { target: 'c', prompt: '¿*Qué* compró? Toca el [cd].', teach: 'Justo: «un libro» → *lo* compró.' },
      { target: 't', prompt: '¿*Cuándo*? Toca el [cc].', teach: 'Eso es: «ayer», la circunstancia de tiempo.' },
    ],
  },
  {
    id: 'an2',
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
    steps: [
      { target: 's', prompt: 'Toca el [sujeto].', teach: 'Sí: «El cartero».' },
      { target: 'v', prompt: 'Toca el [verbo].', teach: 'Eso: «entregó».' },
      { target: 'c', prompt: '¿*Qué* entregó? Toca el [cd].', teach: 'Justo: «una carta» → *la* entregó.' },
      { target: 'i', prompt: '¿*A quién* llegó? Toca el [ci].', teach: 'Eso es: «a la vecina» → *le* entregó la carta.' },
    ],
  },
  {
    id: 'an3',
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
    steps: [
      { target: 's', prompt: 'Toca el [sujeto].', teach: 'Sí: «La sopa».' },
      { target: 'v', prompt: 'Toca el [verbo]. Ojo: aquí no es acción…', teach: '«está» es un *puente*: ser, estar, parecer.' },
      { target: 'a', prompt: '¿*Cómo está* la sopa? Toca el [atributo].', teach: 'Eso: «caliente» → la sopa *lo* está.' },
    ],
  },
  {
    id: 'an4',
    groups: [
      {
        id: 's',
        role: 'sujeto',
        words: [
          { text: 'Los', clase: 'determinante' },
          { text: 'pájaros', clase: 'sustantivo' },
        ],
      },
      { id: 'v', role: 'verbo', words: [{ text: 'cantan', clase: 'verbo' }] },
      {
        id: 'l',
        role: 'cc',
        words: [
          { text: 'en', clase: 'preposicion' },
          { text: 'el', clase: 'determinante' },
          { text: 'parque', clase: 'sustantivo' },
        ],
      },
      {
        id: 't',
        role: 'cc',
        words: [
          { text: 'por', clase: 'preposicion' },
          { text: 'la', clase: 'determinante' },
          { text: 'mañana', clase: 'sustantivo' },
        ],
      },
    ],
    steps: [
      { target: 's', prompt: 'Última frase. Toca el [sujeto].', teach: 'Sí: «Los pájaros».' },
      { target: 'v', prompt: 'Toca el [verbo].', teach: 'Eso: «cantan». Aquí no hay CD: nada recibe la acción.' },
      { target: 'l', prompt: '¿*Dónde* cantan? Toca ese [cc].', teach: 'Justo: «en el parque», circunstancia de lugar.' },
      { target: 't', prompt: '¿*Cuándo*? Toca el otro [cc].', teach: 'Eso es: «por la mañana». Puede haber varios CC.' },
    ],
  },
]
