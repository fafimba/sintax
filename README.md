# Sintax

App educativa estilo [Brilliant](https://brilliant.org) para aprender **sintaxis castellana**: minimalista, visual y aprender-haciendo. La tesis es que el análisis sintáctico es "matemático" (cajas anidadas, núcleos, funciones, recursividad) y por tanto se puede manipular con el dedo.

## El camino

Nueve capítulos, de lo simple a lo compuesto. Cada concepto se presenta con una escena animada, se manipula en un explorable y se fija con retos, antes de que aparezca el siguiente:

1. **Las clases de palabras** — las piezas, coloreadas por clase.
2. **Las dos mitades** — sujeto y predicado; el corte (slider de frontera).
3. **El verbo y la concordancia** — el motor; el núcleo del sujeto; quién manda sobre quién.
4. **El complemento directo** — la prueba del pronombre (arrastrar `lo`/`la`).
5. **El complemento indirecto** — ¿a quién?; `le`/`les`.
6. **El atributo** — ser/estar/parecer como puente; contraste con el CD.
7. **El complemento circunstancial** — cuándo, dónde, cómo; puede haber varios.
8. **Una oración dentro de otra** — la subordinación: cajas dentro de cajas.
9. **El análisis completo** — capstone: frases enteras que el alumno analiza pieza a pieza.

## Modelo visual (dos niveles)

- El **color** de la palabra es su **clase** (sustantivo, verbo, adjetivo, adverbio; el "pegamento" gramatical va en gris).
- La **función** (sujeto, CD, CI…) se marca con **corchete neutro + rótulo**. Son canales separados: clase ≠ función.
- Las **flechas** codifican relaciones (verbo → CD «¿qué?», sujeto → atributo «¿cómo es?»).
- El color/rótulo se gana al descubrir, no se da como pista.

## Stack

Vite + React + TypeScript + [Framer Motion](https://www.framer.com/motion/).

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # typecheck + build de producción
```

## Estructura

```
src/
  types.ts              Modelo: Lesson / Beat (intro, show, scene, tap, retos, explorables)
  theme.ts              Tokens de color (clase de palabra, función, elementos)
  data/                 TODO el contenido como datos (capítulos, frases, ítems de cada mecánica)
    chapters.ts         El camino: capítulos y sus beats
  components/
    LessonPlayer.tsx    Reproductor de lecciones: recorre los beats de un capítulo
    GroupBox.tsx        TwoLevelBox: renderizado palabra-por-clase + corchete-por-función
    MapScreen.tsx       Mapa de capítulos con progreso (localStorage)
  activities/           Mecánicas interactivas incrustadas como beats:
    FronteraActivity    Coloca el corte sujeto|predicado (slider)
    NucleoActivity      Borra hasta el núcleo
    ConcordanciaActivity / SujetoActivity   Laboratorio y reto de concordancia
    SentenceStage (components/)             Sustitución pronominal del CD (drag)
    SwapActivity / VozActivity / CrecimientoActivity   Explorables
    AnalizaActivity     Capstone: análisis guiado de la frase completa
```
