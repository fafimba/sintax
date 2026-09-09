import { test, expect } from "@playwright/test";
import { lessons, UNITS } from "../src/learning/curriculum";
import {
  initialValues,
  normalizeValues,
  sentenceText,
  type Piece,
  type Values,
} from "../src/learning/model";
import { normalizeProgress } from "../src/learning/progress";
const flatten = (pieces: Piece[]): Piece[] =>
  pieces.flatMap((p) => [p, ...flatten(p.children ?? [])]);
const getScene = (lesson: string, scene: string) =>
  lessons.find((l) => l.id === lesson)!.scenes.find((s) => s.id === scene)!;
const text = (lesson: string, scene: string, values: Values) =>
  sentenceText(getScene(lesson, scene).view(values, true).pieces);

test("every authored combination renders a coherent, finite structure", () => {
  expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
  expect(new Set(lessons.map((l) => l.unit)).size).toBe(UNITS.length);
  for (const lesson of lessons) {
    expect(new Set(lesson.scenes.map((s) => s.id)).size).toBe(
      lesson.scenes.length,
    );
    for (const scene of lesson.scenes) {
      let combinations: Values[] = [{}];
      for (const control of scene.controls)
        combinations = combinations.flatMap((values) =>
          control.options.map((_, i) => ({ ...values, [control.id]: i })),
        );
      expect(combinations.length).toBeGreaterThan(1);
      for (const values of combinations) {
        const view = scene.view(values, true),
          pieces = flatten(view.pieces);
        expect(pieces.length, `${lesson.id}/${scene.id}`).toBeGreaterThan(0);
        expect(new Set(pieces.map((p) => p.id)).size).toBe(pieces.length);
        for (const piece of pieces) {
          expect(
            Boolean(piece.text?.trim() || piece.children?.length),
          ).toBeTruthy();
          if (piece.control)
            expect(
              scene.controls.some((c) => c.id === piece.control),
            ).toBeTruthy();
        }
        expect(sentenceText(view.pieces)).not.toMatch(/undefined|NaN|\bnull\b/);
        expect(view.observation.trim().length).toBeGreaterThan(15);
      }
    }
  }
});

test("agreement follows the subject, including postverbal and experiencing constructions", () => {
  expect(text("concordancia", "contraste", { subject: 0, object: 1 })).toBe(
    "El gato mira a los pájaros.",
  );
  expect(text("concordancia", "contraste", { subject: 1, object: 0 })).toBe(
    "Los gatos miran al pájaro.",
  );
  expect(text("sujeto", "orden", { order: 1, number: 1 })).toBe(
    "Llegan los trenes.",
  );
  expect(text("sujeto", "orden", { order: 0, number: 0 })).toBe(
    "El tren llega.",
  );
  expect(text("indirecto", "gustar", { person: 1, number: 1 })).toBe(
    "Te gustan los libros.",
  );
  expect(text("sujeto", "tacito", { visible: 1, person: 1 })).toBe(
    "Leemos un libro.",
  );
  const impersonal = getScene("sujeto", "impersonal").view(
    { example: 2 },
    true,
  );
  expect(flatten(impersonal.pieces).some((p) => p.tone === "subject")).toBe(
    false,
  );
});

test("pronouns preserve their referent and occupy the correct order", () => {
  expect(text("directo", "formas", { object: 3, replace: 1 })).toBe(
    "Ana las leyó.",
  );
  expect(text("directo", "personal", { replace: 1 })).toBe("Ana la vio.");
  expect(text("indirecto", "destinatario", { direct: 1, indirect: 1 })).toBe(
    "Ana se la dio.",
  );
  expect(text("indirecto", "destinatario", { direct: 0, indirect: 1 })).toBe(
    "Ana le dio la carta.",
  );
  expect(text("indirecto", "destinatario", { direct: 1, indirect: 0 })).toBe(
    "Ana la dio a Marta.",
  );
  expect(text("atributo", "lo", { number: 1, replace: 1 })).toBe(
    "Las casas lo son.",
  );
  expect(text("circunstancias", "regimen", { verb: 1, replace: 1 })).toBe(
    "Ana depende de ella.",
  );
});

test("passive and subordinate structures preserve both levels of analysis", () => {
  const passive = getScene("voz", "perspectiva").view({ voice: 1 }, true);
  expect(passive.pieces.find((p) => p.id === "door")?.tone).toBe("subject");
  expect(passive.pieces.find((p) => p.id === "eva")?.tone).toBe("link");
  expect(text("voz", "paciente", { number: 1, agent: 1 })).toBe(
    "Las puertas fueron pintadas.",
  );
  const subordinate = getScene("subordinacion", "sustantiva").view(
    { shape: 1 },
    true,
  );
  expect(
    subordinate.pieces
      .find((p) => p.id === "object")
      ?.children?.find((p) => p.id === "eva")?.tone,
  ).toBe("subject");
  expect(text("subordinacion", "sustantiva", { shape: 1 })).toBe(
    "Ana sabe que Eva llegó.",
  );
  expect(text("subordinacion", "relativa", { detail: 1 })).toBe(
    "El gato que vive aquí duerme.",
  );
});

test("invalid and stale saved data always recover into the authored domain", () => {
  for (const raw of [
    null,
    [],
    true,
    "oops",
    { completed: {}, step: -900, lesson: "missing", scenes: null },
    {
      completed: ["palabras", "palabras", "obsolete"],
      lesson: "palabras",
      step: Infinity,
      scenes: {
        "palabras/nombrar": { values: { noun: 900 }, touched: "true" },
      },
    },
  ]) {
    const p = normalizeProgress(raw);
    expect(lessons.some((l) => l.id === p.lesson)).toBe(true);
    expect(p.step).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(p.completed)).toBe(true);
    expect(new Set(p.completed).size).toBe(p.completed.length);
  }
  const scene = getScene("palabras", "nombrar");
  expect(normalizeValues(scene, { noun: -1 })).toEqual(initialValues(scene));
  expect(normalizeValues(scene, { noun: "1" })).toEqual(initialValues(scene));
});
