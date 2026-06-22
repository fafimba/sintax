import type { ConcItem } from '../types'

// Explorable de número: al cambiar el número del sujeto, el artículo,
// el adjetivo y el verbo le obedecen. La cola (CD/CC) NO cambia.
// Solo NÚMERO (el género no llega al verbo, así que se trata aparte).
export const CONCORDANCIA: ConcItem[] = [
  {
    id: 'co1',
    art: { s: 'El', p: 'Los' },
    nucleo: { s: 'perro', p: 'perros' },
    adj: { s: 'negro', p: 'negros' },
    verbo: { s: 'persigue', p: 'persiguen' },
    cola: 'al gato',
  },
  {
    id: 'co2',
    art: { s: 'La', p: 'Las' },
    nucleo: { s: 'niña', p: 'niñas' },
    verbo: { s: 'canta', p: 'cantan' },
    cola: 'en el coro',
  },
  {
    id: 'co3',
    art: { s: 'Mi', p: 'Mis' },
    nucleo: { s: 'vecino', p: 'vecinos' },
    adj: { s: 'amable', p: 'amables' },
    verbo: { s: 'saluda', p: 'saludan' },
    cola: 'cada mañana',
  },
]
