import type { VozItem } from '../types'

// Explorable de voz: un interruptor convierte activa <-> pasiva.
// El CD pasa a sujeto (cambia de color, no de significado); el sujeto
// pasa a complemento agente. Frases elegidas a mano para que la pasiva
// suene natural.
export const VOZ: VozItem[] = [
  { id: 'v1', sujeto: 'Ana', verboActiva: 'compró', cd: 'la carta', verboPasiva: 'fue comprada' },
  {
    id: 'v2',
    sujeto: 'el cartero',
    verboActiva: 'entregó',
    cd: 'el paquete',
    verboPasiva: 'fue entregado',
  },
  {
    id: 'v3',
    sujeto: 'los niños',
    verboActiva: 'rompieron',
    cd: 'la ventana',
    verboPasiva: 'fue rota',
  },
]
