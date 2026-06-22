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
export type LessonRole = 'sujeto' | 'predicado' | 'verbo' | 'cd' | 'ci' | 'atributo' | 'cc' | 'none'

export interface LGroup {
  id: string
  text: string
  role: LessonRole
  // Si tiene hijos, es un CONSTITUYENTE CONTENEDOR (p. ej. el predicado):
  // no pinta ficha propia, sino sus hijos + un corchete que los abraza.
  // Recursivo (para subordinadas en el futuro).
  children?: LGroup[]
  // Verbo copulativo (ser/estar/parecer): es un PUENTE, no una acción. Pierde
  // el pico de "play" y adopta forma neutra de enlace.
  copula?: boolean
}

export interface IntroBeat {
  kind: 'intro'
  title: string
  body: string
  cta?: string
}

// 5º canal: flecha que CODIFICA una relación gramatical (p. ej. verbo -> CD =
// "¿qué?"). Por defecto se colorea con la función del destino.
export interface ArrowSpec {
  from: string
  to: string
  label?: string
  color?: string
}

// Exposición: muestra la oración y "revela" (colorea + etiqueta) algunos grupos.
export interface ShowBeat {
  kind: 'show'
  groups: LGroup[]
  reveal: string[] // ids de los grupos que se colorean en este beat
  caption: string
  // Una o varias flechas de relación (p. ej. verbo->CD y verbo->CI a la vez).
  arrow?: ArrowSpec | ArrowSpec[]
}

// Mini-puzle: toca el grupo correcto.
export interface TapBeat {
  kind: 'tap'
  groups: LGroup[]
  target: string // id del grupo que hay que tocar
  prompt: string
  teach: string // se muestra al acertar
}

// Escena continua: la frase persiste y avanza por pasos (se separa, se
// colorea pieza a pieza) sin desaparecer entre pasos.
export interface SceneStep {
  reveal: string[] // grupos que se colorean en este paso
  caption: string
  separated?: boolean // si las cajas ya están separadas (el "corte")
}
export interface SceneBeat {
  kind: 'scene'
  groups: LGroup[]
  steps: SceneStep[]
}

// Mecánica "frontera": coloca el corte SUJETO|PREDICADO. El divisor salta de
// hueco en hueco; al soltarlo debe quedar en `boundary` (= nº de palabras del
// sujeto). Es el paso 1 reutilizable de todo análisis. Precondición de autoría:
// sujeto explícito, antepuesto y contiguo (0 < boundary < words.length).
export interface FronteraItem {
  words: string[]
  boundary: number
  sujetoPro: string // pronombre del sujeto para el feedback (él/ella/ellos/ellas)
}

// Beats que incrustan las mecánicas ya existentes dentro del camino.
export interface ChallengeFronteraBeat {
  kind: 'challengeFrontera'
  item: FronteraItem
}
export interface ChallengeCdBeat {
  kind: 'challengeCd'
  sentence: Sentence
}
export interface ChallengeNucleoBeat {
  kind: 'challengeNucleo'
  item: NucleoItem
}
export interface ChallengeSujetoBeat {
  kind: 'challengeSujeto'
  item: SujetoItem
}
export interface ExploreConcordanciaBeat {
  kind: 'exploreConcordancia'
  item: ConcItem
}
export interface ExploreVozBeat {
  kind: 'exploreVoz'
  item: VozItem
}

export type Beat =
  | IntroBeat
  | ShowBeat
  | TapBeat
  | SceneBeat
  | ChallengeFronteraBeat
  | ChallengeCdBeat
  | ChallengeNucleoBeat
  | ChallengeSujetoBeat
  | ExploreConcordanciaBeat
  | ExploreVozBeat

export interface Lesson {
  id: string
  title: string
  beats: Beat[]
}

export interface Chapter {
  id: string
  num: number
  title: string
  subtitle: string
  lesson: Lesson
}
