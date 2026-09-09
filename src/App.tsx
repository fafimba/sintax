import { useEffect, useRef, useState } from "react";
import { MotionConfig } from "framer-motion";
import { lessons, UNITS } from "./learning/curriculum";
import { initialValues } from "./learning/model";
import { readProgress, sceneState, STORE_KEY } from "./learning/progress";
import { Explorer } from "./ui/Explorer";
import { Icon } from "./ui/Icon";
import { Library } from "./ui/Library";

type Route =
  | { view: "lesson"; lesson: string; step: number }
  | { view: "map" | "explore" | "glossary" };
const lessonUrl = (id: string, step = 0) => `#/aprender/${id}/${step + 1}`;
function readRoute(fallback: { lesson: string; step: number }): Route {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/");
  if (parts[0] === "explorar") return { view: "explore" };
  if (parts[0] === "conceptos") return { view: "glossary" };
  if (parts[0] === "recorrido") return { view: "map" };
  const lesson =
    lessons.find((l) => l.id === parts[1]) ??
    lessons.find((l) => l.id === fallback.lesson) ??
    lessons[0];
  const requested =
    parts[0] === "aprender" ? Number(parts[2] ?? 1) - 1 : fallback.step;
  return {
    view: "lesson",
    lesson: lesson.id,
    step: Number.isInteger(requested)
      ? Math.max(0, Math.min(lesson.scenes.length, requested))
      : 0,
  };
}
export default function App() {
  const [progress, setProgress] = useState(readProgress),
    [route, setRoute] = useState<Route>(() => readRoute(progress));
  const [menu, setMenu] = useState(false),
    [storageFailed, setStorageFailed] = useState(false);
  const contentRef = useRef<HTMLElement>(null),
    navRef = useRef<HTMLElement>(null),
    menuButton = useRef<HTMLButtonElement>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  const lesson =
    lessons.find(
      (l) =>
        l.id === (route.view === "lesson" ? route.lesson : progress.lesson),
    ) ?? lessons[0];
  const index = lessons.indexOf(lesson),
    step = route.view === "lesson" ? route.step : 0,
    scene = lesson.scenes[step],
    completed = progress.completed.length;
  useEffect(() => {
    const update = () => {
      setRoute(readRoute(progressRef.current));
      setMenu(false);
    };
    window.addEventListener("hashchange", update);
    if (!location.hash)
      history.replaceState(null, "", lessonUrl(progress.lesson, progress.step));
    return () => window.removeEventListener("hashchange", update);
  }, []);
  useEffect(() => {
    if (route.view === "lesson")
      setProgress((p) => ({ ...p, lesson: route.lesson, step: route.step }));
    document.title = `${route.view === "lesson" ? lesson.title : route.view === "map" ? "Tu recorrido" : route.view === "explore" ? "Explorar" : "Conceptos"} · Sintax`;
    window.scrollTo({ top: 0, behavior: "instant" });
    contentRef.current?.focus({ preventScroll: true });
  }, [route]);
  useEffect(() => {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(progress));
      setStorageFailed(false);
    } catch {
      setStorageFailed(true);
    }
  }, [progress]);
  useEffect(() => {
    if (!menu) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = () =>
      Array.from(
        navRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
        ) ?? [],
      ).filter((el) => el.getClientRects().length);
    const focusFrame = requestAnimationFrame(() => focusable()[0]?.focus());
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        requestAnimationFrame(() => menuButton.current?.focus());
      }
      if (e.key === "Tab") {
        const items = focusable(),
          first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", handleKey);
    };
  }, [menu]);
  useEffect(() => {
    const breakpoint = matchMedia("(min-width: 801px)");
    const closeOnDesktop = () => {
      if (breakpoint.matches) setMenu(false);
    };
    breakpoint.addEventListener("change", closeOnDesktop);
    return () => breakpoint.removeEventListener("change", closeOnDesktop);
  }, []);
  const closeMenu = () => {
    setMenu(false);
    requestAnimationFrame(() => menuButton.current?.focus());
  };
  const updateScene = (control: string, value: number) => {
    const key = `${lesson.id}/${scene.id}`;
    setProgress((p) => ({
      ...p,
      scenes: {
        ...p.scenes,
        [key]: {
          values: {
            ...sceneState(p, lesson.id, scene.id).values,
            [control]: value,
          },
          touched: true,
        },
      },
    }));
  };
  const resetScene = () =>
    setProgress((p) => ({
      ...p,
      scenes: {
        ...p.scenes,
        [`${lesson.id}/${scene.id}`]: {
          values: initialValues(scene),
          touched: false,
        },
      },
    }));
  const finish = () => {
    setProgress((p) => ({
      ...p,
      completed: p.completed.includes(lesson.id)
        ? p.completed
        : [...p.completed, lesson.id],
    }));
    location.hash = lessonUrl(lesson.id, lesson.scenes.length).slice(1);
  };
  return (
    <MotionConfig reducedMotion="user">
      <a
        className="skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          contentRef.current?.focus();
        }}
      >
        Saltar al contenido
      </a>
      {menu && <div className="nav-backdrop" onClick={closeMenu} />}
      <aside
        className={`sidebar ${menu ? "is-open" : ""}`}
        ref={navRef}
        aria-label="Navegación del curso"
        {...(menu ? { role: "dialog", "aria-modal": true } : {})}
      >
        <div className="brand-row">
          <a
            href={lessonUrl(progress.lesson, progress.step)}
            className="brand"
            aria-label="Sintax, continuar aprendiendo"
          >
            <span className="brand-symbol">
              s<span>·</span>
            </span>
            sintax<span className="brand-period">.</span>
          </a>
          <button
            className="icon-button mobile-close"
            onClick={closeMenu}
            aria-label="Cerrar menú"
          >
            <Icon name="close" />
          </button>
        </div>
        <p className="brand-caption">EL LENGUAJE, POR DENTRO.</p>
        <nav className="main-nav" aria-label="Principal">
          <a
            href={lessonUrl(progress.lesson, progress.step)}
            className={route.view === "lesson" ? "active" : ""}
            aria-current={route.view === "lesson" ? "page" : undefined}
          >
            <Icon name="book" />
            Aprender
            <Icon name="chevron" size={14} />
          </a>
          <a
            href="#/recorrido"
            className={route.view === "map" ? "active" : ""}
            aria-current={route.view === "map" ? "page" : undefined}
          >
            <Icon name="grid" />
            Tu recorrido
          </a>
          <a
            href="#/explorar"
            className={route.view === "explore" ? "active" : ""}
            aria-current={route.view === "explore" ? "page" : undefined}
          >
            <Icon name="flask" />
            Explorar
          </a>
          <a
            href="#/conceptos"
            className={route.view === "glossary" ? "active" : ""}
            aria-current={route.view === "glossary" ? "page" : undefined}
          >
            <Icon name="search" />
            Conceptos
          </a>
        </nav>
        <div className="sidebar-course">
          <div className="sidebar-label">SINTAXIS, PASO A PASO</div>
          {UNITS.map((u, unit) => {
            const items = lessons.filter((l) => l.unit === unit);
            if (!items.length) return null;
            return (
              <div className="sidebar-unit" key={u.title}>
                <div className="unit-name">
                  <span>{u.mark}</span>
                  {u.title}
                </div>
                {items.map((l) => (
                  <a
                    key={l.id}
                    href={lessonUrl(l.id)}
                    onClick={() => setMenu(false)}
                    className={`lesson-link ${route.view === "lesson" && lesson.id === l.id ? "current" : ""}`}
                    aria-current={
                      route.view === "lesson" && lesson.id === l.id
                        ? "step"
                        : undefined
                    }
                  >
                    <span
                      className={`lesson-dot ${progress.completed.includes(l.id) ? "done" : ""}`}
                    >
                      {progress.completed.includes(l.id) ? (
                        <Icon name="check" size={11} />
                      ) : null}
                    </span>
                    <span>{l.title}</span>
                  </a>
                ))}
              </div>
            );
          })}
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-progress">
            <span>Tu recorrido</span>
            <b>
              {completed} / {lessons.length}
            </b>
          </div>
          <progress
            value={completed}
            max={lessons.length}
            aria-label="Lecciones recorridas"
          />
          <p>
            {storageFailed
              ? "El navegador no permite guardar el progreso."
              : "Tu progreso se guarda en este dispositivo."}
          </p>
        </div>
      </aside>
      <div className="app-body" {...(menu ? { inert: "" } : {})}>
        <header className="top-header">
          <button
            className="icon-button menu-button"
            ref={menuButton}
            onClick={() => setMenu(true)}
            aria-label="Abrir menú"
            aria-expanded={menu}
          >
            <Icon name="menu" />
          </button>
          <div className="breadcrumb">
            <span>Sintaxis española</span>
            <Icon name="chevron" size={14} />
            <span>
              {route.view === "lesson"
                ? UNITS[lesson.unit].title
                : route.view === "map"
                  ? "Tu recorrido"
                  : route.view === "explore"
                    ? "Explorar"
                    : "Conceptos"}
            </span>
          </div>
          <span className="pace-label">
            <Icon name="sun" size={18} /> A tu ritmo
          </span>
        </header>
        <main id="main-content" ref={contentRef} tabIndex={-1}>
          {(route.view === "explore" || route.view === "glossary") && (
            <Library key={route.view} mode={route.view} />
          )}
          {route.view === "lesson" && (
            <article className="lesson-content">
              <div className="lesson-eyebrow">
                <span>
                  LECCIÓN {String(index + 1).padStart(2, "0")}
                  <span className="eyebrow-divider">/</span>
                  {UNITS[lesson.unit].title.toUpperCase()}
                </span>
                <span>
                  {Math.min(step + 1, lesson.scenes.length)} de{" "}
                  {lesson.scenes.length} ideas
                </span>
              </div>
              <nav className="step-track" aria-label="Ideas de esta lección">
                {lesson.scenes.map((s, i) => (
                  <a
                    key={s.id}
                    href={lessonUrl(lesson.id, i)}
                    title={s.title}
                    aria-label={`Idea ${i + 1}: ${s.title}`}
                    aria-current={i === step ? "step" : undefined}
                    className={i <= step ? "reached" : ""}
                  />
                ))}
              </nav>
              {scene ? (
                <div key={`${lesson.id}/${scene.id}`} className="scene-content">
                  <div className="lesson-heading">
                    <h1>{scene.title}</h1>
                    <p>{scene.description}</p>
                  </div>
                  <Explorer
                    scene={scene}
                    state={sceneState(progress, lesson.id, scene.id)}
                    onChange={updateScene}
                    onReset={resetScene}
                  />
                  <footer className="lesson-footer">
                    <a
                      className="text-button previous-idea"
                      href={
                        step > 0
                          ? lessonUrl(lesson.id, step - 1)
                          : "#/recorrido"
                      }
                    >
                      <Icon name="back" size={18} />
                      {step > 0 ? "Anterior" : "Ver recorrido"}
                    </a>
                    <span className="footer-aside">
                      La curiosidad lleva el ritmo.
                    </span>
                    {step < lesson.scenes.length - 1 ? (
                      <a
                        className="primary-button"
                        href={lessonUrl(lesson.id, step + 1)}
                      >
                        Siguiente idea
                        <Icon name="arrow" size={19} />
                      </a>
                    ) : (
                      <button className="primary-button" onClick={finish}>
                        Cerrar lección
                        <Icon name="check" size={19} />
                      </button>
                    )}
                  </footer>
                </div>
              ) : (
                <section className="lesson-complete">
                  <div className="complete-symbol">
                    <Icon name="check" size={36} />
                  </div>
                  <p className="eyebrow">UNA IDEA MÁS CLARA</p>
                  <h1>Las piezas van encajando.</h1>
                  <p>De esta lección te llevas:</p>
                  <ul>
                    {lesson.summary.map((s) => (
                      <li key={s}>
                        <Icon name="check" size={18} />
                        {s}
                      </li>
                    ))}
                  </ul>
                  <div className="complete-actions">
                    <a
                      className="primary-button"
                      href={
                        lessons[index + 1]
                          ? lessonUrl(lessons[index + 1].id)
                          : "#/recorrido"
                      }
                    >
                      {lessons[index + 1]
                        ? "Seguir explorando"
                        : "Ver mi recorrido"}
                      <Icon name="arrow" size={20} />
                    </a>
                    <a className="text-button" href={lessonUrl(lesson.id)}>
                      <Icon name="refresh" size={16} />
                      Volver a la lección
                    </a>
                  </div>
                  {lessons[index + 1] && (
                    <p className="next-preview">
                      Después: {lessons[index + 1].title}
                    </p>
                  )}
                </section>
              )}
            </article>
          )}
          {route.view === "map" && (
            <section className="map-content">
              <p className="eyebrow">
                DE LO SIMPLE A LO QUE PARECÍA COMPLICADO
              </p>
              <h1>Tu camino por la sintaxis.</h1>
              <p className="page-lead">
                Cada idea se apoya en la anterior. Puedes seguir el orden o
                explorar cualquier lección.
              </p>
              {UNITS.filter((_, unit) =>
                lessons.some((l) => l.unit === unit),
              ).map((u) => {
                const unit = UNITS.indexOf(u);
                return (
                  <section key={u.title} className="map-unit">
                    <div className="map-unit-heading">
                      <span>{u.mark}</span>
                      <div>
                        <h2>{u.title}</h2>
                        <p>{u.description}</p>
                      </div>
                    </div>
                    {lessons
                      .filter((l) => l.unit === unit)
                      .map((l) => (
                        <a
                          className="map-lesson"
                          href={lessonUrl(l.id)}
                          key={l.id}
                        >
                          <span className="map-number">
                            {progress.completed.includes(l.id) ? (
                              <Icon name="check" />
                            ) : (
                              String(lessons.indexOf(l) + 1).padStart(2, "0")
                            )}
                          </span>
                          <div>
                            <h3>{l.title}</h3>
                            <p>{l.description}</p>
                          </div>
                          <span className="map-meta">
                            {l.scenes.length} ideas
                          </span>
                          <Icon name="arrow" size={20} />
                        </a>
                      ))}
                  </section>
                );
              })}
            </section>
          )}
        </main>
        <div className="page-bottom">
          <span>sintax.</span> Aprender es empezar a ver conexiones.
        </div>
      </div>
    </MotionConfig>
  );
}
