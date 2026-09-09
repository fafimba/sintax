import { useState } from "react";
import { lessons, UNITS } from "../learning/curriculum";
import { initialValues, sentenceText } from "../learning/model";
import { Icon } from "./Icon";
const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function Library({ mode }: { mode: "explore" | "glossary" }) {
  const [query, setQuery] = useState(""),
    [unit, setUnit] = useState(-1);
  const items = lessons.flatMap((lesson) =>
    lesson.scenes.map((scene, index) => ({ lesson, scene, index })),
  );
  const filtered = items.filter(
    ({ lesson, scene }) =>
      (unit === -1 || lesson.unit === unit) &&
      normalize(
        `${lesson.title} ${scene.title} ${scene.description} ${scene.concept.title} ${scene.concept.text}`,
      ).includes(normalize(query.trim())),
  );
  return (
    <section className="library-content">
      <p className="eyebrow">
        {mode === "explore" ? "SIGUE TU CURIOSIDAD" : "LAS IDEAS, A MANO"}
      </p>
      <h1>
        {mode === "explore"
          ? "Una frase. Muchas posibilidades."
          : "Cada término tiene su ejemplo."}
      </h1>
      <p className="page-lead">
        {mode === "explore"
          ? "Elige una transformación y experimenta. Todos los ejemplos están abiertos para ti."
          : "Consulta una idea y vuelve a verla en movimiento. Los conceptos siguen el orden del recorrido."}
      </p>
      <div className="search-field">
        <Icon name="search" size={19} />
        <input
          aria-label={
            mode === "explore" ? "Buscar ejemplos" : "Buscar conceptos"
          }
          placeholder={
            mode === "explore"
              ? "Buscar una idea o una transformación…"
              : "Busca sujeto, sintagma, complemento…"
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button
            className="icon-button"
            aria-label="Borrar búsqueda"
            onClick={() => setQuery("")}
          >
            <Icon name="close" size={17} />
          </button>
        )}
      </div>
      <div
        className="library-filters"
        role="group"
        aria-label="Filtrar por etapa"
      >
        <button aria-pressed={unit === -1} onClick={() => setUnit(-1)}>
          Todo
        </button>
        {UNITS.map((u, i) => (
          <button
            key={u.title}
            aria-pressed={unit === i}
            onClick={() => setUnit(i)}
          >
            {u.title}
          </button>
        ))}
      </div>
      <p className="results-count" role="status">
        {filtered.length} {mode === "explore" ? "ejemplos" : "conceptos"}
      </p>
      {filtered.length ? (
        <div className={mode === "explore" ? "explore-grid" : "concept-list"}>
          {filtered.map(({ lesson, scene, index }) =>
            mode === "explore" ? (
              <a
                className="explore-card"
                key={`${lesson.id}/${scene.id}`}
                href={`#/aprender/${lesson.id}/${index + 1}`}
              >
                <span className="card-unit">{UNITS[lesson.unit].title}</span>
                <div className="example-preview">
                  {sentenceText(scene.view(initialValues(scene), false).pieces)}
                </div>
                <h2>{scene.title}</h2>
                <p>{scene.description}</p>
                <span className="card-action">
                  Explorar <Icon name="arrow" size={17} />
                </span>
              </a>
            ) : (
              <details
                className="glossary-item"
                key={`${lesson.id}/${scene.id}`}
              >
                <summary>
                  <span>{scene.concept.title}</span>
                  <Icon name="chevron" size={17} />
                </summary>
                <div>
                  <p>{scene.concept.text}</p>
                  <a
                    href={`#/aprender/${lesson.id}/${index + 1}`}
                    className="text-button"
                  >
                    Verlo en una frase
                    <Icon name="arrow" size={17} />
                  </a>
                </div>
              </details>
            ),
          )}
        </div>
      ) : (
        <div className="empty-search">
          <Icon name="search" size={28} />
          <h2>No encontramos esa idea.</h2>
          <p>Prueba con otro término o explora todas las etapas.</p>
          <button
            className="primary-button"
            onClick={() => {
              setQuery("");
              setUnit(-1);
            }}
          >
            Ver todo
          </button>
        </div>
      )}
    </section>
  );
}
