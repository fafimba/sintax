import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";
import {
  type Piece,
  type Scene,
  type Values,
  type SceneState,
  sentenceText,
} from "../learning/model";
import { Icon } from "./Icon";
function PieceView({
  piece,
  change,
  scene,
  values,
}: {
  piece: Piece;
  change: (id: string, n: number) => void;
  scene: Scene;
  values: Values;
}) {
  const reduced = useReducedMotion();
  const tone = `tone-${piece.tone ?? "neutral"}`;
  if (piece.children)
    return (
      <motion.div
        layout={!reduced}
        className={`syntax-group ${tone}`}
        data-piece={piece.id}
      >
        <div className="group-pieces">
          {piece.children.map((p) => (
            <PieceView
              key={p.id}
              piece={p}
              change={change}
              scene={scene}
              values={values}
            />
          ))}
        </div>
        <span className="group-brace" />
        <span className="group-label">{piece.label}</span>
      </motion.div>
    );
  const control = scene.controls.find((c) => c.id === piece.control);
  return (
    <motion.div
      layout={!reduced}
      className={`piece ${tone} ${piece.ghost ? "ghost-piece" : ""} ${/^[.,;!?]$/.test(piece.text ?? "") ? "punctuation" : ""}`}
      data-piece={piece.id}
    >
      {piece.badge && <span className="piece-badge">{piece.badge}</span>}
      {control ? (
        <button
          type="button"
          className="word interactive-word"
          onClick={() =>
            change(
              control.id,
              (values[control.id] + 1) % control.options.length,
            )
          }
          aria-label={`${control.label}: ${piece.text}. Cambiar`}
        >
          <span>{piece.text}</span>
          <Icon name="refresh" size={16} />
        </button>
      ) : (
        <span className="word">{piece.text}</span>
      )}
      {piece.label && <span className="piece-label">{piece.label}</span>}
    </motion.div>
  );
}
export function Explorer({
  scene,
  state,
  onChange,
  onReset,
}: {
  scene: Scene;
  state: SceneState;
  onChange: (id: string, value: number) => void;
  onReset: () => void;
}) {
  const view = scene.view(state.values, state.touched),
    id = useId();
  return (
    <>
      <section className="experiment" aria-label="Ejemplo interactivo">
        <div className="experiment-top">
          <span>
            <span className="live-mark" /> TU ESPACIO PARA PROBAR
          </span>
          <button
            className="reset-button"
            onClick={onReset}
            aria-label="Reiniciar este ejemplo"
          >
            <Icon name="refresh" size={16} />
            <span>Reiniciar</span>
          </button>
        </div>
        <div className="sentence-stage">
          {view.connection && (
            <div className="connection">
              <span />
              {view.connection}
              <span />
            </div>
          )}
          <div
            className="syntax-sentence"
            role="group"
            aria-label={sentenceText(view.pieces)}
          >
            {view.pieces.map((p) => (
              <PieceView
                key={p.id}
                piece={p}
                change={onChange}
                values={state.values}
                scene={scene}
              />
            ))}
          </div>
          {view.note && <p className="stage-note">{view.note}</p>}
        </div>
        <div className="experiment-controls">
          {scene.controls
            .filter((c) => c.kind !== "word")
            .map((c) => (
              <div className="control-block" key={c.id}>
                <label
                  id={`${id}-${c.id}-label`}
                  htmlFor={c.kind === "range" ? `${id}-${c.id}` : undefined}
                >
                  {c.label}
                </label>
                {c.kind === "range" ? (
                  <div className="range-wrap">
                    <input
                      id={`${id}-${c.id}`}
                      type="range"
                      min={0}
                      max={c.options.length - 1}
                      step={1}
                      value={state.values[c.id]}
                      aria-valuetext={c.options[state.values[c.id]]}
                      onChange={(e) => onChange(c.id, Number(e.target.value))}
                    />
                    <div className="range-labels">
                      {c.options.map((o, i) => (
                        <button
                          key={o}
                          aria-pressed={state.values[c.id] === i}
                          onClick={() => onChange(c.id, i)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className="segmented"
                    role="group"
                    aria-labelledby={`${id}-${c.id}-label`}
                  >
                    {c.options.map((o, i) => (
                      <button
                        type="button"
                        key={o}
                        aria-pressed={state.values[c.id] === i}
                        onClick={() => onChange(c.id, i)}
                      >
                        {o}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          <p className="interaction-hint">
            <Icon name="spark" size={16} />
            {scene.instruction}
          </p>
        </div>
      </section>
      <div className="observation" aria-live="polite" aria-atomic="true">
        <div className="observation-icon">
          <Icon name="sun" size={22} />
        </div>
        <div>
          <h2>Fíjate en esto</h2>
          <p>{view.observation}</p>
        </div>
      </div>
      <details className="concept-note">
        <summary>
          <span>
            <Icon name="book" size={17} /> Ponle nombre a la idea
          </span>
          <Icon name="chevron" size={16} />
        </summary>
        <div>
          <h3>{scene.concept.title}</h3>
          <p>{scene.concept.text}</p>
        </div>
      </details>
    </>
  );
}
