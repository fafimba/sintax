import { lessons } from "./curriculum";
import { initialValues, normalizeValues, type SceneState } from "./model";
export const STORE_KEY = "sintax_explorations_v3";
export interface Progress {
  lesson: string;
  step: number;
  completed: string[];
  scenes: Record<string, SceneState>;
}
export const freshProgress = (): Progress => ({
  lesson: lessons[0].id,
  step: 0,
  completed: [],
  scenes: {},
});
export function normalizeProgress(raw: unknown): Progress {
  if (!raw || typeof raw !== "object") return freshProgress();
  const p = raw as Record<string, unknown>,
    lesson = lessons.find((l) => l.id === p.lesson) ?? lessons[0];
  const scenes: Progress["scenes"] = {},
    stored =
      p.scenes && typeof p.scenes === "object"
        ? (p.scenes as Record<string, unknown>)
        : {};
  lessons.forEach((l) =>
    l.scenes.forEach((s) => {
      const key = `${l.id}/${s.id}`,
        v = stored[key];
      if (v && typeof v === "object") {
        const candidate = v as Record<string, unknown>;
        scenes[key] = {
          values: normalizeValues(s, candidate.values),
          touched: candidate.touched === true,
        };
      }
    }),
  );
  return {
    lesson: lesson.id,
    step:
      typeof p.step === "number" && Number.isInteger(p.step)
        ? Math.max(0, Math.min(lesson.scenes.length, p.step))
        : 0,
    completed: Array.isArray(p.completed)
      ? lessons
          .filter((l) => (p.completed as unknown[]).includes(l.id))
          .map((l) => l.id)
      : [],
    scenes,
  };
}
export function readProgress(): Progress {
  try {
    return normalizeProgress(
      JSON.parse(localStorage.getItem(STORE_KEY) ?? "null"),
    );
  } catch {
    return freshProgress();
  }
}
export function sceneState(
  progress: Progress,
  lessonId: string,
  sceneId: string,
): SceneState {
  const scene = lessons
    .find((l) => l.id === lessonId)!
    .scenes.find((s) => s.id === sceneId)!;
  return (
    progress.scenes[`${lessonId}/${sceneId}`] ?? {
      values: initialValues(scene),
      touched: false,
    }
  );
}
