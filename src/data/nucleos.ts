import type { NucleoItem } from '../types'

// Cada sintagma nominal: el alumno quita complementos hasta que solo
// queda el núcleo (la palabra insuprimible).
export const NUCLEOS: NucleoItem[] = [
  {
    id: 'n1',
    category: 'SN',
    chips: [
      { id: 'n1-1', text: 'el', isNucleus: false },
      { id: 'n1-2', text: 'libro', isNucleus: true },
      { id: 'n1-3', text: 'nuevo', isNucleus: false },
      { id: 'n1-4', text: 'de historia', isNucleus: false },
    ],
  },
  {
    id: 'n2',
    category: 'SN',
    chips: [
      { id: 'n2-1', text: 'una', isNucleus: false },
      { id: 'n2-2', text: 'película', isNucleus: true },
      { id: 'n2-3', text: 'muy larga', isNucleus: false },
    ],
  },
  {
    id: 'n3',
    category: 'SN',
    chips: [
      { id: 'n3-1', text: 'la', isNucleus: false },
      { id: 'n3-2', text: 'casa', isNucleus: true },
      { id: 'n3-3', text: 'azul', isNucleus: false },
      { id: 'n3-4', text: 'de la esquina', isNucleus: false },
    ],
  },
  {
    id: 'n4',
    category: 'SN',
    chips: [
      { id: 'n4-1', text: 'mi', isNucleus: false },
      { id: 'n4-2', text: 'mejor', isNucleus: false },
      { id: 'n4-3', text: 'amigo', isNucleus: true },
      { id: 'n4-4', text: 'del colegio', isNucleus: false },
    ],
  },
]
