// Sistema de color en dos ejes:
//   relleno = FUNCIÓN sintáctica (este mapa)
//   borde/etiqueta = CATEGORÍA del sintagma (SN, SPrep, ...)
// El color de función es la RECOMPENSA de descubrir, no una pista: las cajas
// nacen neutras y se tiñen cuando el alumno identifica su función.

export const fn = {
  sujeto: { fill: '#B5D4F4', text: '#042C53', border: '#185FA5' },
  cd: { fill: '#C0DD97', text: '#173404', border: '#3B6D11' },
  ci: { fill: '#FAC775', text: '#412402', border: '#854F0B' },
  cc: { fill: '#CECBF6', text: '#26215C', border: '#534AB7' },
  atributo: { fill: '#9FE1CB', text: '#04342C', border: '#0F6E56' },
} as const

export const neutral = { fill: '#F1EFE8', text: '#5F5E5A', border: '#C9C7BD' }
export const errorColor = { fill: '#FCEBEB', text: '#A32D2D', border: '#E24B4A' }
export const ok = '#3B6D11'

// Elementos estructurales (no "función-hoja"). El predicado y su núcleo, el
// verbo, comparten familia cálida (coral): el verbo es el corazón del predicado.
// El verbo además lleva forma propia (pico de "play").
export const elem = {
  predicado: { fill: '#F5C4B3', text: '#4A1B0C', border: '#C0552B' },
  verbo: { fill: '#D85A30', text: '#FFFFFF', border: '#993C1D' },
} as const
