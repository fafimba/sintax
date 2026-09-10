import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useId } from "react";
import {
  type Piece,
  type Scene,
  type Values,
  type SceneState,
  sentenceText,
} from "../learning/model";
import { Icon } from "./Icon";

const settle = { type: "spring", stiffness: 400, damping: 30 } as const;

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
  const movement = {
    layout: reduced ? (false as const) : ("position" as const),
    initial: reduced ? (false as const) : { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: reduced ? undefined : { opacity: 0, scale: 0.94 },
    transition: reduced ? { duration: 0 } : settle,
  };
  if (piece.children)
    return (
      <motion.div
        {...movement}
        layoutId={reduced ? undefined : piece.id}
        className={`syntax-group ${tone}`}
        data-piece={piece.id}
      >
        <div className="group-pieces">
          <AnimatePresence initial={false}>
            {piece.children.map((p) => (
              <PieceView
                key={p.id}
                piece={p}
                change={change}
                scene={scene}
                values={values}
              />
            ))}
          </AnimatePresence>
        </div>
        <span className="group-brace" aria-hidden="true" />
        <span className="group-label">{piece.label}</span>
      </motion.div>
    );
  const control = scene.controls.find((c) => c.id === piece.control);
  const text = (
    <motion.span
      className="word-text"
      key={piece.text}
      initial={reduced ? false : { opacity: 0.3, y: 7 }}
      animate={{ opacity: 1, y: 0 }}
      transition={reduced ? { duration: 0 } : settle}
    >
      {piece.text}
    </motion.span>
  );
  return (
    <motion.div
      {...movement}
      layoutId={reduced ? undefined : piece.id}
      className={`piece ${tone} ${piece.ghost ? "ghost-piece" : ""} ${/^[.,;!?]$/.test(piece.text ?? "") ? "punctuation" : ""}`}
      data-piece={piece.id}
    >
      {piece.badge && <span className="piece-badge">{piece.badge}</span>}
      {control ? (
        <motion.button
          type="button"
          className="word interactive-word"
          whileHover={reduced ? undefined : { y: -2 }}
          whileTap={reduced ? undefined : { y: 3, scale: 0.97 }}
          transition={settle}
          onClick={() =>
            change(
              control.id,
              (values[control.id] + 1) % control.options.length,
            )
          }
          aria-label={`${control.label}: ${piece.text}. Cambiar`}
        >
          {text}
          <motion.span
            className="word-cycle"
            animate={{ rotate: reduced ? 0 : values[control.id] * 120 }}
            transition={settle}
          >
            <Icon name="refresh" size={17} />
          </motion.span>
        </motion.button>
      ) : (
        <span className="word">{text}</span>
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
  const view = scene.view(state.values, state.touched);
  const id = useId();
  const reduced = useReducedMotion();
  const controls = scene.controls.filter((c) => c.kind !== "word");
  return (
    <LayoutGroup id={id}>
      <section
        className={`experiment ${controls.length > 1 ? "multiple-controls" : ""} ${state.touched ? "has-discovery" : "is-fresh"}`}
        aria-label="Ejemplo interactivo"
      >
        <button
          className="reset-button icon-button"
          onClick={(event) => {
            const experiment = event.currentTarget.closest(".experiment");
            onReset();
            requestAnimationFrame(() =>
              experiment
                ?.querySelector<HTMLElement>(
                  '.interactive-word, .segmented button[aria-pressed="true"], input[type="range"]',
                )
                ?.focus({ preventScroll: true }),
            );
          }}
          aria-label="Reiniciar este ejemplo"
          title="Reiniciar este ejemplo"
          disabled={!state.touched}
        >
          <Icon name="refresh" size={18} />
        </button>
        <div className="sentence-stage">
          {view.connection && <p className="connection">{view.connection}</p>}
          <div
            className="syntax-sentence"
            role="group"
            aria-label={sentenceText(view.pieces)}
          >
            <AnimatePresence initial={false}>
              {view.pieces.map((p) => (
                <PieceView
                  key={p.id}
                  piece={p}
                  change={onChange}
                  values={state.values}
                  scene={scene}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
        {controls.length > 0 && (
          <div className="experiment-controls">
            {controls.map((c) => (
              <div className="control-block" key={c.id}>
                <label
                  className={controls.length === 1 ? "sr-only" : undefined}
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
                      <motion.button
                        type="button"
                        key={o}
                        aria-pressed={state.values[c.id] === i}
                        onClick={() => onChange(c.id, i)}
                        whileTap={reduced ? undefined : { scale: 0.96 }}
                      >
                        {state.values[c.id] === i && (
                          <motion.span
                            className="selected-option"
                            layoutId={reduced ? undefined : `control-${c.id}`}
                            transition={reduced ? { duration: 0 } : settle}
                            aria-hidden="true"
                          />
                        )}
                        <span>{o}</span>
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="discovery" aria-live="polite" aria-atomic="true">
          {state.touched && (
            <motion.p
              key={view.observation}
              initial={reduced ? false : { opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.22 }}
            >
              {view.observation}
            </motion.p>
          )}
        </div>
      </section>
      <details className="concept-note">
        <summary>
          <Icon name="book" size={18} />
          Ver explicación
          <Icon name="chevron" size={14} />
        </summary>
        <div className="concept-body">
          <h2>{scene.concept.title}</h2>
          <p>{scene.concept.text}</p>
          {view.note && <p className="concept-context">{view.note}</p>}
        </div>
      </details>
    </LayoutGroup>
  );
}
