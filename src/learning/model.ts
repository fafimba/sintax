export type Tone =
  | "neutral"
  | "focus"
  | "subject"
  | "verb"
  | "direct"
  | "indirect"
  | "attribute"
  | "circumstance"
  | "link";
export interface Piece {
  id: string;
  text?: string;
  children?: Piece[];
  label?: string;
  badge?: string;
  tone?: Tone;
  control?: string;
  ghost?: boolean;
}
export interface Control {
  id: string;
  label: string;
  options: string[];
  kind?: "segments" | "range" | "word";
  initial?: number;
}
export type Values = Record<string, number>;
export interface SceneView {
  pieces: Piece[];
  observation: string;
  connection?: string;
  note?: string;
}
export interface Scene {
  id: string;
  title: string;
  description: string;
  instruction: string;
  controls: Control[];
  concept: { title: string; text: string };
  view: (values: Values, touched: boolean) => SceneView;
}
export interface Lesson {
  id: string;
  unit: number;
  title: string;
  description: string;
  summary: string[];
  scenes: Scene[];
}
export interface SceneState {
  values: Values;
  touched: boolean;
}
export const UNITS = [
  {
    title: "Las piezas",
    description: "De las palabras a los grupos.",
    mark: "01",
  },
  {
    title: "La estructura",
    description: "Descubre cómo se relacionan.",
    mark: "02",
  },
  {
    title: "Dentro del predicado",
    description: "Cada complemento tiene su papel.",
    mark: "03",
  },
  {
    title: "Conectar ideas",
    description: "Otra perspectiva. Más posibilidades.",
    mark: "04",
  },
];
export const word = (
  id: string,
  text: string,
  tone: Tone = "neutral",
  label?: string,
  control?: string,
): Piece => ({ id, text, tone, label, control });
export const group = (
  id: string,
  children: Piece[],
  label: string,
  tone: Tone = "neutral",
): Piece => ({ id, children, label, tone });
export const choice = (
  id: string,
  label: string,
  options: string[],
  kind: Control["kind"] = "segments",
  initial = 0,
): Control => ({ id, label, options, kind, initial });
export const initialValues = (scene: Scene): Values =>
  Object.fromEntries(scene.controls.map((c) => [c.id, c.initial ?? 0]));
/** Stored values are untrusted. Keep scenes within their authored domain. */
export function normalizeValues(scene: Scene, value: unknown): Values {
  const raw =
    value && typeof value === "object"
      ? (value as Record<string, unknown>)
      : {};
  return Object.fromEntries(
    scene.controls.map((c) => {
      const n = raw[c.id];
      return [
        c.id,
        typeof n === "number" &&
        Number.isInteger(n) &&
        n >= 0 &&
        n < c.options.length
          ? n
          : (c.initial ?? 0),
      ];
    }),
  );
}
export function sentenceText(pieces: Piece[]): string {
  return pieces
    .filter((p) => !p.ghost)
    .map((p) => (p.children ? sentenceText(p.children) : (p.text ?? "")))
    .join(" ")
    .replace(/\s+([.,;!?])/g, "$1");
}
