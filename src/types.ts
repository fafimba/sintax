export type Role = 'sujeto' | 'verbo' | 'cd' | 'ci' | 'cc' | 'atributo'

export type Category = 'SN' | 'SV' | 'SPrep' | 'SAdv' | 'SAdj'

export interface Segment {
  id: string
  text: string
  role: Role
  category?: Category
}

export interface Sentence {
  id: string
  /** La pregunta/consigna que se muestra arriba. */
  prompt: string
  /** El pronombre por el que se sustituye el CD: lo / la / los / las. */
  pronoun: string
  /** Segmentos en orden. Exactamente uno con role 'verbo' y uno con role 'cd'. */
  segments: Segment[]
}

// --- Mecánica: "Borra hasta el núcleo" ---
export interface NucleoChip {
  id: string
  text: string
  isNucleus: boolean
}
export interface NucleoItem {
  id: string
  category: Category
  chips: NucleoChip[]
}

// --- Mecánica: "Encuentra el sujeto" (concordancia) ---
export type PartKind = 'verbo' | 'sujeto' | 'distractor'
export interface SujetoPart {
  id: string
  singular: string
  plural: string
  kind: PartKind
}
export interface SujetoItem {
  id: string
  parts: SujetoPart[]
}

// --- Explorable: "Laboratorio de concordancia" (solo número) ---
export interface NumForm {
  s: string
  p: string
}
export interface ConcItem {
  id: string
  art?: NumForm // artículo/determinante del sujeto
  nucleo: NumForm // núcleo del sujeto
  adj?: NumForm // adyacente adjetivo (opcional)
  verbo: NumForm
  cola: string // complemento que NO depende del sujeto (no cambia)
}

// --- Explorable: "Interruptor activa <-> pasiva" ---
export interface VozItem {
  id: string
  sujeto: string // sujeto agente (en activa)
  verboActiva: string
  cd: string // objeto (CD en activa, sujeto paciente en pasiva)
  verboPasiva: string // "ser" + participio concordado
}

// --- Camino guiado (lecciones) ---
export type LessonRole = 'sujeto' | 'predicado' | 'verbo' | 'cd' | 'none'

export interface LGroup {
  id: string
  text: string
  role: LessonRole
}

export interface IntroBeat {
  kind: 'intro'
  title: string
  body: string
  cta?: string
}

// Exposición: muestra la oración y "revela" (colorea + etiqueta) algunos grupos.
export interface ShowBeat {
  kind: 'show'
  groups: LGroup[]
  reveal: string[] // ids de los grupos que se colorean en este beat
  caption: string
}

// Mini-puzle: toca el grupo correcto.
export interface TapBeat {
  kind: 'tap'
  groups: LGroup[]
  target: string // id del grupo que hay que tocar
  prompt: string
  teach: string // se muestra al acertar
}

export type Beat = IntroBeat | ShowBeat | TapBeat

export interface Lesson {
  id: string
  title: string
  beats: Beat[]
}
