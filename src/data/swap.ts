import type { SwapItem } from '../types'

// Banco del explorable "swap". Regla de oro (gate del panel): las alternativas
// de un hueco NUNCA cruzan una concordancia, así que CUALQUIER combinación es
// gramatical. Aquí: sujetos todos 3ª persona del singular; verbos todos 3ª sing.
// transitivos que admiten un CD animado; CD siempre "a + animado singular".
// 4 sujetos x 5 verbos x 3 CD = 60 frases correctas con ~12 palabras a mano.
export const SWAP: SwapItem[] = [
  {
    slots: [
      { role: 'sujeto', alts: ['El gato', 'El perro', 'La niña', 'Mi vecino'] },
      { role: 'verbo', alts: ['persigue', 'muerde', 'mira', 'huele', 'atrapa'] },
      { role: 'cd', alts: ['al ratón', 'a la gallina', 'al cartero'] },
    ],
  },
  // Atributo: los tres verbos-puente son intercambiables (y solo ellos); el
  // atributo cambia de palabra pero sigue diciendo cómo es/está el sujeto.
  {
    slots: [
      { role: 'sujeto', alts: ['La sopa', 'La casa', 'Mi calle'] },
      { role: 'verbo', alts: ['está', 'es', 'parece'] },
      { role: 'atributo', alts: ['caliente', 'enorme', 'tranquila'] },
    ],
  },
]
