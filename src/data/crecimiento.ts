import type { CrecimientoItem } from '../types'

// Banco del explorable "crecimiento". base = núcleo (no se quita); adjuncts =
// trozos que se suman/restan en orden. Cada adyacente es un CHUNK (una pieza
// con sentido), no una palabra suelta, para que crezca en unidades legibles.
export const CRECIMIENTO: CrecimientoItem[] = [
  {
    sujeto: { base: 'El perro', adjuncts: ['negro', 'del vecino'], pro: 'él' },
    predicado: { base: 'ladra', adjuncts: ['muy fuerte', 'de noche'] },
  },
]
