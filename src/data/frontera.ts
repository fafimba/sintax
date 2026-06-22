import type { FronteraItem } from '../types'

// Banco de frases para la mecánica "frontera" (coloca el corte sujeto|predicado).
// Precondición de autoría (gate del panel de diseño): sujeto EXPLÍCITO,
// ANTEPUESTO y CONTIGUO -> el corte es único y 0 < boundary < words.length.
// Variedad deliberada de boundary (1 y 2) y de número (singular/plural) para
// romper la idea de que "el sujeto es siempre la primera palabra".
export const FRONTERA: FronteraItem[] = [
  { words: ['Ana', 'compró', 'un', 'libro'], boundary: 1, sujetoPro: 'ella' },
  { words: ['El', 'cartero', 'entregó', 'la', 'carta'], boundary: 2, sujetoPro: 'él' },
  { words: ['Los', 'niños', 'rompieron', 'la', 'ventana'], boundary: 2, sujetoPro: 'ellos' },
  { words: ['María', 'vio', 'a', 'su', 'hermano'], boundary: 1, sujetoPro: 'ella' },
  { words: ['El', 'gato', 'bebe', 'leche'], boundary: 2, sujetoPro: 'él' },
  { words: ['Mi', 'vecino', 'riega', 'las', 'plantas'], boundary: 2, sujetoPro: 'él' },
]
