# Sintax

App educativa estilo [Brilliant](https://brilliant.org) para aprender **sintaxis castellana**: minimalista, visual y aprender-haciendo. La tesis es que el análisis sintáctico es "matemático" (cajas anidadas, núcleos, funciones, recursividad) y por tanto se puede manipular con el dedo.

## El camino

Nueve capítulos, de lo simple a lo compuesto. La filosofía es **explicar visualmente y dejar jugar**: cada concepto se presenta con una escena animada y se manipula en explorables reversibles, sin fallo posible (interruptores, chips, steppers, cajas que se abren). No hay exámenes por el camino; el único capítulo donde "lo haces tú" es el cierre:

1. **Las clases de palabras** — toca cada palabra y descubre su clase (color).
2. **Las dos mitades** — crecimiento: añade/quita palabras y cada una cae en su mitad; coloca el corte.
3. **El verbo y la concordancia** — laboratorio de número; borra hasta el núcleo; encuentra el sujeto experimentando.
4. **El complemento directo** — el interruptor `un libro ↔ lo`; swap de palabras; giro de voz.
5. **El complemento indirecto** — el interruptor `a su hermano ↔ le`.
6. **El atributo** — swap de cópulas (ser/estar/parecer); el pliegue en `lo`.
7. **El complemento circunstancial** — enciende, apaga y **mueve** circunstancias.
8. **Una oración dentro de otra** — la subordinada como caja que se abre y se cierra (zoom).
9. **El análisis completo** — cierre: frases enteras que el alumno monta pieza a pieza.

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
    Explora.tsx         Marco común de los explorables (distintivo + consigna + nota)
    MapScreen.tsx       Mapa de capítulos con progreso (localStorage)
  activities/           Explorables y experimentos incrustados como beats:
    ClasesActivity      Toca cada palabra y descubre su clase
    CrecimientoActivity Añade/quita palabras a cada mitad
    FronteraActivity    Coloca el corte sujeto|predicado (slider)
    ConcordanciaActivity / NucleoActivity / SujetoActivity   Experimentos del cap. 3
    SustituirActivity   Interruptor constituyente ↔ pronombre (CD, CI, atributo)
    SwapActivity / VozActivity   Cambia palabras / gira la voz
    CircunstanciasActivity       Enciende, apaga y mueve CCs
    ZoomActivity        La subordinada que se abre y se cierra
    AnalizaActivity     Cierre: análisis guiado de la frase completa
```
